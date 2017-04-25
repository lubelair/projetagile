/***  Variables de test ***/

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
var _Cookies;
// associative array for time
var _TimeObject = {};

// default ajax url set to localhost
var _AjaxUrl = "/JoinMeService/Service/";

/*** Functions ***/

//************************************************************
// Vérification du mot de passe depuis la page d'inscription *
//************************************************************

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

function getState() {
    return _State;
}

function initState($state) {
    _State = $state;
}

function initIoniPopup($ionicPopup) {
    _IonicPopup = $ionicPopup;
}

function getIonicPopup() {
    return _IonicPopup;
}

function initCookies($cookieStore) {
    _Cookies = $cookieStore;
}

function getCookieStore() {
    return _Cookies;
}

function showAlert(titre, message) {
    getIonicPopup().alert({
        title: titre,
        template: message
    });
}

/***  CallBack functions ***/

var indexCallBack = function (data) {
    console.log(data);
}
function GetUsersCallBack(data) {
    console.log(data);
}
function GetFriendsCallBack(data) {
    console.log(data);
}
function GetInvitationCallBack(data) {
    console.log(data);
}
var handleSuccess = function (response) {
    console.log(response.data);
}
var handleError = function (response) {
    if (
        !angular.isObject(response.data) ||
        !response.data.message
        ) {
        console.log(("An unknown error occurred."));
    }
    console.log(response.data.message);
}

var deleteUser = function (_User) { }

function createUserCallBack(response) {
    if (response.data === null) {
        showAlert("Attention !", "Ce pseudonyme est deja pris, ou un compte existe deja a votre numero et/ou adresse.");
    } else {
        saveCookies('user', response.data);
        console.log(getCookie('user'));
        getState().go("userSpace");
    }
}

function updateUserCallBack(response) {
    __User = response.data;
    console.log(__User);
}

function loginCallBack(response) {
    console.log(response.data);
    if (response.data === null) {
        showAlert("Attention !", "Saisie du mail ou du mot de passe incorrecte.");
    } else {
        getState().go("userSpace");
    }
}

/***  Cookies functions ***/

//*********************************************************
// Fonction générique de sauvegarde des cookies           *
// La key représente l'identifiant du cookie, et la value *
// l'élément auquel il est lié                            *
//*********************************************************

function saveCookies(key, value) {
    getCookieStore().put(key, value);
}

function getCookie(key) {
    return getCookieStore().get(key);
}
/* init ajax Url*/
function initAjax(isProd) {
    if (isProd) {
        _AjaxUrl = "http://lubelair-001-site1.gtempurl.com/JoinMeService/service/";
    }
}
/*Get time now*/
function timeNow() {
    var now = new Date(),
    ampm = 'am',
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds();
    if (h >= 12) {
        if (h > 12) h -= 12;
        ampm = 'pm';
    }

    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    _TimeObject["hours"] = h;
    _TimeObject["min"] = m;
    _TimeObject["seconds"] = s;
    _TimeObject["ampm"] = ampm;
    console.log(now.toLocaleDateString() + ' ' + h + ':' + m + ':' + s + ' ' + ampm);
    return now.toLocaleDateString() + ' ' + h + ':' + m + ':' + s + ' ' + ampm;
}