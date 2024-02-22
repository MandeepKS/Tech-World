/* --------------------------------------------
 import apiconnection is for accessing the api
 --------------------------------------------- */
import {apiUrl} from "./apiconnection.js";



/* ---------------------------------- 
  this method is fetching the data
   from  Api
   -------------------------------*/
  export async function getBlogs() {
      
    const response = await fetch(apiUrl);
    const blogposts = await response.json();
    
    if (!response.ok){
      console.log("Error: Bad connection,Blog data are not fetching.");  
    }

    /* while fetching the data from api, we are removing loading h1 element from 
      collection page */
    const html_loader = document.getElementById("loading");
    html_loader.remove();
    return blogposts;
    
  }

 /* ---------------------------------------
  this method adds the product-card to html page
  ---------------------------------------- */

function renderBlog(blogData) {
  /* 
  -----Wp:featuredmedia--
  -----------------------------------------
  This is wordpress path for accessing image.
  Bcoz of : colon, javascript not recognize colon.
  So, i convert wp:featuredmedia into string. 
  */
  
  var image = 'wp:featuredmedia';
  var blogImage = blogData._embedded[image][0].link;
  var blogImageAlt = blogData._embedded[image][0].alt_text;
  
  const blogDate = new Date(blogData.date);
  const newDate = blogDate.getDate();
  const newMonth = blogDate.getMonth()+1; //we added +1 in  getMonth bcoz, this function start indexing with zero(0).
  const newYear = blogDate.getFullYear();

  const modifiedBlogDate = newDate+'/'+ newMonth +'/'+ newYear;
  const blogArticleElements = document.querySelector(".blog-cont4");
  blogArticleElements.innerHTML += `<a href="blog.html?id=${blogData.id}"
                                        <div class="feature-products-card blog-brief">
                                           <img src="${blogImage}" alt="${blogImageAlt}">
                                           <p>${modifiedBlogDate}</p>
                                           <h4 class="ftr-prdt-name">${blogData.title.rendered}</h4>
                                           <span class="blog-text-brief">
                                              <p>${blogData.excerpt.rendered}</p>
                                           </span>
                                        </div>
                                     </a>`
}


/* -------------------------------------------------
    this method is render the list of jackets,
    with the help of forEach loop.
    ***********************************
    this function generate list of jackets
   ------------------------------------------------- */
export async function renderBlogs(listOfjackets) {
  try {
       listOfjackets.forEach(renderBlog);
  } catch (error) 
  {
     alert("Error: Page not found!, Please try other number!");
  }
 
 }

 /* -------------------------------------------- 
    THis function we can say main() ,  this function will be 
     run in index.js
    --------------------------------------------  */
 export async function blogscollectionPage(){
  
  /* --------------------------------------------
     with the help of (collection_of_jackets) variable
      fetched data from (getBlogs, method),
      further stores in renderRaincoats() ,method
      for rendering. 

     ----------------------------------------------- */
  const collection_of_jackets = await getBlogs();
  renderBlogs(collection_of_jackets);
}

