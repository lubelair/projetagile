angular.module('directory.services', [])

    .factory('AppService', function ($q, $http, $ionicPopup, $cookieStore, $state) {
        var postUrl = function (action, params, functionCallBack) {
            //angular.toJson(params)
            var parameter =JSON.parse( JSON.stringify(params));
            console.log("postUrl : ", _AjaxUrl + action);
            console.log("postUrl  param: ", parameter);

            $http.post(_AjaxUrl + action, parameter).then(functionCallBack, handleError);
        }

        initState($state);
        initIoniPopup($ionicPopup);
        initCookies($cookieStore);

        return {
            getUser: function () {
                return __User;
            },
            getUsers: function () {
                console.log('OK');
                postUrl('GetUsers', $cookieStore.get('user').UserName, GetUsersCallBack);
            },
            deleteUser: function () {
                postUrl('DeleteUser', $cookieStore.get('user').Id, deleteUserCallBack);
            },
            getFriends: function () {
                // test if friends is not empty
                if (getScopes('FriendsCtrl').friends.length > 0 && getScopes('EventFriendsCtrl').eventfriends.length > 0) {
                    console.log("friends already exists");
                    return;
                }
                // if friends is empty we call database server
                postUrl('GetFriends', $cookieStore.get('user').Id, GetFriendsCallBack);
            },
            getInvitations: function () {
                if (getScopes('FriendsCtrl').friendsInvitation.length > 0) {
                    console.log("friends invite already exists");
                    return;
                }
                postUrl('GetInvitations', $cookieStore.get('user').Id, GetInvitationsCallBack);
            },

            getEventssend: function () {
                if (getScopes('EventsCtrl').eventssend.length > 0) {
                    console.log("events send invite already exists");
                    return;
                }
                postUrl('GetEventssend', $cookieStore.get('user').Id, GetEventssendCallBack);
            },
            getEventsrecived: function () {
                if (getScopes('EventsCtrl').eventsrecived.length > 0) {
                    console.log("events recived invite already exists");
                    return;
                }
                postUrl('GetEventsrecived', $cookieStore.get('user').Id, GetEventsrecivedCallBack);
            },

            login: function (credentials) {
                postUrl('Authenticate', credentials, loginCallBack);
            },
            createUser: function (user) {
                user.CreationTime = new Date();
                user.ModificationTime = user.CreationTime;
                postUrl('PostUser', user, createUserCallBack);
            },
            updateUser: function (user) {
                postUrl('PutUser', user, updateUserCallBack);
            },
            selectPhoto: function () {
                showActionSheet();
            },
            SendPwd: function (mail) {
                // Envoi par mail du MDP
            },
            CreateEvent: function (event) {
                console.log("Create event :", event);
                postUrl('PostEvent', event, createEventCallBack)
            }
        }
    })
.factory('Scopes', function ($rootScope) {
    _Scopes = {};
    return {
        store: function (key, value) {
            _Scopes[key] = value;
        },
        get: function (key) {
            return _Scopes[key];
        }
    };
    // _Scopes = mem;
})