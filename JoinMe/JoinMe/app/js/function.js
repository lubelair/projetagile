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

function checkPhone() {
    var str = document.getElementById("phoneNumber").value;
    var patt = new RegExp("[0-9]{10}");
    if (patt.test(str)) {
        document.getElementById("falsePhone").style.display = 'none';
        document.getElementById("validPhone").style.display = 'block';
        return true;
    }
    document.getElementById("falsePhone").style.display = 'block';
    document.getElementById("validPhone").style.display = 'none';
    return false;
}