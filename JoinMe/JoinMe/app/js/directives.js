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
          link: function (scope, element, attrs, Scopes) {
              /* scope.goEvents = function () {
                   alert("toto");
                   console.log("toto");
                  // scope.get('UserSpace').activeIndex = 0;
               }*/
          }
      }
  }])

  .directive('innerFriendsView', ['AppService', function (AppService) {
      return {
          restrict: 'A',
          replace: true,
          scope: {
              listfriend: '=',
              doRefresh: '&',
              showAddBtn: '=',
              showSwipBtn: '=',
              friendView: '='
          },
          templateUrl: 'templates/InnerFriend.html',
          link: function (scope, element, attrs) {
              scope.inviteFriend = function (friend) {
                  // check if a friend is already added
                  console.log("inner friend appService",AppService);
                  var index = findItemByID(_EventOptions.InvitedFriends, friend.id);
                  if (index > -1) {
                      // delete added friend
                      deleteExistingItem(_EventOptions.InvitedFriends, index);
                      return;
                  }
                  _EventOptions.InvitedFriends.push({ EventId: "", FriendId: friend.id });
              }
          }
      }
  }])

 .directive('eventView', [function () {
     return {
         restrict: 'A',
         replace: true,
         scope: {
             listevents: '=',
             doRefresh: '&'
         },
         templateUrl: 'templates/InnerEvent.html',
         link: function (scope, element, attrs) { }
     }
 }])

.directive('clickForOptionsWrapper', [function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
            this.closeOptions = function () {
                $scope.$broadcast('closeOptions');
            }
        }
    };
}])

    .directive('clickForOptions', ['$ionicGesture', function ($ionicGesture) {
        return {
            restrict: 'A',
            scope: false,
            require: '^clickForOptionsWrapper',
            link: function (scope, element, attrs, parentController) {
                // A basic variable that determines wether the element was currently clicked
                var clicked;

                // Set an initial attribute for the show state
                attrs.$set('optionButtons', 'hidden');

                // Grab the content
                var content = element[0].querySelector('.item-content');

                // Grab the buttons and their width
                var buttons = element[0].querySelector('.item-options');

                var closeAll = function () {
                    element.parent()[0].$set('optionButtons', 'show');
                };

                // Add a listener for the broadcast event from the parent directive to close
                var previouslyOpenedElement;
                scope.$on('closeOptions', function () {
                    if (!clicked) {
                        attrs.$set('optionButtons', 'hidden');
                    }
                });

                // Function to show the options
                var showOptions = function () {
                    // close all potentially opened items first
                    parentController.closeOptions();

                    var buttonsWidth = buttons.offsetWidth;
                    ionic.requestAnimationFrame(function () {
                        // Add the transition settings to the content
                        content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                        // Make the buttons visible and animate the content to the left
                        buttons.classList.remove('invisible');
                        content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';

                        // Remove the transition settings from the content
                        // And set the "clicked" variable to false
                        setTimeout(function () {
                            content.style[ionic.CSS.TRANSITION] = '';
                            clicked = false;
                        }, 250);
                    });
                };

                // Function to hide the options
                var hideOptions = function () {
                    var buttonsWidth = buttons.offsetWidth;
                    ionic.requestAnimationFrame(function () {
                        // Add the transition settings to the content
                        content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                        // Move the content back to the original position
                        content.style[ionic.CSS.TRANSFORM] = '';

                        // Make the buttons invisible again
                        // And remove the transition settings from the content
                        setTimeout(function () {
                            buttons.classList.add('invisible');
                            content.style[ionic.CSS.TRANSITION] = '';
                        }, 250);
                    });
                };

                // Watch the open attribute for changes and call the corresponding function
                attrs.$observe('optionButtons', function (value) {
                    if (value == 'show') {
                        showOptions();
                    } else {
                        hideOptions();
                    }
                });

                // Change the open attribute on tap
                $ionicGesture.on('tap', function (e) {
                    clicked = true;
                    if (attrs.optionButtons == 'show') {
                        attrs.$set('optionButtons', 'hidden');
                    } else {
                        attrs.$set('optionButtons', 'show');
                    }
                }, element);
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
        link: function ($scope, element, attrs) {
            var communOptions = {
                direction: 'vertical',
                centeredSlides: true,
                slidesPerView: 3,
                spaceBetween: 1,
                calculateHeight: true
            };

            $scope.selectedTime = { hours: "", min: "", isAm: "Am", todayTomorrow: "Today" };
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
            var min = Math.trunc(_TimeObject["min"] / 5) + 12;
            console.log(_TimeObject["min"] + " index min :" + min);
            slideOptionsM.initialSlide = min;
            slideOptionsM.onSlideChangeEnd = function (swiper) {
                console.log("Console min");
                console.log(swiper);
            }
            // init swiper AmPm options
            $scope.initialSlideAmPm = 0;
            if (_TimeObject["ampm"] === "pm") {
                $scope.initialSlideAmPm = 1;
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

            $scope.createEvent = function () {
                var hours = (swiperH.activeIndex + 1) % 12;

                if (!isAm(swiperAmPm.activeIndex)) {
                    hours = hours + 12;
                    $scope.selectedTime.isAm = "Pm";
                }

                if (swiperTodTom.activeIndex == 1) {
                    $scope.selectedTime.todayTomorrow = "Tomorrow";
                }

                $scope.selectedTime.hours = hours;
                var min = $scope.selectedTime.min = (swiperM.activeIndex % 12) * 5;

                console.log(" create event time " + $scope.selectedTime.hours + ":" + min);
                initTimeFromCalendar($scope.selectedTime);
                getState().go("LocalizeAt");
            }
        }
    }
}])