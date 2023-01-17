export function userLogin(){

    const email = document.getElementById('email-input').value
    const ps = document.getElementById('ps-input').value
    let kaUser = false

    
    fetch(`http://localhost:4000/users`)
        .then(response => response.json())
        .then(users => {    
              
                users.forEach(user =>{
                    if(user.email === email && user.password === ps){
                        kaUser = true
                        if(user.role === 'teacher'){
                            window.location = './teacher.html'
                            localStorage.setItem('user','teacher')
                        }else{
                            window.location = './student.html'
                            localStorage.setItem('user','student')
                        }
                    }
                })

                if(!kaUser){
                    alert('Incorrect Email or Password')
                }else{
                    
                }
        })
}