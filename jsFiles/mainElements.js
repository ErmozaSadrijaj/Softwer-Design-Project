export function getNavbar(div){
  const id = localStorage.getItem('currentID')
    let result =  `<nav class="navbar navbar-expand-sm navbar-dark">
    <h4 class="mt-2"><a class="Title mx-2"> Gjimnazi "Bedri Pejani"</a></h4>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse mx-3" id="navbarNavDropdown">
      <ul class="navbar-nav" >
        <li class="nav-item ">
          <a class="nav-link d-flex" id="home" href="/home.html">Home</a>
          <a class="nav-link d-none" id="teacher" href="/user.html">Profile</a>
          <a class="nav-link d-none" id="student-profile" href="/user.html">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="Blog" href="/Blo.html">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-none" id="Library" href="/Library.html">Library</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="About" href="/About.html">About</a>
          <a class="nav-link d-none" id="Course" href="/Course.html">Course</a>
        </li>
        <li class="nav-item">
          <a class="nav-link  d-flex" id="Contact" href="/Contact.html">Contact</a>
          <a class="nav-link d-none" id="Students" href="/TechStudent.html">Students</a>
          <a class="nav-link d-none" id="student-grades" href="student-grades.html?id=${id}">Grades</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="login" href="Login.html">Log In</a>
          <a class="nav-link d-none" id="sign-out" href="/home.html">Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>`
    
    document.getElementById(div).innerHTML = result
    let a = localStorage.getItem('user')
    if(a === 'teacher' || a === 'student'){

      const login = document.getElementById('login')
      login.classList.add('d-none')
      login.classList.remove('d-flex')

      const out = document.getElementById('sign-out')
      out.classList.add('d-flex')
      out.classList.remove('d-none')

   

      const Library = document.getElementById('Library')
      Library.classList.add('d-flex')
      Library.classList.remove('d-none')

      const About = document.getElementById('About')
      About.classList.add('d-none')
      About.classList.remove('d-flex')

      const Course = document.getElementById('Course')
      Course.classList.add('d-flex')
      Course.classList.remove('d-none')

      const Contact = document.getElementById('Contact')
      Contact.classList.add('d-none')
      Contact.classList.remove('d-flex')

      if(a === 'teacher'){
        const Students = document.getElementById('Students')
        Students.classList.add('d-flex')
        Students.classList.remove('d-none')

        const teacher = document.getElementById('teacher')
        teacher.classList.add('d-flex')
        teacher.classList.remove('d-none')
        
      }else if(a === 'student'){
        const grd = document.getElementById('student-grades')
        grd.classList.add('d-flex')
        grd.classList.remove('d-none')
        const prf = document.getElementById('student-profile')
        prf.classList.add('d-flex')
        prf.classList.remove('d-none')
        
      }

      const home = document.getElementById('home')
      home.classList.add('d-none')
      home.classList.remove('d-flex')
  
    }
}
export function getAdminNavbar(div){
  const id = localStorage.getItem('currentID')
    let result =  `<nav class="navbar navbar-expand-sm navbar-dark">
    <h4 class="mt-2"><a class="Title mx-2"> Gjimnazi "Bedri Pejani"</a></h4>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse mx-3" id="navbarNavDropdown">
      <ul class="navbar-nav" >
        <li class="nav-item ">
          <a class="nav-link d-flex" id="admin-profile" href="/user.html">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="manage-library" href="/admin/manageLibrary.html">Manage Library</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="manage-courses" href="/admin/manageCourses.html">Manage Courses</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="manage-blogs" href="/admin/manageBlog.html">Manage Blogs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="manage-users" href="/admin/manageUsers.html">Manage Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex" id="login" href="Login.html">Log In</a>
          <a class="nav-link d-none" id="sign-out" href="/home.html">Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>`
    
    document.getElementById(div).innerHTML = result
    let a = localStorage.getItem('user')
    if(a === 'admin'){

      const login = document.getElementById('login')
      login.classList.add('d-none')
      login.classList.remove('d-flex')

      const out = document.getElementById('sign-out')
      out.classList.add('d-flex')
      out.classList.remove('d-none')
    }
}

export function getItemFromURL(url, item) {
  if(!url.includes('?')) return null
  const url_sp = new URLSearchParams(url.split('?')[1])
  return url_sp.get(item)
  
}
export function getFooter(div){
    let result = `<div class="mt-5 pt-5 pb-5 footer">
    <div class="container ">
      <div class="row">
        <div class="col-lg-5 col-xs-12">
          <h2>Gjimnazi "Bedri Pejani"</h2>
          <br>
          <p class="pr-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallisLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis </p>
          <p><a class="social-icons"href="#"><i class="fa fa-facebook-square mr-1"></i></a>
          <a class="social-icons" href="#"><i class="fa fa-linkedin-square"></i></a>
          <a class="social-icons" href="#"><i class="fa fa-twitter-square"></i></a></p>
        </div>
        <div class="col-lg-2 col-xs-12 links">
          <h4 class="mt-lg-0 mt-sm-3">Links</h4>
          <br>
            <ul class="m-0 p-0">
              <li> <a href="">Home</a></li>
              <li> <a href="#">Blog</a></li>
              <li> <a href="#">About</a></li>
              <li> <a href="#">Contact</a></li>
            </ul>
        </div>
        <div class="col-lg-4 col-xs-12 location">
          <h4 class="mt-lg-0 mt-sm-4">Location</h4>
          <br>
          <p ><i  class="fa fa-home" > Rr. "Avdyl Frashëri", Nr.22</i></p>
          <p><i class="fa fa-phone" > 039-433-450</i></p>
          <p><i class="fa fa-envelope-o" > gjimnazi@gjimnazi.com</i></p>
        </div>
      </div>
      <div class="row mt-0">
        <div class="col copyright">
          <p>© 2023. All Rights Reserved.</p>
        </div>
      </div>
    </div>
    </div>`

  document.getElementById(div).innerHTML = result
}

export function signOut(){
  localStorage.clear()
  window.location = '/home.html'
}
export function checkValidity(type){
  let kaUser = localStorage.getItem('user')
  
  if(kaUser === null){
      alert(`You need to log in as a ${type} to advance!`)
      location.href = 'Login.html'
  }
}