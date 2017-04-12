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
    UserName: "sarah36",
    Photo: ""
}

var _State;
var _IonicPopup;

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

function showActionSheet($ionicActionSheet) {
    var showActionSheet = $ionicActionSheet.show({
        buttons: [
           { text: 'Modifier la photo' }
        ],

        destructiveText: 'Supprimer la photo',
        cancelText: 'Fermer',

        cancel: function () {
        },

        buttonClicked: function (index) {
            if (index === 0) {
                // Modification de la photo
                var edit_save = document.getElementById("photoUser");
                edit_save.src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQfbzUlHzE133HxXyjo2zHB86i33k1F4tpbu18QSR8fNS_Kc-y4";
                cancel;
            }
        },

        destructiveButtonClicked: function () {
            // Suppression de la photo
        }
    });
}

// Get state
function getState() {
    return _State;
}
//Init state
function initState($state) {
    _State = $state;
}
// init IonicPopup
function initIoniPopup($ionicPopup) {
    _IonicPopup = $ionicPopup;
}
// get IonicPopup
function getIonicPopup() {
    return _IonicPopup;
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
        console.log(("An unknown error occurred."));
    }
    // Otherwise, use expected error message.
    console.log(response.data.message);
}

var deleteUser = function (_User) { }

function createUserCallBack(response) {
    console.log(response.data);
}

function updateUserCallBack(response) {
    __User = response.data;
    console.log(__User);
}

function loginCallBack(response) {
    getIonicPopup().alert({
        title: 'Error',
        template: 'form not valid'
    });
    console.log(response.data);
}

function showAlert(titre, message) {
    getIonicPopup().alert({
        title: titre,
        template: message
    });
}