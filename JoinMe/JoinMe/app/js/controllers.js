angular.module('directory.controllers', [])

    .controller('subscribeCtrl', function($scope, AppService) {

        $scope.createUser = function (_User) {
            AppService.createUser(_User);
        }

    });