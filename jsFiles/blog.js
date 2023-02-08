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
      .then(data => window.confirm('Blog successfully added!'))
      .catch(error => alert(error))
  }

  export function getAllBlogs(div){

    let result = ''
    let i = 0
    result +=`
        <tr class="fs-5 bg-dark fw-bold">
                <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
                <td style="border-bottom:2px solid #f46533 !important">Title</td>
                <td style="border-bottom:2px solid #f46533 !important">Img</td>
                <td style="border-bottom:2px solid #f46533 !important">Content</td>
                <td style="border-bottom:2px solid #f46533 !important">Options</td>
        </tr> 
    `
    fetch(`http://localhost:4000/blogs`)
    .then(response => response.json())
    .then(blogs => {    
          
        blogs.forEach(blog =>{
            i++
               result +=`
                <tr class="text-dark">
                    <td>${i}</td>
                    <td>${blog.title}</td>
                    <td style="width:15% !important "><img class="w-100 rounded-circle bg-secondary"src="../${blog.pic}"/>
                    </td>
                    <td>${blog.content.substring(0,250)} <a href="/blog.html?id=${blog.id}">Read More...</a></td>
                    <td><button type="button" id="deleteBlog" class="btn btn-outline-danger fw-bold " value="${blog.id}">Delete</button></td>
                </tr>
               `
              })                             
            }).then(response =>{
                document.getElementById(div).innerHTML = result
            }) 
  }
  export function deleteBlog(id){
    fetch(`http://localhost:4000/blogs/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        .then(res => res.json())
        .then(data => {
            alert('Blog Deleted!') 
            location.reload()
    })
        .catch(error => console.log(error))
  }