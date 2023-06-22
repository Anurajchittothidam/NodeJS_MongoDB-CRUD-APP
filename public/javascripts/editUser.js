let form=document.querySelector('#form')

let errorElement=document.querySelector('#error');

let timeOut;
function showErrorMsg(error){
    errorElement.innerHTML=`<div class="alert alert-danger d-flex justify-content-between" role="alert">${error}
    <div class="close text-dark fs-5" style="cursor:pointer;" onclick="hideErrorMsg()">X</div>
    </div>`
    clearTimeout(timeOut);
    timeOut=setTimeout(()=>{
        errorElement.innerHTML=""
    },3000);
}

setTimeout(()=>{
    errorElement.innerHTML="";
},3000);

function hideErrorMsg(){
    errorElement.innerHTML="";
    clearTimeout(timeOut);
}

let submitform=(e)=>{
    let firstname=form.querySelector('#firstname').value;
    let lastname=form.querySelector('#lastname').value;
    let email=form.querySelector('#email').value;
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(firstname===''&& lastname===''&& email===''){
        showErrorMsg('All the fields required');
        return false;
    }if(firstname===''){
        showErrorMsg('Enter the first Name')
        return false;
    }if(lastname===''){
        showErrorMsg('Enter the last Name')
        return false;
    }if(email===''){
        showErrorMsg('Enter the email')
        return false;
    }if (!email.match(emailRegx)) {
        showErrorMsg('enter the valid email');
        return false
    }
    hideErrorMsg();
    return true;
}
