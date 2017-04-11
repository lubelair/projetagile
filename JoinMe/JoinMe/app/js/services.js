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
                return __User;
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
                console.log("createUser = " + user);
            },
            saveSettings: function (user) {
                user.ModificationTime = new Date();
                user.CreationTime = user.ModificationTime;
                user.Id = 1;
                user.UserName = "Loustic";

                postUrl('PutUser', user, updateUserCallBack);
            },
            selectPhoto: function () {
                showActionSheet();
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
                            //edit_save.onclick = function () {
                            edit_save.src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQfbzUlHzE133HxXyjo2zHB86i33k1F4tpbu18QSR8fNS_Kc-y4";
                            //}
                        }
                    },

                    destructiveButtonClicked: function () {
                        // Suppression de la photo
                    }
                });
            }
        }

    });