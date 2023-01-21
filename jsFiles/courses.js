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

    let result = ''
    let count  = 0
    let a = localStorage.getItem('user')
    let d = 'd-none'
    if(a === 'teacher'){
        d = 'd-flex'
    }
    fetch(`http://localhost:4000/topics/`)
    .then(response => response.json())
    .then(topics => {  
            topics.forEach(topic =>{
                
                if(topic.courseId == id){
                    count++
                result += `
                <h3 id="sectionname" class="sectionname">
                
                   Topic ${count}
                
            </h3>
            <ul class="section img-text" id="topic">
                <li class="activity resource modtype_resource  hasinfo" id="module-323191">
                    <div class="mod-indent-outer w-100 d-flex flex-row justify-content-between">
                        <div class="activityinstance">
                            <a class="aalink" onclick="" href="${topic.link}">
                                <img src="/Photo/PDF.png" class="activityicon" alt="" role="presentation" aria-hidden="true" width="30px">
                                <span class="instancename">${topic.title}</span>
                            </a> 
                                <span class="resourcelinkdetails">PDF document Uploaded ${topic.dateTime}</span>
                        </div>
                        <div class="m-1">
                            <button class="btn btn-danger ${d}" id="deleteTopic" value="${topic.id}">Delete</button>
                        </div>
                    </div>
                </li>
            </ul>
                `
                }
            })
            document.getElementById(div).innerHTML = result
      })
}
export function addTopic(courseId,topicTitle,topicLink){
    const date = getDateAndTime()
    let i  = 0
    fetch(`http://localhost:4000/topics`)
    .then(response => response.json())
    .then(topics => {  
            topics.forEach(topic =>{
                i++
                
            })
      }).then(response => {
        i++
        fetch(`http://localhost:4000/topics`, {
     method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: i,
        title: topicTitle,
        link: topicLink,                
        courseId: courseId,
        dateTime:date
          
      })
    })
    .then(response => response.json())
    .then(data => window.confirm('Topic added Successfully!'))
    .catch(error => alert(error))
      })
    
}
function getDateAndTime(){
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + "  "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes();
  
                  return datetime
  }
  export function deleteTopic(id){
    fetch(`http://localhost:4000/topics/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        .then(res => res.json())
        .then(data => {alert('Topic Deleted!') 
        location.reload()})
        .catch(error => console.log(error))
  }
  
  export function getAllCourses(div){
  
    let result = ''
    let i = 0
    result +=`
        <tr class="fs-5 bg-dark fw-bold">
                <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
                <td style="border-bottom:2px solid #f46533 !important">Title</td>
                <td style="border-bottom:2px solid #f46533 !important">Category</td>
                <td style="border-bottom:2px solid #f46533 !important">Options</td>
        </tr> 
    `
    fetch(`http://localhost:4000/courses`)
    .then(response => response.json())
    .then(courses => {    
          
        courses.forEach(course =>{
            i++
               result +=`
                <tr class="text-dark">
                    <td>${i}</td>
                    <td>${course.title}</td>
                    <td>${course.category}</td>
                    <td><button type="button" id="deleteCourse" class="btn btn-outline-danger fw-bold " value="${course.id}">Delete</button></td>
                </tr>
               `
              })                             
            }).then(response =>{
                document.getElementById(div).innerHTML = result
            }) 
  }
  export function deleteCourse(id){
    fetch(`http://localhost:4000/courses/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        .then(res => res.json())
        .then(data => {alert('Course Deleted!') 
        location.reload()})
        .catch(error => console.log(error))
  }
  export function getSpecificCourseData(){

    var options = []
    fetch(`http://localhost:4000/courses`)
    .then(response => response.json())
    .then(courses => {    
          
        courses.forEach(course =>{
          
                if(!options.includes(course.category)){
                    options.push(course.category)
                }

              })                             
        }).then(response =>{
           
            var select = document.getElementById("courses-select");
                for (var i = 0; i < options.length; i++) {
                    var opt = options[i];
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = opt;
                    select.appendChild(el);
                }
        })
  }
  export function addCourse(title,ctg,){
    fetch(`http://localhost:4000/courses`, {
        method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           title: title,
           category: ctg
             
         })
       })
       .then(response => response.json())
       .then(data => {
                    alert('Course successfully added!') 
                    location.reload()
            })
       .catch(error => alert(error))
  }