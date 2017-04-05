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

        $scope.user = { username: '', password: '' };

        $scope.connect = function (_user) {
            // AppService.connect(_Login, _Password);
            console.log(_user);
        }
        $scope.inscription = function () {
            //change state to inscription state
            // $state.go('inscription');
            AppService.getUsers();
        }
        $scope.forgetPassword = function () {
            //$state.go('forgetPassword');
        }
    });
