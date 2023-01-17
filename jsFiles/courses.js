export function getCourses(){
    let shshResult = ''
    let shnResult = ''

    fetch(`http://localhost:4000/courses`)
        .then(response => response.json())
        .then(courses => {    
              
            courses.forEach(course =>{
                    if(course.category === 'Shkenca Natyrore'){
                        shnResult +=`
                        <ul>
                            <li><a href="view-course.html?id=${course.id}">${course.title}</a></li>
                        </ul>
                        
                        `
                    }else if(course.category === 'Shkenca Shoqerore'){
                        shshResult +=`
                        <ul>
                        <li><a href="view-course.html?id=${course.id}">${course.title}</a></li>
                        </ul>
                       
                        `
                    }
                })

                document.getElementById('shsh-links').innerHTML = shshResult
                document.getElementById('shn-links').innerHTML = shnResult
        })
}
export function getOneCourse(div,id){
    fetch(`http://localhost:4000/courseData`)
    .then(response => response.json())
    .then(data => {  
        
      })
}