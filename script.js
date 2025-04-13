const form = document.getElementById('form');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

// adding event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();
})

// send data
const sendData = (fullNameVal, sRate, count) => {
    if (sRate === count) {
        // alert('Registration sucessful!');
        swal("Welcome! " + fullNameVal, "Registration sucessful", "success") .then(() => {
            window.location.href = `register.html?fullName=${encodeURIComponent(fullNameVal)}`;
        });
    }
}

// for final data validation
const successMsg = (fullNameVal) => {
    let formCon = document.getElementsByClassName('form-control');
    var count = formCon.length;
    let sRate = 0;

    for(let i = 0; i < count; i++) {
        if(formCon[i].classList.contains('success')) {
            sRate++;
            console.log(sRate);
            sendData(fullNameVal, sRate, count);
        }
    }
    if(sRate === count) {
        sendData(fullNameVal, sRate, count);
    }
}


// proper email validation
const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if(atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if(dot <= atSymbol + 2) return false;
    if(dot === emailVal.length - 1) return false;
    return true;
}

// defining the validate function
const validate = () => {
    const fullNameVal = fullName.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();

    // validate fullname
    if (fullNameVal === "") {
        setErrorMsg(fullName, 'Name cannot be blank');
    }
    else if (fullNameVal.length < 5) {
        setErrorMsg(fullName, 'Name should be minimum 5 char')
    }
    else {
        setSuccessMsg(fullName);
    }

    // validate email
    if (emailVal === "") {
        setErrorMsg(email, 'Email cannot be blank!');
    }
    else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'Not a valid email!')
    }
    else {
        setSuccessMsg(email);
    }

    // validate phone number
    if (phoneVal === "") {
        setErrorMsg(phone, 'phone no. cannot be blank!');
    }
    else if (phoneVal.length != 10) {
        setErrorMsg(phone, 'Not a valid phone no.')
    }
    else {
        setSuccessMsg(phone);
    }

    // validate password
    if (passwordVal === "") {
        setErrorMsg(password, 'Password cannot be blank!');
    }
    else if (passwordVal.length <= 5) {
        setErrorMsg(password, 'Minimum 6 char!')
    }
    else {
        setSuccessMsg(password);
    }

    // validate cpassword
    if (cpasswordVal === "") {
        setErrorMsg(cpassword, 'Password cannot be blank!');
    }
    else if (passwordVal != cpasswordVal) {
        setErrorMsg(cpassword, 'Password not matching!')
    }
    else {
        setSuccessMsg(cpassword);
    }

    successMsg(fullNameVal);
}

function setErrorMsg(input, errormsgs) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errormsgs;
}

function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

