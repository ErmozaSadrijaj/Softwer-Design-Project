export function getBlogs(div){
    let result = ''
    fetch(`http://localhost:4000/blogs`)
        .then(response => response.json())
        .then(blogs => {
           
           
           
                blogs.forEach(blog =>{
                   
                        result +=`
                        <div class="card m-4" style="width: 18rem;">
                        <img class="card-img-top" src="${blog.pic}" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">${blog.title}</h5>
                          <p class="card-text">${blog.content.substring(0,55)}...</p>
                          <a href="blog.html?id=${blog.id}" class="btn btn-primary float-start">View Details</a>
                          </div>
                      </div>
                    `
                         
                    
            })
            
           
            document.getElementById(div).innerHTML = result
        })
}
export function getOneBlog(div,id){
    let result = ''
    fetch(`http://localhost:4000/blogs/${id}`)
        .then(response => response.json())
        .then(blog => {        
                        result +=`
                        <div class="container m-5">
                            <div class="row">
                            <h2>${blog.title}</h2>
                                <img src="${blog.pic}" class="w-50" alt="">
                                
                            </div>
                            <div class="row">
                                <p>${blog.content}</p>
                            </div>
                        </div>
                    `           
           
            document.getElementById(div).innerHTML = result
        })
}
export function addBlog(title,img,content){
    
    fetch(`http://localhost:4000/blogs`, {
       method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          title: title,
          pic: img,                
          content: content
            
        })
      })
      .then(response => response.json())
      .then(data => window.confirm('Book successfully added!'))
      .catch(error => alert(error))
  }