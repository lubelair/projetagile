angular.module('directory.controllers', [])

//AppService => name of service in service.js
    .controller('SubscribeCtrl', function ($scope, $state, AppService) {
        // call createUser method of appService
        //   AppService.createUser(user);
        // Vérifier validité du password
        $scope.newUser = { FirstName: '', LastName: '', Email: '', PhoneNumber: '', UserName: '', Password: '' };

        $scope.createUser = function (user) {
            AppService.createUser(user);
            //  $state.go('accueil')
        }
        //---------------------checkpwd-----------------------------------------------//
        $scope.checkPwd = function (subscribeForm) {
            //console.log(myForm.$valid);
            subscribeForm.confirmpwd.$valid = false;
            if (document.getElementById("confirmpwd").value != document.getElementById("password").value) {
                subscribeForm.confirmpwd.$valid = false;
            }
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
        $scope.regex = '[0-9]{10}';
        $scope.saveSettings = function (user, myForm) {
            console.log(myForm.$valid);
            AppService.saveSettings(user);
        }
        $scope.deleteAccount = function (user) {
            console.log("suppression du compte");
        }
    })

    .controller('AccueilCtrl', function ($scope, $state, AppService) {
    })
 .controller('MapCtrl', function ($scope, $state, NgMap) {
     $scope.message = 'You can not hide. :)';
     var vm =this;
     vm.message = 'You can not hide. :)';
     NgMap.getMap("map").then(function (map) {
         console.log('get map');

         vm.map = map;
     });
     $scope.callbackFunc = function (param) {
         console.log('I know where ' + param + ' are. ' + vm.message);
         console.log('You are at' + vm.map.getCenter());
     };
 })
;
