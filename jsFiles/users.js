export function userLogin(){

    const email = document.getElementById('email-input').value
    const ps = document.getElementById('ps-input').value
    var kaUser = false
    
    fetch(`http://localhost:4000/teachers`)
        .then(response => response.json())
        .then(teachers => {    
              
            teachers.forEach(teacher =>{
                    if(teacher.email === email && teacher.password === ps){
                        kaUser =  true                    
                        window.location = './user.html'
                        localStorage.setItem('user','teacher')
                        localStorage.setItem('currentID',teacher.id)
                    
                    }
                })            
        }).then(response => {
            fetch(`http://localhost:4000/admins`)
            .then(response => response.json())
            .then(admins => {  
                admins.forEach(admin =>{
                    if(admin.email === email && admin.password === ps){
                        kaUser =  true                    
                        window.location = './user.html'
                        localStorage.setItem('user','admin')
                        localStorage.setItem('currentID',admin.id)
                    
                    }
                })    
              }).then(response => {
        fetch(`http://localhost:4000/students`)
        .then(response => response.json())
        .then(students => {    
              
            students.forEach(student =>{
                    if(student.email === email && student.password === ps){

                        kaUser = true                       
                        window.location = './user.html'
                        localStorage.setItem('user','student')
                        localStorage.setItem('currentID',student.id)

                    }
                }).then(response =>{
                    if(!kaUser){
                        alert('Incorrect Email or Password')
                    }    
                })                                
        })
    })
    }) 
}

export function getStudents(div){

    let result = '';
    let i = 0;
    const currentUser = localStorage.getItem('currentID')
    fetch(`http://localhost:4000/students`)
    .then(response => response.json())
    .then(students => {    
        
            result += `
            <tr class="fs-5 bg-light fw-bold">
                <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
                <td style="border-bottom:2px solid #f46533 !important">Name</td>
                <td style="border-bottom:2px solid #f46533 !important">Surname</td>
                <td style="border-bottom:2px solid #f46533 !important">Email</td>
               <td style="border-bottom:2px solid #f46533 !important">Options</td>
            </tr>
            `
            
            students.forEach(student =>{
                      if(currentUser == student.teacherId){
                        i++           
                        result += `
                            <tr class="">
                                <td>${i}</td>
                                <td>${student.name}</td>
                                <td>${student.surname}</td>
                                <td>${student.email}</td>
                                <td><a href="view-student.html?id=${student.id}" class="btn btn-primary">Details</a>
                                </td>
                            </tr>
                        `
                      }
            })    
            document.getElementById(div).innerHTML = result        
    })  
   
}
export function getOneStudent(div,id){
    let result =''  
    let currentTeacher
    fetch(`http://localhost:4000/students/${id}`)
    .then(response => response.json())
    .then(student => {     
        fetch(`http://localhost:4000/teachers/${student.teacherId}`)
        .then(response => response.json())
        .then(teacher => {     
            currentTeacher = teacher.name
        }).then(response => {
            result += `
                    <div class="row d-flex flex-row justify-content-center my-5 align-items-center">
                    <img class="w-25 rounded-circle bg-secondary"src="${student.pic}"/>
                    <div class="data d-flex flex-column w-50 m-5">
                        <h3><b>Name:</b>${student.name}</h3>
                        <p><b>Email: </b>${student.email}</p>
                        <p><b>Main Teacher: </b>${currentTeacher}</p>
                    </div>
                </div>
                <hr>
                <div class="row fw-bold d-flex justify-content-center m-3">
                    Grades:
                </div>
   
        `
        }).then(response =>{
            document.getElementById(div).innerHTML = result  
           
        })
                 
    })  
}
export function getStudentGrades(div,id){
    let result = ''
    let i = 0
    
  fetch(`http://localhost:4000/grades`)
  .then(response => response.json())
  .then(grades => {    
    result +=`
    <table class=" text-light table m-5" id="table">
         <tr class="fs-5 bg-dark fw-bold">
                    <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
                    <td style="border-bottom:2px solid #f46533 !important">Course</td>
                    <td style="border-bottom:2px solid #f46533 !important">Grade</td>
                    <td style="border-bottom:2px solid #f46533 !important">Teacher</td>
         </tr> 
    
`       
            grades.forEach(grade => {
                if(grade.studentId == id){
                    i++
                    result += ` 
                    <tr class="text-dark">
                        <td>${i}</td>
                        <td>${grade.course}</td>
                        <td>${grade.grade}</td>
                        <td>${grade.teacherId}</td>
                    </tr>
                    `
                }
            })
           
        }).then(response =>{
            document.getElementById(div).innerHTML = result  
       
    })
     
} 

export function getUserProfile(database,div){
    let result = ''
    let i = 0
    const id = localStorage.getItem('currentID')
    let type = database
    database += 's'
  fetch(`http://localhost:4000/${database}/${id}`)
  .then(response => response.json())
  .then(user => {   

            result +=`
                <div class="row d-flex flex-row justify-content-center m-3">
                    <img class="img-fluid rounded-circle w-25"src="${user.pic}" alt="${user.name}" />
                    <div class="data text-center">
                        <h1>Hello my name is <b>${user.name}</b></h1>
                        <p>I am a ${type} in Gymnasium "Bedri Pejani"</p>
                    </div>
                </div>
                
                <div id="About">
                <h1 >About</h1>
                <hr class="light">
                <h2>${user.name}</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>
            `
       
        }).then(response =>{
            document.getElementById(div).innerHTML = result         
    })
     
} 

