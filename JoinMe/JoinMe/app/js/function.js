/***  Variables de test ***/

var __User = {
    CreationTime: "",
    Email: "",
    FirstName: "",
    Id: -1,
    IsDeleted: false,
    LastName: "",
    ModificationTime: "",
    Password: "",
    PhoneNumber: 0,
    UserName: "",
    Photo: ""
}

var _State;
var _IonicPopup;
var _Cookies;
// associative array for time
var _TimeObject = {};

// default ajax url set to localhost
var _AjaxUrl = "/JoinMeService/Service/";
//variable to store controllers scopes
var _Scopes = {};

//List friends

var _ListFriends = [];

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

function showConfirm(titre, message, btnLeft, btnRight, procBtnLeft, procBtnRight) {
    var confirmPopup = getIonicPopup().confirm({
        title: titre,
        template: message,
        buttons: [
            {
                text: btnLeft,
                onTap: procBtnLeft
            },
            {
                text: btnRight,
                onTap: procBtnRight
            }
        ]
    });
}

function activeAccount() {
    var user = __User;
    user.IsActive = true;
    getScopes('Authentification').appService.updateUser(user);
    getState().go("root");
}

/***  CallBack functions ***/

var indexCallBack = function (data) {
    console.log(data);
}
function GetUsersCallBack(data) {
    console.log(data);
}
function GetFriendsCallBack(response) {
   /*var Listfriends = [
               { LastName: 'Zabi', FirstName: 'Zabi' },
               { nom: 'tata 2 ', prenom: 'toto 2' },
               { nom: 'tata 3 ', prenom: 'toto 3' },
               { nom: 'tata 4 ', prenom: 'toto 4' }
    ];

          _ListFriends = response.data;
     getScopes('FriendsCtrl').friends = Listfriends;

     console.log("list friends");
     console.log("result = " + response.data);
          console.log(response.data);*/
    console.log(response.data);
    setTimeout(function () {
        getScopes('FriendsCtrl').$apply(function () {
            getScopes('FriendsCtrl').friends = response.data;
        });
    }, 10);
    // getScopes('FriendsCtrl').$Apply();
    // console.log(data);
}

function GetInvitationsCallBack(response) {
    //response est vide
    console.log(response.data);
    setTimeout(function () {
        getScopes('FriendsCtrl').$apply(function () {
            getScopes('FriendsCtrl').friendsInvitation = response.data;
        });
    }, 10);
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
    console.log(response);
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
    saveCookies('user', response.data);
}

function loginCallBack(response) {
    console.log(response.data);
    if (response.data === null) {
        showAlert("Attention !", "Saisie du mail ou du mot de passe incorrecte.");
    } else {
        //Le user existe, on teste maintenant si le compte est actif
        __User = response.data;
        if (__User.IsActive) {
            console.log("loggedUser");
            saveCookies('user', response.data);
            getState().go("userSpace");
        } else {
            showConfirm("Attention !", "Votre compte est désactivé, voulez-le réactiver ?", "Oui", "Non", activeAccount);
        }
    }
}

/***  Cookies functions ***/

//*********************************************************
// Fonction générique de sauvegarde des cookies           *
// La key représente l'identifiant du cookie, et la value *
// l'élément auquel il est lié                            *
//*********************************************************

function saveCookies(key, value) {
    var now = new Date(),
    // this will set the expiration to 12 months
    exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    getCookieStore().put(key, value, {
        expires: exp
    });
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

//init scopes
function initScopes(scopes) {
    _Scopes = scopes;
}
// get current scopes
function getScopes(key) {
    return _Scopes[key];
}

function goToEvent() {
    getScopes('UserSpace').slider.slideTo(0);
}

function getListFriends() {
    var Listfriends = [
             { nom: 'tata 1 ', prenom: 'toto 1' },
             { nom: 'tata 2 ', prenom: 'toto 2' },
             { nom: 'tata 3 ', prenom: 'toto 3' },
             { nom: 'tata 4 ', prenom: 'toto 4' }
    ];

    setTimeout(function () {
        getScopes('FriendsCtrl').$apply(function () {
            getScopes('FriendsCtrl').myfriends = Listfriends;
        });
    }, 10);
    // getScopes('FriendsCtrl').$apply();
    // getScopes('UserSpace').slider.slideTo(0);
}

function getListInvitaions() {
    var Listfriends = [
          { nom: 'tata 1 ', prenom: 'toto 1' },
          { nom: 'tata 2 ', prenom: 'toto 2' },
          { nom: 'tata 3 ', prenom: 'toto 3' },
          { nom: 'tata 4 ', prenom: 'toto 4' }
    ];
    setTimeout(function () {
        getScopes('FriendsCtrl').$apply(function () {
            getScopes('FriendsCtrl').friendsInvitation = Listfriends;
        });
    }, 10);
}