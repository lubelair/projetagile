angular.module('directory.controllers', [])

    .controller('subscribeCtrl', function($scope, AppService) {

        $scope.createUser = function (_User) {
            AppService.createUser(_User);
        }

        $scope.connect = function (_Login, _Password) {
            AppService.connect(_Login, _Password)
        }
    });