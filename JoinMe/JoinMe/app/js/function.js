function checkPwd() {
    if(document.getElementById("passwordValid").value != document.getElementById("password").value)
        return false;
    return true;
}