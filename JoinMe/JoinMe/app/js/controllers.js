angular.module('directory.controllers', [])

//AppService => name of service in service.js
    .controller('SubscribeCtrl', function ($scope, $state, AppService) {
      
            // call createUser method of appService
            //   AppService.createUser(user);
            $scope.newUser = { firstname: '', lastname: ''};
            $scope.createUser = function (user) {
                AppService.createUser(user);
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
    });
