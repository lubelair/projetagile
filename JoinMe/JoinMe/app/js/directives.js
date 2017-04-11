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
 .directive('calendarView', [function () {
     var dtr = new Date().getTime();
     return {
         restrict: 'A',
         replace: true,
         scope: true,
         templateUrl: 'templates/Calendar.html?' + dtr,
         link: function (scope, element, attrs) { }
     }
 }])
