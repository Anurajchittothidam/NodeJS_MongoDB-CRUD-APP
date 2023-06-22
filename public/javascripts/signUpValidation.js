let form = document.querySelector('#form')

let errorElement = document.querySelector('#error')

let timeOut;
function showErrorMsg(error) {
    errorElement.innerHTML = `<div  class="alert alert-danger d-flex justify-content-between" role="alert">${error} 
    <div class="close text-dark fs-5" style="cursor:pointer;" onclick="hideErrorMsg()">X</div>
    </div>`
    clearTimeout(timeOut);
    timeOut=setTimeout(()=>{
        errorElement.innerHTML="";
    },3000)
}

setTimeout(()=>{
    errorElement.innerHTML=""
},3000)

function hideErrorMsg(){
    errorElement.innerHTML = ""
    clearTimeout(timeOut);
}

function submitform (e) {
    const firstname = form.querySelector('#firstname').value
    const lastname = form.querySelector('#lastname').value
    const password = form.querySelector('#password').value
    const email=form.querySelector('#email').value
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(firstname === "" || password === "" || email===''){
        showErrorMsg("Enter the complete fields")
        return false;
    }
    if (firstname === "") {
        showErrorMsg("First Name is Required")
        return false;
    }if(lastname===""){
        showErrorMsg('Last Name is Required')
        return false;
    }if(email===''){
        showErrorMsg('Email is Required');
        return false;
    }if (!email.match(emailRegx)) {
        showErrorMsg("enter the valid email");
        return false
    }
    if(password === "" ){
        showErrorMsg("Password is Required")
        return false;
    }

    hideErrorMsg()
    return true;

}

showpassword.onclick=(e)=>{
    if(password.type=='text'){
        password.type='password'
    }else{
        password.type='text';
    }
}


