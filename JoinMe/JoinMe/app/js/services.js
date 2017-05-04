angular.module('directory.services', [])

    .factory('AppService', function ($q, $http, $ionicPopup, $cookieStore, $state, $ionicLoading) {
        var postUrl = function (action, params, functionCallBack) {
            //angular.toJson(params)
            var parameter = JSON.parse(JSON.stringify(params));
            console.log("postUrl : ", _AjaxUrl + action);
            console.log("postUrl  param: ", parameter);

            $http.post(_AjaxUrl + action, parameter).then(functionCallBack, handleError);
        }

        initState($state);
        initIoniPopup($ionicPopup);
        initCookies($cookieStore);
        initIonicLoading($ionicLoading);

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
                if (getScopes('FriendsCtrl')!=null) {
                    if (getScopes('FriendsCtrl').friends.length > 0) {
                    console.log("friends already exists");
                    return;
                }
                }
                if (getScopes('EventFriendsCtrl')!=null) {
                    if (getScopes('EventFriendsCtrl').eventfriends.length > 0) {
                        return;
                    } 
                }
                showLoading();

                // if friends is empty we call database server
                postUrl('GetFriends', $cookieStore.get('user').Id, GetFriendsCallBack);
            },
            getInvitations: function () {
                if (getScopes('FriendsCtrl').friendsInvitation.length > 0) {
                    console.log("friends invite already exists");
                    return;
                }
                showLoading();
                postUrl('GetInvitations', $cookieStore.get('user').Id, GetInvitationsCallBack);
            },
            deleteFriends: function (FriendsId) {
                postUrl('DeleteFriends', FriendsId, DeleteFriendsCallBack);
            },
            updateFriends: function (friends) {
                postUrl('PutFriends', friends, UpdateFriendsCallBack)
            },

            getEventssend: function () {
                if (getScopes('EventsCtrl').eventssend.length > 0) {
                    console.log("events send invite already exists");
                    return;
                }
                showLoading();
                postUrl('GetEventssend', $cookieStore.get('user').Id, GetEventssendCallBack);
            },
            getEventsrecived: function () {
                if (getScopes('EventsCtrl').eventsrecived.length > 0) {
                    console.log("events recived invite already exists");
                    return;
                }
                postUrl('GetEventsrecived', $cookieStore.get('user').Id, GetEventsrecivedCallBack);
            },
            deleteEventReceived: function (eventFriends) {
                console.log("appservice.deleteEventReceived")
                postUrl('DeleteEventReceived', eventFriends, DeleteEventReceivedCallBack);
            },
            deleteEventSend: function (EventId) {
                console.log("appservice.deleteEventSend")
                postUrl('DeleteEventSend', EventId, DeleteEventSendCallBack);
            },

            login: function (credentials) {
                showLoading();
                postUrl('Authenticate', credentials, loginCallBack);
            },
            createUser: function (user) {
                showLoading();
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
                showLoading();
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