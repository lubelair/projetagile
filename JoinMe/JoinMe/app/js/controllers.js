angular.module('directory.controllers', [])

//AppService => name of service in service.js
    .controller('SubscribeCtrl', function ($scope, $state, AppService) {
        // call createUser method of appService
        //   AppService.createUser(user);
        // V�rifier validit� du password
        //$scope.newUser = { firstname: '', lastname: '', mail: '', phonenumber: '', login: '', password: '' };

        $scope.createUser = function (user, myForm) {
            console.log(myForm.$valid);
            AppService.createUser(user);
        }

        $scope.authentification = function () {
            //change state to authentification state
            $state.go('authentification');
        }
    })

    .controller('AuthentificationCtrl', function ($scope, $state, AppService) {
        $scope.user = { username: '', password: '' };

        $scope.connect = function (_user) {
            console.log(_user);
            AppService.login(_user);
        }
        $scope.inscription = function () {
            //change state to inscription state
            $state.go('inscription');
            // AppService.getUsers();
        }
        $scope.forgetPassword = function () {
            //$state.go('forgetPassword');
        }
    })

    .controller('SettingsCtrl', function ($scope, $state, AppService) {
        $scope.saveSettings = function (user, myForm) {
            console.log(myForm.$valid);
            AppService.saveSettings(user);
        }
        $scope.deleteCount = function (user) {
            console.log("suppression du compte");
        }
    })

    .controller('AccueilCtrl', function ($scope, $state, AppService) {

    })
;