// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('directory', ['ionic', 'ngTouch', 'ngMap', 'directory.services', 'directory.directives', 'directory.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
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
    $stateProvider.state('InnerFriend', {
        url: '/InnerFriend',
        templateUrl: 'templates/InnerFriend.html',
        controller: 'InnerFriends'
    })
    $stateProvider.state('root', {
        url: '/root',
        templateUrl: 'templates/UserSpace.html',
        controller: 'RootCtrl'
    })

    $urlRouterProvider.otherwise('/root')
})
