angular.module('directory.services', [])

    .factory('AppService', function ($q, $http) {
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
            $http.post("/JoinMeService/Service/" + action, parameter).then(functionCallBack, handleError);
        }

        return {
            getUser: function () {
                return __User
            },
            getUsers: function () {
                postUrl('GetUsers', "toto", GetUsersCallBack);
            },
            login: function (_user) {
                alert(_user.username + " " + _user.password);
            },
            createUser: function (user) {
                user.CreationTime = new Date();
                user.ModificationTime = user.CreationTime;
                postUrl('PostUser', user, createUserCallBack);
                console.log(user);
            },
            saveSettings: function (user) {
                console.log(user);
            },
            saveSettings: function (user) {
                console.log(user);
                user.ModificationTime = new Date();
                //Enregistrement en base
                //postUrl('PutUser', user, updateUserCallBack);
                // Si ok
                __User = user;
                //Sinon
                alert("L'enregistrement a échoué !")
                console.log(__User);
            }
        }

        // Variables

        var __User = {
            CreationTime: "",
            Email: "sarah@mail.fr",
            FirstName: "Sarah",
            Id: -1,
            IsDeleted: false,
            LastName: "AG",
            ModificationTime: "",
            Password: "azerty",
            PhoneNumber: -1,
            UserName: "sarah36"
        }

        // CallBack functions
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
                return ($q.reject("An unknown error occurred."));
            }
            // Otherwise, use expected error message.
            return ($q.reject(response.data.message));
        }

        var deleteUser = function (_User) { }

        function createUserCallBack(response) {
            console.log(response.data);
        }

        function updateUserCallBack(response) {
            console.log(response.data);
        }
    });