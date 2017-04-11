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
.controller('MapCtrl', ['$scope', '$timeout', '$state', 'NgMap', function ($scope, $timeout, $state, NgMap) {
 /*   NgMap.getMap("map").then(function (map) {
        $scope.map = map;
    });
    */
    /*     $scope.stores = {
           foo: { position: [41, -87], items: [1, 2, 3, 4] },
           bar: { position: [41, -83], items: [5, 6, 7, 8] }
       };
 
       $scope.googleMapsUrl = "https://maps.google.com/maps/api/js?libraries=placeses,visualization,drawing,geometry,places&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM";
       $scope.pauseLoading = true;
       console.log("Starting a timer to wait for 2 seconds before the map will start loading");
 
       $timeout(function () {
           console.debug("Showing the map. The google maps api should load now.");
           $scope.pauseLoading = false;
       }, 2000);
 
       $scope.showStore = function (evt, id) {
           $scope.store = $scope.stores[id];
           $scope.map.showInfoWindow('foo', this);
       };
       */

    /* document.addEventListener("deviceready", function () {
         var device = $cordovaDevice.getDevice();

         var cordova = $cordovaDevice.getCordova();

         var model = $cordovaDevice.getModel();

         var platform = $cordovaDevice.getPlatform();

         var uuid = $cordovaDevice.getUUID();

         var version = $cordovaDevice.getVersion();
     }, false);*/
/*
    $timeout(function () {
        var device = $cordovaDevice.getDevice();
        var cordova = $cordovaDevice.getCordova();
        var model = $cordovaDevice.getModel();
        var platform = $cordovaDevice.getPlatform();
        var uuid = $cordovaDevice.getUUID();
        var version = $cordovaDevice.getVersion();
        console.log(device);
    }, 5000);
    */
    $scope.mycallback = function (map) {
        $scope.mymap = map;
        $scope.$apply();
    };
}])

