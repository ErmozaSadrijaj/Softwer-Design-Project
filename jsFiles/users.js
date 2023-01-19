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
                        window.location = './teacher.html'
                        localStorage.setItem('user','teacher')
                        localStorage.setItem('currentID',teacher.id)
                    
                    }
                })            
        })
        fetch(`http://localhost:4000/students`)
        .then(response => response.json())
        .then(students => {    
              
            students.forEach(student =>{
                    if(student.email === email && student.password === ps){

                        kaUser = true                       
                        window.location = './student.html'
                        localStorage.setItem('user','student')
                        localStorage.setItem('currentID',student.id)

                    }
                })               
                if(!kaUser){
                    alert('Incorrect Email or Password')
                }                   
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
                    <div class="row">
                    <img class="w-25"src="${student.pic}"/>
                    <h3>Name: ${student.name}</h3>
                    <p>Email: ${student.email}</p>
                    <p>Main Teacher: ${currentTeacher}</p>
                </div>
                <div class="row text-center">
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
        grades.forEach(grade =>{
            if(grade.studentId == id){
                let course = getOneCourse(grade.courseId)
                i++
                result += ` 
                <tr class="text-dark">
                    <td>${i}</td>
                    <td>${course}</td>
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
function getOneCourse(courseId){
    fetch(`http://localhost:4000/courses`)
    .then(response => response.json())
    .then(courses => {    
          
      let course = courses.find(course => course.id == courseId)
      if(course) return course.title
            
    })
     
}
export function signOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('currentID')
    window.location = '/home.html'
}