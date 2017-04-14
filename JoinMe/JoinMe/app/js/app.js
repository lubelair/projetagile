angular.element(document).ready(function () {
    window.ionic.Platform.ready(function () {
        console.log("ionic is ready");
        if (window.cordova) {
            // alert("Running in Cordova, will bootstrap AngularJS once 'deviceready' event fires.");
            document.addEventListener('deviceready', function () {
                console.log("Deviceready event has fired, bootstrapping AngularJS.");
                angular.bootstrap(document.body, ['app']);
            }, false);
        } else {
            console.log("Running in browser, bootstrapping AngularJS now.");
            angular.bootstrap(document.body, ['app']);
        }
    })
});

var app = angular.module('app', ['ionic', 'ngTouch', 'ngMap', 'directory.services', 'directory.directives', 'directory.controllers']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('inscription', {
        url: '/inscription',
        templateUrl: 'templates/inscription.html',
        controller: 'SubscribeCtrl'
    })

    $stateProvider.state('authentification', {
        url: '/authentification',
        templateUrl: 'templates/authentification.html',
        controller: 'AuthentificationCtrl'
    })

    $stateProvider.state('accueil', {
        url: '/accueil',
        templateUrl: 'templates/accueil.html',
        controller: 'AccueilCtrl'
    })

    $stateProvider.state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
    })
    $stateProvider.state('mapTest', {
        url: '/map',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
    })
    $stateProvider.state('userSpace', {
        url: '/userSpace',
        templateUrl: 'templates/UserSpace.html',
        controller: 'UserSpaceCtrl'
    })
        $stateProvider.state('events', {
            url: '/events',
            templateUrl: 'templates/events.html',
            controller: 'EventsCtrl'
        })

    $stateProvider.state('root', {
        url: '/root',
        templateUrl: 'templates/root.html',
        controller: 'RootCtrl'
    })

    $stateProvider.state('InnerFriend', {
        url: '/InnerFriend',
        templateUrl: 'templates/InnerFriend.html',
        controller: 'InnerFriends'
    })

    $urlRouterProvider.otherwise('/root')
})