export function getCards(div,search){
    let result = ''
    fetch(`http://localhost:4000/books`)
        .then(response => response.json())
        .then(books => {    
              
                books.forEach(book =>{
                   if(!search){
                    result += `
                    
                    <div class="card m-4" style="width: 18rem;">
                    <img class="card-img-top" src="./Photo/books.jpg" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">Author:${book.author}</p>
                      <a href="${book.link}" target="_blank" class="btn btn-primary float-start">Read book...</a>
                      </div>
                  </div>
                `
                   }else{
                    if(book.title.toLowerCase().includes(search)){
                      result += `
                    
                      <div class="card m-4" style="width: 18rem;">
                      <img class="card-img-top" src="./Photo/books.jpg" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author:${book.author}</p>
                        <a href="${book.link}" target="_blank" class="btn btn-primary float-start">Read book...</a>
                        </div>
                    </div>
                  `
                    }
                   }
                    
                })
                document.getElementById(div).innerHTML = result
        })
}
export function addBook(title,author,link){
  fetch(`http://localhost:4000/books`, {
     method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: title,
        author: author,                
        link: link
          
      })
    })
    .then(response => response.json())
    .then(data => window.confirm('Book successfully added!'))
    .catch(error => alert(error))
}

export function getAllBooks(div){

  let result = ''
  let i = 0
  result +=`
      <tr class="fs-5 bg-dark fw-bold">
              <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
              <td style="border-bottom:2px solid #f46533 !important">Title</td>
              <td style="border-bottom:2px solid #f46533 !important">Author</td>
              <td style="border-bottom:2px solid #f46533 !important">Link</td>
              <td style="border-bottom:2px solid #f46533 !important">Options</td>
      </tr> 
  `
  fetch(`http://localhost:4000/books`)
  .then(response => response.json())
  .then(books => {    
        
      books.forEach(book =>{
          i++
             result +=`
              <tr class="text-dark">
                  <td>${i}</td>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.link}</td>
                  <td><button type="button" id="deleteBook" class="btn btn-outline-danger fw-bold " value="${book.id}">Delete</button></td>
              </tr>
             `
            })                             
          }).then(response =>{
              document.getElementById(div).innerHTML = result
          }) 
}
export function deleteBook(id){
  fetch(`http://localhost:4000/books/${id}`, {
          method: "DELETE",
          headers: {
              'Content-type': 'application/json'
          }
      })
      
      .then(res => res.json())
      .then(data => {alert('Book Deleted!') 
      location.reload()})
      .catch(error => console.log(error))
}