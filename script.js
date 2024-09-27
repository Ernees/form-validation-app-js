const firebaseConfig = {
    apiKey: "AIzaSyDZfFP0W_XrlNmna8z1ADnZSf9RkWmog_o",
    authDomain: "form-data-cb23b.firebaseapp.com",
    projectId: "form-data-cb23b",
    storageBucket: "form-data-cb23b.appspot.com",
    messagingSenderId: "381627603947",
    appId: "1:381627603947:web:26036133984553c2cd97ae",
    measurementId: "G-DLLZPYNYMR"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();

    let entryName = document.getElementById('name') 
    let nameError = document.getElementById('nameError')

    if (entryName.value.trim() === ''){
        nameError.textContent = 'please enter your name'
        nameError.classList.add('error-message')
    }else{
        nameError.textContent = ''
        nameError.classList.remove('error-message')
    }

    let entryMail = document.getElementById('email') 
    let emailError = document.getElementById('emailError') 
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(entryMail.value)){
        emailError.textContent = 'please enter a valid email address'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    let entryPassword = document.getElementById('password') 
    let passError = document.getElementById('passwordError') 
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!passPattern.test(entryPassword.value)){
        passError.textContent = 'The password must be between 8 and 15 characters long, including at least one uppercase letter, one lowercase letter, one number, and one special character (such as $ @ ! % * ? & #).'
        passError.classList.add('error-message')
    }else{
        passError.textContent = ''
        passError.classList.remove('error-message')
    }

    if(!nameError.textContent && !emailError.textContent && !passError.textContent){
        db.collection("users").add({
            nombre: entryName.value,
            email: entryMail.value,
            password: entryPassword.value
        })
        .then((docRef) => {
        alert('the form has been submitted successfully', docRef.id);
        document.getElementById('form').reset();
        })
        .catch((error) => {
        alert(error);
        });
    }
})