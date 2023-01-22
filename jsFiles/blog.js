export function getBlogs(div,limit){
    let result = ''
    fetch(`http://localhost:4000/blogs`)
        .then(response => response.json())
        .then(blogs => {
           
           
           
                blogs.forEach(blog =>{
                   
                       if(limit == null || limit != 0){
                        result +=`
                        <div class="card m-4 p-0" style="width: 20rem;">
                        <img class="card-img-top h-75 " src="${blog.pic}" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">${blog.title}</h5>
                          <p class="card-text ">${blog.content.substring(0,55)}...</p>
                          <a href="blog.html?id=${blog.id}" class="btn btn-primary float-start">View Details</a>
                          </div>
                      </div>
                    `
                    
                        limit--
                }
                         
                    
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
                        <div class="container">
                            <div class="row">
                            <h2 class="m-4 text-center fw-bolder fs-1 fst-italic">${blog.title}</h2>
                                <img src="${blog.pic}" class="w-60 mb-4" alt="">
                                
                            </div>
                            <div class="row">
                                <p class="lh-lg">${blog.content}</p>
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