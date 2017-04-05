angular.module('directory.controllers', [])

//AppService => name of service in service.js
    .controller('SubscribeCtrl', function ($scope, $state, AppService) {
        $scope.createUser = function (user) {
            // call createUser method of appService
            //   AppService.createUser(user);
            alert("toto");
        }
    })
    .controller('AuthentificationCtrl', function ($scope, $state, AppService) {
        $scope.connect = function (login, password) {
            // AppService.connect(_Login, _Password);
        }
        $scope.inscription = function () {
            //change state to inscription state 
            $state.go('inscription');
        }
        $scope.forgetPassword = function () {
            //$state.go('forgetPassword');
        }
    });