export function getAllUsers(div){

    let result = ''
    let i = 0
    result +=`
        <tr class="fs-5 bg-dark fw-bold">
                <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
                <td style="border-bottom:2px solid #f46533 !important">Role</td>
                <td style="border-bottom:2px solid #f46533 !important">Name</td>
                <td style="border-bottom:2px solid #f46533 !important">Surname</td>
                <td style="border-bottom:2px solid #f46533 !important">Email</td>
                <td style="border-bottom:2px solid #f46533 !important">Personal Number</td>
                <td style="border-bottom:2px solid #f46533 !important">Phone Number</td>
                <td style="border-bottom:2px solid #f46533 !important">Picture</td>
                <td style="border-bottom:2px solid #f46533 !important">Options</td>
        </tr> 
    `
    fetch(`http://localhost:4000/teachers`)
    .then(response => response.json())
    .then(teachers => {    
          
        teachers.forEach(teacher =>{
            i++
               result +=`
                <tr class="text-dark">
                    <td>${i}</td>
                    <td>Teacher</td>
                    <td>${teacher.name}</td>
                    <td>${teacher.surname}</td>
                    <td>${teacher.email}</td>
                    <td>${teacher.personalNumber}</td>
                    <td>${teacher.phoneNumber}</td>
                    <td><img src="../${teacher.pic}" class="img-fluid rounded-circle" style="width:10vh"/></td>
                    <td><button type="button" id="deleteTeacher" class="btn btn-outline-danger fw-bold " value="${teacher.id}">Delete</button></td>
                
                </tr>
               `
            })            
    }).then(response => {
        fetch(`http://localhost:4000/admins`)
        .then(response => response.json())
        .then(admins => {  
            admins.forEach(admin =>{
                i++
                result +=`
                <tr class="text-dark">
                    <td>${i}</td>
                    <td>Admin</td>
                    <td>${admin.name}</td>
                    <td>${admin.surname}</td>
                    <td>${admin.email}</td>
                    <td>${admin.personalNumber}</td>
                    <td>${admin.phoneNumber}</td>
                    <td><img src="../${admin.pic}" class="img-fluid rounded-circle" style="width:10vh"/></td>
                    <td><button type="button" id="deleteAdmin" class="btn btn-outline-danger fw-bold " value="${admin.id}">Delete</button></td>
                
                </tr>
               `
            })    
          }).then(response => {
            fetch(`http://localhost:4000/students`)
            .then(response => response.json())
            .then(students => {    
                
                students.forEach(student =>{
                    i++
                    result +=`
                    <tr class="text-dark">
                        <td>${i}</td>
                        <td>Student</td>
                        <td>${student.name}</td>
                        <td>${student.surname}</td>
                        <td>${student.email}</td>
                        <td>${student.personalNumber}</td>
                        <td>${student.phoneNumber}</td>
                        <td><img src="../${student.pic}" class="img-fluid rounded-circle" style="width:10vh"/></td>
                        <td><button type="button" id="deleteStudent" class="btn btn-outline-danger fw-bold " value="${student.id}">Delete</button></td>
                    
                    </tr>
                `
                    })                             
            }).then(response =>{
                document.getElementById(div).innerHTML = result
            }) 
        }) 
    })
}
export function getSpecificUser(){

    var options = []
    fetch(`http://localhost:4000/teachers`)
    .then(response => response.json())
    .then(teachers => {    
          
        teachers.forEach(teacher =>{
          
                if(!options.includes(teacher.name)){
                    options.push(teacher.name)
                }

              })                             
        }).then(response =>{
           
            var select = document.getElementById("selectMainTeacher");
                for (var i = 0; i < options.length; i++) {
                    var opt = options[i];
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = opt;
                    select.appendChild(el);
                }
        })
  }

  export function addTeacherAdmin(){
    const name = document.getElementById('user-name').value
    const surname = document.getElementById('user-surname').value
    const email = document.getElementById('user-email').value
    const prNr = document.getElementById('user-prNr').value
    const phNr = document.getElementById('user-phNr').value
    var pic = './Photo/'
    pic += document.getElementById('user-pic').files[0].name
    const psw = document.getElementById('user-psw').value
    const role = document.getElementById('selectRole').value
    var type = ''
    if(role == 'teacher'){
        type = 'teachers'
    }else if(role == 'admin'){
        type = 'admins'
    }

    fetch(`http://localhost:4000/${type}/`, {
        method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        
        name: name,
        surname: surname,
        personalNumber: prNr,
        phoneNumber: phNr,
        email: email,
        pic: pic,
        password: psw
             
         })
       })
       .then(response => response.json())
       .then(data => {
            alert(`${role} successfully added!`) 
           
        }) 
       .catch(error => alert(error))
  }
  export function addStudent(){

    const name = document.getElementById('student-name').value
    const surname = document.getElementById('student-surname').value
    const email = document.getElementById('student-email').value
    const prNr = document.getElementById('student-prNr').value
    const phNr = document.getElementById('student-phNr').value
    var pic = './Photo/'
    pic += document.getElementById('student-pic').files[0].name
    const psw = document.getElementById('student-psw').value
    const mainTeacher = document.getElementById('selectMainTeacher').value

    fetch(`http://localhost:4000/students/`, {
        method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           name: name,
           surname: surname,
           personalNumber: prNr,
           phoneNumber: phNr,
           email: email,
           pic: pic,
           password: psw,
           teacherId: mainTeacher
             
         })
       })
       .then(response => response.json())
       .then(data => {
            alert('Student successfully added!') 
           
        }) 
       .catch(error => alert(error))
  }
  export function deleteUser(type,id){
    fetch(`http://localhost:4000/${type}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        .then(res => res.json())
        .then(data => {alert('User Deleted!') 
        location.reload()})
        .catch(error => console.log(error))
  }