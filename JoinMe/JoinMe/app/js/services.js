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
        var postUrl = function () {
            $http({
                method: "post",
                url: "/JoinMeServices/app/index",
                /* params: {
                     action: "index"
                 },*/
                data: {
                    name: "toto"
                }
            }).then(handleSuccess, handleError);
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

        var indexCallBack = function (data) {
            console.log(data);
        }

        var _User = [{ id: -1, fistname: "", lastname: "", mail: "", phonenumber: -1, login: "", password: "" }]

        return {
            getUser:function(_User){}
        }

        var createUser = function (_User) { }
        
        var deleteUser = function (_User) { }

    });