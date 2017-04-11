// ###########################  Variables

var __User = {
    CreationTime: "",
    Email: "sarah@mail.fr",
    FirstName: "Sarah",
    Id: -1,
    IsDeleted: false,
    LastName: "AG",
    ModificationTime: "",
    Password: "azerty",
    PhoneNumber: 612345789,
    UserName: "sarah36"
}

// ###########################  Functions

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
    var patt = new RegExp("^(06|07)[0-9]{8}$");
    if (patt.test(str)) {
        document.getElementById("falsePhone").style.display = 'none';
        document.getElementById("validPhone").style.display = 'block';
        return true;
    }
    document.getElementById("validPhone").style.display = 'none';
    document.getElementById("falsePhone").style.display = 'block';
    return false;
}

// ###########################  CallBack functions
var indexCallBack = function (data) {
    console.log(data);
}
function GetUsersCallBack(data) {
    console.log(data);
}
var handleSuccess = function (response) {
    console.log(response.data);
}
var handleError = function (response) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (
        !angular.isObject(response.data) ||
        !response.data.message
        ) {
        console.log($q.reject("An unknown error occurred."));
        return ($q.reject("An unknown error occurred."));
    }
    // Otherwise, use expected error message.
    console.log($q.reject(response.data.message));
    return ($q.reject(response.data.message));
}

var deleteUser = function (_User) { }

function createUserCallBack(response) {
    console.log(response.data);
}

function updateUserCallBack(response) {
    __User = response.data;
    console.log(__User);
}