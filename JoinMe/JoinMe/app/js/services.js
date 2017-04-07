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
            $http({
                method: "post",
                url: "/JoinMeServices/Users/" + action,
                /* params: {
                     action: "index"
                 },*/
                data: {
                    name: params
                }
            }).then(functionCallBack, handleError);
        }

        return {
            getUser: function (user) { },
            getUsers: function () {
                postUrl('GetUsers', "toto", GetUsersCallBack);
            },
            login: function (_user) {
                alert(_user.username + " " + _user.password);
            },
            createUser: function (user) {
                console.log(user);
            },
            saveSettings: function(user){
                console.log(user);
            }
        }

        // Variables

        var __User = {
            CreationTime: "",
            Email: "",
            FirstName: "",
            Id: -1,
            IsDeleted: false,
            LastName: "",
            ModificationTime: "",
            Password: "",
            PhoneNumber: -1,
            UserName: ""
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
    });
