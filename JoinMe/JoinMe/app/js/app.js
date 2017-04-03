// angular.module is a global place for creating, registering and retrieving Angular modules
// 'directory' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'directory.services' is found in services.js
// 'directory.controllers' is found in controllers.js
angular.module('directory', ['ionic', 'directory.services', 'directory.controllers'])

    .config(function ($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js

        $stateProvider.state('connexion', {
            url: '/login',
            templateUrl: 'templates/connexion.html',
            controller: 'connexionCtrl'
        })

        $stateProvider.state('inscription', {
            url: '/subscribe',
            templateUrl: 'templates/inscription.html',
            controller: 'inscriptionCtrl'
        })

        $urlRouterProvider.otherwise('/login')
    });