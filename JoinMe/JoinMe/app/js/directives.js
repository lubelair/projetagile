angular.module('directory.directives', [])
  .directive('userSpace', [function () {
      var dtr = new Date().getTime();
      return {
          restrict: 'A',
          replace: true,
          scope: true,
          templateUrl: 'templates/UserSpace.html?' + dtr,
          link: function (scope, element, attrs) {
          }
      };
  }])
 .directive('Accueil', [function () {
     var dtr = new Date().getTime();
     return {
         restrict: 'A',
         replace: true,
         scope: true,
         templateUrl: 'templates/accueil.html?' + dtr,
         link: function (scope, element, attrs) { }
     }
 }])
