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
            <ul class="section img-text">
                <li class="activity resource modtype_resource  hasinfo" id="module-323191">
                    <div class="mod-indent-outer w-100">
                        <div class="activityinstance">
                            <a class="aalink" onclick="" href="${topic.link}">
                                <img src="/Photo/PDF.png" class="activityicon" alt="" role="presentation" aria-hidden="true" width="30px">
                                <span class="instancename">${topic.title}</span>
                            </a> 
                                <span class="resourcelinkdetails">PDF document Uploaded ${topic.dateTime}</span>
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