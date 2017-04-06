function checkPwd() {
    if (document.getElementById("passwordValid").value != document.getElementById("password").value) {
        document.getElementById("false").style.display = 'block';
        document.getElementById("valid").style.display = 'none';
        return false;
    }
    document.getElementById("false").style.display = 'none';
    document.getElementById("valid").style.display = 'block';
    return true;
}