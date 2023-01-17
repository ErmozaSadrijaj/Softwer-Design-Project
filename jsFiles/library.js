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