angular.module('directory.controllers', [])

//AppService => name of service in service.js
      .controller('RootCtrl', function ($scope, $state) {
          $state.go('userSpace');
      })
    .controller('SubscribeCtrl', function ($scope, $state, AppService) {
        // call createUser method of appService
        //   AppService.createUser(user);
        // Vérifier validité du password
        $scope.newUser = { FirstName: '', LastName: '', Email: '', PhoneNumber: '', UserName: '', Password: '' };

        $scope.createUser = function (user, subscribeForm) {
            if (subscribeForm.$valid) {
                AppService.createUser(user);
                AppService.login(user);
            } else {
                showAlert('Attention !', 'Un des champs saisi est inccorect.');
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
        $scope.credentials = { Email: '', Password: '' };
        $scope.connect = function (credentials) {
            if (authentification.$valid) {
                console.log(credentials);
                AppService.login(credentials);
                // $state.go('accueil');
            }
            else {
                showAlert('Attention !', 'Adresse mail ou mot de passe incorrects.');
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
            //   $scope.map = initMap("map");
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

    .controller('AccueilCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, NgMap) {
        $scope.Title = "JoinMe";
        $scope.Initposition = [40.74, -74.18];
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
        }
        $scope.mycallback = function (map) {
            $scope.myMap = map;
            $scope.$apply();
             $scope.getCurrentLocation();
        }
    })

	    .controller('InnerFriends', function ($scope, $state, AppService, $timeout) {
	        $scope.friends = [

	        ];

	        $scope.doRefresh = function () {
	            console.log('Refreshing!');
	            AppService.getFriends(1);
	            $timeout(function () {
	                //Stop the ion-refresher from spinning
	                $scope.$broadcast('scroll.refreshComplete');
	            }, 1000);
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
.controller('EventsCtrl', function ($scope, $state) {
})
