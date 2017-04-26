angular.module('directory.directives', [])

    .directive('headerView', [function () {
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'templates/header.html',
            link: function (scope, element, attrs) {
                scope.openSettings = function () { getState().go('settings'); }
                scope.openLastPage = function () { window.history.back(); }
            }
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
      var dtr = new Date().getTime();
      return {
          restrict: 'A',
        //  replace: true,
          scope: true,
          templateUrl: 'templates/footer.html?' + dtr,
          controller: 'UserSpaceCtrl',
          link: function (scope, element, attrs,Scopes) {
             /* scope.goEvents = function () {
                  alert("toto");
                  console.log("toto");
                 // scope.get('UserSpace').activeIndex = 0;
              }*/
          }
         
      }
  }])

  .directive('innerFriendsView', [function () {
      return {
          restrict: 'A',
          replace: true,
          scope: true,
          templateUrl: 'templates/InnerFriend.html',
          link: function (scope, element, attrs) { }
      }
  }])

 .directive('eventView', [function () {
     return {
         restrict: 'A',
         replace: true,
         scope: true,
         templateUrl: 'templates/InnerEvent.html',
         link: function (scope, element, attrs) { }
     }
 }])
.directive('calendarView', [function () {
    var dtr = new Date().getTime();
    return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: 'templates/Calendar.html?' + dtr,
        link: function ($scope, element, attrs) {
            var communOptions = {
                direction: 'vertical',
                centeredSlides: true,
                slidesPerView: 3,
                //  spaceBetween: 5,
                //   autoHeight: true,
                calculateHeight: false
            };
            // init swiper hours options
            var slideOptionsH = angular.copy(communOptions);
            slideOptionsH.loop = false;
            slideOptionsH.initialSlide = (((_TimeObject["hours"] - 1) % 12) + 12);
            slideOptionsH.onSlideChangeEnd = function (swiper) {
                console.log("Console hours");
                console.log(swiper);
            }
            // init swiper min options
            var slideOptionsM = angular.copy(communOptions);
            slideOptionsM.loop = false;
            var min = (((_TimeObject["min"]-1) % 12) + 12);
            console.log(min);
            slideOptionsM.initialSlide = min;
            slideOptionsM.onSlideChangeEnd = function (swiper) {
                console.log("Console min");
                console.log(swiper);
            }
            // init swiper AmPm options
            $scope.initialSlideAmPm = 1;
            if (_TimeObject["ampm"] === "pm") {
                $scope.initialSlideAmPm = 2;
            }
            var slideOptionsAmPm = angular.copy(communOptions);
            slideOptionsAmPm.loop = false;
            slideOptionsAmPm.initialSlide = $scope.initialSlideAmPm;
            slideOptionsAmPm.onSlideChangeEnd = function (swiper) {
                console.log("Console  ampm");
                console.log(swiper);
            }
            slideOptionsAmPm.runCallbacksOnInit = true;

            // init swiper TodayTomorrow options
            var swiperTodTom = angular.copy(communOptions);
            swiperTodTom.loop = false;
            swiperTodTom.onSlideChangeEnd = function (swiper) {
                console.log("Console tod");
                console.log(swiper);
            }

            var swiperG = new Swiper('.swiper-container.global', {
                simulateTouch: true, allowSwipeToNext: false, allowSwipeToPrev: false,
                centeredSlides: true,
                //   slidesPerView: 3,
                spaceBetween: 0,
                //   autoHeight: true,
                calculateHeight: false,
                setWrapperSize: true,
                touchEventsTarget: 'container'
            });

            var swiperH = new Swiper('.swiper-container.hours', slideOptionsH);
            var swiperM = new Swiper('.swiper-container.minutes', slideOptionsM);
            var swiperAmPm = new Swiper('.swiper-container.AmPm', slideOptionsAmPm);
            var swiperTodTom = new Swiper('.swiper-container.TodayTomorrow', swiperTodTom);

            swiperH.activeIndex = _TimeObject["hours"];
            swiperM.activeIndex = _TimeObject["min"];
        }
    }
}])