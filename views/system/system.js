// toastr options

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//app main

const { ipcMain } = require('electron');
const electron = require('electron')
const {
    ipcRenderer
} = electron;

let btn = document.getElementById("login-btn")
btn.addEventListener('click', () => {
    const userid = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    ipcRenderer.send('login-admit', {
        "userid": userid,
        "password": password
    })
})

ipcRenderer.on('auth_result', (e, result) => {
    if (result) {
        toastr.success("Oturum açma başarılı, yönlendiriliyorsunuz...", SCHOOL_NAME)
    } else {
        toastr.error("Lütfen kullanıcı kimliğinizi ve şifrenizi kontrol ediniz.", SCHOOL_NAME)
    }
})