angular.module('directory.controllers', [])

//AppService => name of service in service.js
    .controller('SubscribeCtrl', function ($scope, AppService) {
        $scope.createUser = function (user) {
            // call createUser method of appService
         //   AppService.createUser(user);
            alert("toto");
        }

        $scope.connect = function (login, password) {
           // AppService.connect(_Login, _Password);
        }
    }).controller('AuthentificationCtrl', function ($scope, AppService) {
    });
