angular.module('directory.controllers', [])

//AppService => nom du service dans service.js

      .controller('RootCtrl', function ($scope, $state, $cookieStore) {
          if ($cookieStore.get('user') != null) {
              $state.go('userSpace');
          }
          else {
              $state.go('authentification');
          }
      })

    .controller('SubscribeCtrl', function ($scope, $state, AppService, $cookieStore) {
        // Définition du titre et des boutons visibles dans le header
        // Applicable à tout contrôleur lié directement à une vue
        $scope.Title = "Inscription";
        $scope.showSettings = false;
        $scope.showBack = true;

        $scope.newUser = __User;

        $scope.createUser = function (user, subscribeForm) {
            if (subscribeForm.$valid) {
                AppService.createUser(user);
            }
            else {
                showAlert('Attention !', 'Un des champs saisis est incorrect.');
            }
        }

        $scope.checkPwd = function (subscribeForm) {
            subscribeForm.confirmpwd.$valid = false;
            // Comparaison des deux champs de mot de passe pour un affichage dynamique du CSS
            if (document.getElementById("confirmpwd").value != document.getElementById("password").value) {
                subscribeForm.confirmpwd.$valid = false;
            }
        }

        $scope.authentification = function () {
            $state.go('authentification');
        }
    })

    .controller('AuthentificationCtrl', function ($scope, $state, $ionicPopup, AppService, Scopes) {
        Scopes.store('Authentification', $scope);
        $scope.appService = AppService;
        $scope.Title = "Authentification";
        $scope.showSettings = false;
        $scope.showBack = false;

        $scope.credentials = { Email: '', Password: '' };

        $scope.connect = function (credentials, authentificationForm) {
            if (authentificationForm.$valid) {
                AppService.login(credentials);
            }

            else {
                showAlert('Attention !', 'Un des champs n\'a pas été ou est mal saisi.');
            }
        }

        $scope.inscription = function () {
            $state.go('inscription');
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

    .controller('SettingsCtrl', function ($scope, $state, AppService, $ionicActionSheet, $cookieStore, Scopes) {
        Scopes.store('Settings', $scope);
        $scope.Title = "Parametres";
        $scope.showSettings = false;
        $scope.showBack = true;
        //Regex pour vérifier la cohérence du numéro de téléphone
        $scope.regex = '[0-9]{10}';

        $scope.user = $cookieStore.get('user');

        // Récupération de la vue et des données de session
        $scope.$on('$ionicView.enter', function () {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.user = $cookieStore.get('user');
                });
            }, 10);
        });

        //Procédure exécutée au clic sur le bouton enregistrer de la page Paramètres
        $scope.saveSettings = function () {
            if (!$scope.user.IsActive) {
                showConfirm("Attention !", "Vous êtes sur le point de désactiver votre compte, voulez-vous continuer ?", "Oui", "Non", $scope.disableAccount);
            } else {
                AppService.updateUser($scope.user);
            }
        }

        //Procédure exécutée si l'utilisateur souhaite désactiver son compte
        $scope.disableAccount = function () {
            AppService.updateUser($scope.user);
        }

        $scope.clicDeleteAccount = function () {
            console.log("Delete account");
            showConfirm("Attention !", "Vous êtes sur le point de supprimer votre compte, voulez-vous continuer ?", "Oui", "Non", $scope.deleteAccount);
        }

        $scope.deleteAccount = function () {
            AppService.deleteUser();
        }
        $scope.disconnect = function () {
            $cookieStore.remove('user');
            $state.go('authentification');
        }

        $scope.selectPhoto = function (user) {
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

    .controller('UserSpaceCtrl', function ($scope, $state, Scopes, AppService) {
        Scopes.store('UserSpace', $scope);
        $scope.showSettings = true;
        $scope.showBack = false;

        // Configuration des effets de swipe
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
            // data.slider = instance de Swiper
            console.log('Slide init');
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            // Configuration des différents sliders : l'index de base est numéroté 0
            console.log('Slide change is end' + data.slider.activeIndex);
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
            if (data.slider.activeIndex == 0) {
                AppService.getFriends();
                AppService.getInvitations();
                AppService.getUsers();
            }
            if (data.slider.activeIndex == 2) {
                AppService.getEventsrecived();
                AppService.getEventssend();
            }
        });

        $scope.goFriends = function () {
            $scope.slider.slideTo(0);
        }
        $scope.goAccueil = function () {
            $scope.slider.slideTo(1);
        }
        $scope.goEvents = function () {
            $scope.slider.slideTo(2);
        }

        console.log(Scopes.get('UserSpace'));
    })

    .controller('AccueilCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading) {
        $scope.Title = "JoinMe";
        $scope.Initposition = [40.74, -74.18];

        // Initialisation des options map
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0
        };

        $scope.getCurrentLocation = function () {
            // Récupération de la position courante via cordova
            // Si la géolocalication n'est pas activée, on le notifie à l'utilisateur
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                var myLatlng = new google.maps.LatLng(lat, long);
                $scope.myMap.setCenter(myLatlng);
                $scope.myPosition = myLatlng;
                initCurrentPosition(myLatlng);
            }, function (err) {
                $ionicLoading.hide();
                alert("Veuillez activer votre GPS");
            });
            $scope.$apply();
        };

        // Appel de la map
        $scope.mycallback = function (map) {
            $scope.myMap = map;
            $scope.$apply();
            $scope.getCurrentLocation();
        }
    })

 .controller('EventsCtrl', function ($scope, $state, AppService, $timeout, Scopes) {
     Scopes.store("EventsCtrl", $scope);
     $scope.appService = AppService;
     $scope.Title = "Evenements"
     $scope.eventssend = [];
     $scope.eventsrecived = [];

     $scope.refreshEventsend = function () {
         $scope.eventssend = [];
         AppService.getEventssend();
         $timeout(function () {
             //Stoppe le refresh
             $scope.$broadcast('scroll.refreshComplete');
         }, 100);
     }
     $scope.refreshEventrecived = function () {
         $scope.eventsrecived = [];
         AppService.getEventsrecived();
         $timeout(function () {
             $scope.$broadcast('scroll.refreshComplete');
         }, 100);
     }

     $scope.search = function () {
         console.log(patern);
         $scope.$apply();
     };
 })

 .controller('FriendsCtrl', function ($scope, $state, AppService, $timeout, Scopes) {
     Scopes.store('FriendsCtrl', $scope);
     $scope.Title = "Amis";
     $scope.showAddBtn = false;
     $scope.showSwipBtn = true;
     $scope.showSwipBtnAccept = true;
     $scope.showSwipBtnAdd = true;
     $scope.friends = [];
     $scope.friendsInvitation = [];
     /*
     $scope.getFriends = function () {
         getListFriends();
     }
     $scope.getWhoInvitedMe = function () {
     }
     */
     $scope.refreshFriend = function () {
         $scope.friends = [];
         AppService.getFriends();
         $timeout(function () {
             //Stop the ion-refresher from spinning
             $scope.$broadcast('scroll.refreshComplete');
         }, 100);
     }
     $scope.refreshInvitation = function () {
         $scope.friendsInvitation = [];
         AppService.getInvitations();
         $timeout(function () {
             //Stop the ion-refresher from spinning
             $scope.$broadcast('scroll.refreshComplete');
         }, 100);
     }

     $scope.refreshUsers = function () {
         console.log("OK");
         $scope.userResearch = [];
         AppService.getUsers();
         $timeout(function () {
             //Stop the ion-refresher from spinning
             $scope.$broadcast('scroll.refreshComplete');
         }, 100)
     }
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
 })

 .controller('LocalizeAtCtrl', function ($scope, $state, NgMap, Scopes) {
     $scope.Title = "Paramètres de l'événement";
     $scope.types = "['geocode']";
     $scope.Initposition = getCurrentPosition();
     $scope.showBack = true;
     $scope.eventTime = getTimeFromCalendar();
     _EventOptions = { EventDateTime: createEventTime(), Location: "", NomEvent: "", InvitedFriends: [] };
     $scope.event = _EventOptions;
     $scope.placeChanged = function () {
         $scope.place = this.getPlace();
         $scope.map.setCenter($scope.place.geometry.location);
         $scope.event.Location = $scope.place.formatted_address;
         $scope.showMarker = 'true';
         $scope.map.showInfoWindow('adresse', 'marker');
     }

     $scope.selectFriends = function (event) {
         _EventOptions = event;
         //  _EventOptions.status ="toto";
         $state.go("EventFriends");
     }
     $scope.mycallback = function (map) {
         $scope.showMarker = 'false';
         $scope.map = map;
     };
 })
.controller('EventFriendsCtrl', function ($scope, $state, $timeout, Scopes, AppService, $cookieStore, $ionicLoading) {
    Scopes.store('EventFriendsCtrl', $scope);
    $scope.showBack = true;
    $scope.showAddBtn = true;
    $scope.Title = "Inviter des amis";
    $scope.ionicLoading = $ionicLoading;
    // Setup the loader
    $scope.ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    $scope.eventfriends = [];
    if (getScopes('FriendsCtrl') != null) {
        if (getScopes('FriendsCtrl').friends.length > 0) {
            $scope.eventfriends = getScopes('FriendsCtrl').friends;
        } else {
            AppService.getFriends();
        }
    }
    $scope.refreshInvitation = function () {
        $scope.eventfriends = [];
        AppService.getFriends();
    }
    //$scope.friends = [{ id: 3, FirstName: "toto", LastName: "tata" }];
    $scope.createEvent = function () {
        _EventOptions.userId = $cookieStore.get('user').Id;
        AppService.CreateEvent(_EventOptions);
    }
})