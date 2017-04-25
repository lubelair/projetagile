angular.module('directory.directives', [])

    .directive('headerView', [function () {
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'templates/header.html',
            link: function (scope, element, attrs) {
                scope.openSettings = function () { alert('toto'); getState().go('settings'); }

            },
            }
    }])

    .directive('userSpaceView', [function () {
      var dtr = new Date().getTime();
      return {
          restrict: 'A',
          replace: true,
          scope: true,
          templateUrl: 'templates/UserSpace.html?' + dtr,
          link: function (scope, element, attrs) { }
      };
    }])

 .directive('accueilView', [function () {
     var dtr = new Date().getTime();
     return {
         restrict: 'A',
         replace: true,
         scope: true,
         templateUrl: 'templates/accueil.html?' + dtr,
         link: function (scope, element, attrs) { }
     }
 }])

.directive('eventsView', [function () {
    var dtr = new Date().getTime();
    return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: 'templates/events.html?' + dtr,
        link: function (scope, element, attrs) { }
    }
}])

    .directive('friendsView', [function () {
        var dtr = new Date().getTime();
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'templates/Friends.html?' + dtr,
            link: function (scope, element, attrs) { }
        }
    }])


  .directive('footerView', [function () {
      return {
          restrict: 'A',
          replace: true,
          scope: true,
          templateUrl: 'templates/footer.html',
          link: function (scope, element, attrs) { }
      }
  }])

  .directive('innerView', [function () {
      return {
          restrict: 'A',
          replace: true,
          scope: true,
          templateUrl: 'templates/InnerFriend.html',
          link: function (scope, element, attrs) { }
      }
  }])