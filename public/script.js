const SignUp = (email,password)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"name":"Abhishek","email":email,"password":password});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("/users", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const Login = (email,password)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"email":email,"password":password});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("/users/login", requestOptions)
    .then(response => response.text())
    .then((result) => {
        localStorage.setItem("token", JSON.parse(result).token);
        task()
    })
    .catch(error => console.log('error', error));
}

const task = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"description":"Coding 123456"});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("/tasks", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const form = document.querySelector('form')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    console.log(email)
    console.log(password)
    // SignUp(email,password)
    Login(email,password)
})

