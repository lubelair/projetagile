angular.module('directory.services', [])

    .factory('AppService', function ($q, $http, $ionicPopup, $cookieStore, $state) {
        /* var postUrl = function (action, params, functionCallBack) {
             var url = "/JoinMeServices/app/";

             $http.post("http://lubelair-001-site1.gtempurl.com/JoinMe/app/", params).then(function (response) {
                 //First function handles success
                 console.log(response.data);
                 functionCallBack(response.data);
             }, function (response) {
                 //Second function handles error
                 console.log(response.data);
             });
         }*/

        var postUrl = function (action, params, functionCallBack) {
            angular.toJson(params);
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
                if (getScopes('FriendsCtrl').friends.length>0) {
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