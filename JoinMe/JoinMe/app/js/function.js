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
    Photo: "",
    IsActive: true
}

var _State;
var _IonicPopup;
var _Cookies;
var _IonicLoading;

// associative array for time
var _TimeObject = {};

// default ajax url set to localhost
var _AjaxUrl = "/JoinMeService/Service/";
//variable to store controllers scopes
var _Scopes = {};

//List friends

var ListFriends = [];

// Calendar time
var _CalendarTime = {};
// Event infos
var _EventOptions = {};
// Current Position
var _CurrentPosition = {};
// List added friends
var _ListAddedFriends = [];

var _ListEventReceived = [];
var _ListEventSend = [];

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

//************************************************************
// Function permettant l'affichage d'un menu contextuel      *
//************************************************************
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

//************************************************************
// Fonction de gestion des états                             *
//************************************************************
function getState() {
    return _State;
}

function initState($state) {
    _State = $state;
}

//************************************************************
// Affichage de popup personnalisées                         *
//************************************************************
function initIoniPopup($ionicPopup) {
    _IonicPopup = $ionicPopup;
}

function getIonicPopup() {
    return _IonicPopup;
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

//********************************************************************
// Fonctions de gestion de l'affichage d'un icône lors du chargement *
//********************************************************************
function initIonicLoading($ionicLoading) {
    _IonicLoading = $ionicLoading;
}
function showLoading() {
    _IonicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
}

function hideLoading() {
    _IonicLoading.hide();
}

//*********************************************************
// Fonctions de gestion des cookies                       *
//*********************************************************
// Fonction générique de sauvegarde des cookies           *
// La key représente l'identifiant du cookie, et la value *
// l'élément auquel il est lié                            *
//*********************************************************
function initCookies($cookieStore) {
    _Cookies = $cookieStore;
}

function getCookieStore() {
    return _Cookies;
}

function saveCookies(key, value) {
    console.log("saveCookies:", key);
    console.log("value:", value);

    var now = new Date(),
    // this will set the expiration to 12 months
    exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    getCookieStore().put(key, value, {
        expires: exp
    });
}

function getCookie(key) {
    console.log("getCookie:", key);
    console.log("value:", getCookieStore().get(key));
    return getCookieStore().get(key);
}

//************************************************************
// Fonctions permettant de partager le scope d'un controller *
//************************************************************

//init scopes
function initScopes(scopes) {
    _Scopes = scopes;
}
// get current scopes
function getScopes(key) {
    return _Scopes[key];
}

//********************************************************************
// Fonction permettant de lier l'appli (en prod) au serveur en ligne *
//********************************************************************
function initAjax(isProd) {
    if (isProd) {
        _AjaxUrl = "http://lubelair-001-site1.gtempurl.com/JoinMeService/service/";
    }
}

//********************************************************************
// Fonctions annexes à la gestion du calendier                       *
//********************************************************************

// Récupère la date et l'heure actuels
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

//check if time is am or pm
function isAm(index) {
    return index == 0 ? true : false;
}

// get time from calendar
function getTimeFromCalendar() {
    return _CalendarTime;
}

function initTimeFromCalendar(time) {
    _CalendarTime = time;
}

function initCurrentPosition(position) {
    _CurrentPosition = position;
}
function getCurrentPosition() {
    return _CurrentPosition;
}
// get current date
function getCurrentDate() {
    var now = new Date();
    return { year: now.getUTCFullYear(), month: now.getUTCMonth(), day: now.getUTCDate() }
}
// Create event time
function createEventTime() {
    var now = getCurrentDate();
    var calendarTime = getTimeFromCalendar();
    var eventDay = now.day;
    if (calendarTime.todayTomorrow === "Tomorrow") {
        eventDay = eventDay + 1;
    }
    //   var dt = new Date(now.year, now.month, eventDay, calendarTime.hours, calendarTime.min);
    var dt = new Date(now.year, now.month, eventDay);
    dt.setHours(calendarTime.hours - (dt.getTimezoneOffset() / 60));
    dt.setMinutes(calendarTime.min);
    console.log("current date :", dt);
    //  console.log("parse date :", Date.parse(dt));
    return dt;
}

//********************************************************************
// Fonctions annexes à la gestion des listes d'une page html         *
//********************************************************************

//Find items in array by Id
function findItemByID(items, id) {
    var index = items.findIndex(item=>item.FriendId === id);
    console.log("findAddedFriendByID: item exists at :", index);
    return index;
}

// delete item from array by index
function deleteExistingItem(items, index) {
    console.log("deleteExistingItem:", items.splice(index, 1));
    console.log("deleteExistingItem:new value:", items);
}

//************************************************************
// Fonctions callback (exécutées après appel au serveur      *
//************************************************************

var indexCallBack = function (data) {
    console.log(data);
}

// liées au user    ******************************************
function loginCallBack(response) {
    console.log("loginCallBack", response.data);
    hideLoading();
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

function activeAccount() {
    var user = __User;
    user.IsActive = true;
    getScopes('Authentification').appService.updateUser(user);
}

function GetUsersCallBack(response) {
    console.log("GetUsersCallBack:", response.data);
    setTimeout(function () {
        getScopes('FriendsCtrl').$apply(function () {
            getScopes('FriendsCtrl').findedFriends = response.data;
        });
    }, 10);
}
function createUserCallBack(response) {
    hideLoading();
    if (response.data === null) {
        showAlert("Attention !", "Ce pseudonyme est deja pris, ou un compte existe deja a votre numero et/ou adresse.");
    } else {
        saveCookies('user', response.data);
        console.log(getCookie('user'));
        getState().go("userSpace");
    }
}

function updateUserCallBack(response) {
    console.log(response.data);
    if (response.data.IsActive) {
        saveCookies('user', response.data);
        getState().go("userSpace");
    }
    else {
        getScopes('Settings').disconnect();
    }
}

function deleteUserCallBack(response) {
    getScopes('Settings').disconnect();
}

// liées aux friends (relation d'amitié) *********************
function GetFriendsCallBack(response) {
    console.log("GetFriendsCallBack", response.data);
    setTimeout(function () {
        if (getScopes('FriendsCtrl') != null) {
            getScopes('FriendsCtrl').$apply(function () {
                getScopes('FriendsCtrl').friends = response.data;
                ListFriends = response.data;
            });
        }

        if (getScopes('EventFriendsCtrl') != null) {
            getScopes('EventFriendsCtrl').$apply(function () {
                getScopes('EventFriendsCtrl').eventfriends = response.data;
                getScopes('EventFriendsCtrl').$broadcast('scroll.refreshComplete')
            });
        }

        hideLoading();
    }, 10);
}

function AddFriendCallBack(response) {
    console.log("AddFriendCallBack:", response.data);
    if (getScopes('FriendsCtrl') != null) {
        setTimeout(function () {
            getScopes('FriendsCtrl').$apply(function () {
                getScopes('FriendsCtrl').findedFriends = [];
                getScopes('FriendsCtrl').$broadcast('scroll.refreshComplete');
                hideLoading();
            });
        }, 10);
    }
}

function DeleteFriendsCallBack(response) {
    console.log("amitié supprimée");
    getScopes('FriendsCtrl').refreshFriend();
}

function UpdateFriendsCallBack(response) {
    console.log("amitié modifiée");
    console.log(response.data);
    getScopes('FriendsCtrl').refreshInvitation();
    getScopes('FriendsCtrl').refreshFriend();
}

function GetInvitationsCallBack(response) {
    console.log("GetInvitationsCallBack", response.data);
    setTimeout(function () {
        getScopes('FriendsCtrl').$apply(function () {
            getScopes('FriendsCtrl').friendsInvitation = response.data;
        });
        hideLoading();
    }, 10);
}

// liées aux événements **************************************
function GetEventssendCallBack(response) {
    console.log(response.data);

    setTimeout(function () {
        getScopes('EventsCtrl').$apply(function () {
            getScopes('EventsCtrl').eventssend = response.data;
        });
        hideLoading();
    }, 10);
}

function GetEventsrecivedCallBack(response) {
    console.log(response.data);
    setTimeout(function () {
        getScopes('EventsCtrl').$apply(function () {
            getScopes('EventsCtrl').eventsrecived = response.data;

            ListFriends = response.data;
        });
    }, 10);
}

function DeleteEventReceivedCallBack(response) {
    console.log("evénement supprimé");
    getScopes('EventsCtrl').refreshEventrecived();
}

function DeleteEventSendCallBack(response) {
    console.log("evénement supprimé");
    getScopes('EventsCtrl').refreshEventsend();
}
function createEventCallBack(response) {
    console.log("Event created : ", response.data);
    setTimeout(function () {
        getScopes('EventsCtrl').$apply(function () {
            hideLoading();
            getScopes('EventsCtrl').eventfriends = response.data;
        });
    }, 10);
    getState().go("userSpace");
}

var handleSuccess = function (response) {
    console.log(response.data);
}
var handleError = function (response) {
    hideLoading();
    if (
        !angular.isObject(response.data) ||
        !response.data.message
        ) {
        showAlert("An unknown error occurred.");
    }
    console.log(response);
}