angular.module('directory.services', [])

    .factory('AppService', function ($q, $http, $ionicPopup, $cookieStore, $state) {
        var postUrl = function (action, params, functionCallBack) {
            //angular.toJson(params)
            var parameter = JSON.stringify(params);
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
                postUrl('GetUsers', "toto", GetUsersCallBack);
            },
            getFriends: function () {
                // test if friends is not empty
                if (getScopes('FriendsCtrl').myfriends.length > 0) {
                    console.log("friends already exists");
                    return;
                }
                // if friends is empty we call database server
                postUrl('GetFriends', parseInt(1, 10), GetFriendsCallBack);
            },
            getInvitation: function (id) {
                postUrl('GetInvitation', "Users.id", GetInvitationCallBack);
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
                {
                    // Envoi par mail du MDP
                }
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