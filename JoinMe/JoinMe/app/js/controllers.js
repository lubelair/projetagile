angular.module('directory.controllers', [])

//AppService => name of service in service.js
      .controller('RootCtrl', function ($scope, $state, $cookieStore) {
          if ($cookieStore.get('user') != null) {
              $state.go('userSpace');
          }
          else {
              $state.go('authentification');
          }
      })

    .controller('SubscribeCtrl', function ($scope, $state, AppService, $cookieStore) {
        $scope.Title = "Inscription";
        $scope.showSettings = false;
        $scope.showBack = true;

        $scope.newUser = { FirstName: '', LastName: '', Email: '', PhoneNumber: '', UserName: '', Password: '' };

        $scope.createUser = function (user, subscribeForm) {
            if (subscribeForm.$valid) {
                AppService.createUser(user);
            }
            else {
                showAlert('Attention !', 'Un des champs saisis est inccorect.');
            }
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

    .controller('AuthentificationCtrl', function ($scope, $state, $ionicPopup, AppService) {
        $scope.Title = "Authentification";
        $scope.showSettings = false;
        $scope.showBack = false;

        $scope.credentials = { Email: '', Password: '' };

        $scope.connect = function (credentials, authentificationForm) {
            if (authentificationForm.$valid) {
                AppService.login(credentials);
            }

            else {
                showAlert('Attention !', 'Un des champs n\'a pas ou est mal saisi.');
            }
        }

        $scope.inscription = function () {
            //change state to inscription state
            $state.go('inscription');
            // AppService.getUsers();
        }

        $scope.forgetPassword = function () {
            $scope.data = {};
            $ionicPopup.show({
                template: '<input type="email" ng-model="data.mail">',
                title: '<p>Recuperation du mot de passe</p>',
                subTitle: '<p>Quelle est votre adresse mail ?</p>',
                scope: $scope,
                buttons: [
                  { text: 'Annuler' },
                  {
                      text: '<b>Envoyer</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                          if (!$scope.data.mail) {
                              e.preventDefault();
                          }
                          else {
                              return console.log($scope.data.mail);
                              //AppService.sendPwd($scope.data.mail);
                          }
                      }
                  }
                ]
            });
        }
    })

    .controller('SettingsCtrl', function ($scope, $state, AppService, $ionicActionSheet) {
        $scope.Title = "Parametres";
        $scope.showSettings = false;
        $scope.showBack = true;
        $scope.regex = '[0-9]{10}';
        $scope.user = AppService.getUser();

        $scope.saveSettings = function (user, myForm) {
            console.log(myForm.$valid);
            AppService.saveSettings(user);
        }
        $scope.deleteAccount = function (user) {
            console.log("suppression du compte");
        }

        $scope.selectPhoto = function (user) {
            //AppService.selectPhoto($ionicActionSheet);
            var showActionSheet = $ionicActionSheet.show({
                buttons: [
                   { text: 'Modifier la photo' }
                ],

                destructiveText: 'Supprimer la photo',
                cancelText: 'Fermer',

                cancel: function () {
                },

                buttonClicked: function (index) {
                    if (index === 0) {
                        // Modification de la photo
                        var edit_save = document.getElementById("photoUser");
                        edit_save.src = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQfbzUlHzE133HxXyjo2zHB86i33k1F4tpbu18QSR8fNS_Kc-y4";
                        cancel;
                    }
                },

                destructiveButtonClicked: function () {
                    // Suppression de la photo
                }
            });
        }
    })

    .controller('UserSpaceCtrl', function ($scope, $state) {
        $scope.showSettings = true;
        $scope.showBack = false;

        $scope.options = {
            loop: false,
            effect: 'slide',
            speed: 500,
            pagination: false,
            initialSlide: 1
        }

        $scope.onSlideChanged = function (index) {
        }
        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            // data.slider is the instance of Swiper
            console.log('Slide init');
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });
    })

    .controller('AccueilCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
        $scope.Title = "JoinMe";        var communOptions = {
            direction: 'vertical',
            centeredSlides: true,
            slidesPerView: 3,
            //  spaceBetween: 5,
            //   autoHeight: true,
            calculateHeight: false
        };
 // init swiper hours options
       var  slideOptionsH = angular.copy(communOptions);
       slideOptionsH.loop = true;
       slideOptionsH.initialSlide = _TimeObject["hours"]-1;
        slideOptionsH.onSlideChangeEnd=function (swiper) {
            console.log("Console hours");
            console.log(swiper);








        }        
        // init swiper min options
        var slideOptionsM = angular.copy(communOptions);
        slideOptionsM.loop = true;
        var min = (((_TimeObject["min"]) % 12) - 5);
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
            console.log("Console tod");
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
        
        $scope.Title = "JoinMe";        $scope.Initposition = [40.74, -74.18];
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0
        };

        $scope.getCurrentLocation = function () {
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                var myLatlng = new google.maps.LatLng(lat, long);
                $scope.myMap.setCenter(myLatlng);
                $scope.myPosition = myLatlng;
            }, function (err) {
                $ionicLoading.hide();
                alert("pleaz activate your GPS");
            });
            $scope.$apply();
        };
        $scope.mycallback = function (map) {
            $scope.myMap = map;
            $scope.$apply();
            $scope.getCurrentLocation();
        }
    })

 .controller('EventsCtrl', function ($scope, $state, AppService) {
     $scope.Title = "Evenements"
     $scope.events = [
              { nom: 'tata 1X ' },
              { nom: 'tata 2X ' },
              { nom: 'tata 3X ' },
              { nom: 'tata 4X ' }
     ];
     // $scope.patern = '';
     $scope.search = function () {
         //  console.log(val);
         console.log(patern);
         //  $scope.query = val;
         $scope.$apply();
     };
 })

 .controller('FriendsCtrl', function ($scope, $state, AppService) {
     $scope.Title = "Amis";
     $scope.friends = [
              { nom: 'tata 1 ', prenom: 'toto 1' },
              { nom: 'tata 2 ', prenom: 'toto 2' },
              { nom: 'tata 3 ', prenom: 'toto 3' },
              { nom: 'tata 4 ', prenom: 'toto 4' }
     ];

     // $scope.patern = '';
     $scope.search = function () {
         //  console.log(val);
         console.log(patern);
         //  $scope.query = val;
         $scope.$apply();
     };
 })

	    .controller('InnerFriends', function ($scope, $state, AppService, $timeout) {
	        $scope.showSettings = true;
	        $scope.showBack = true;
	        $scope.doRefresh = function () {
	            console.log('Refreshing!');
	            AppService.getFriends(1);
	            AppService.getInvitation(1);
	            $timeout(function () {
	                //Stop the ion-refresher from spinning
	                $scope.$broadcast('scroll.refreshComplete');
	            }, 100);
	        };
	    })

 .controller('MapCtrl', function ($scope, $state, NgMap) {
     $scope.message = 'You can not hide. :)';
     var vm = this;
     vm.message = 'You can not hide. :)';
     NgMap.getMap("map").then(function (map) {
         console.log('get map');

         vm.map = map;
     });
     $scope.callbackFunc = function (param) {
         console.log('I know where ' + param + ' are. ' + vm.message);
         console.log('You are at' + vm.map.getCenter());
     };
 })