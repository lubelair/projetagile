angular.module('directory.controllers', [])

//AppService => name of service in service.js
    .controller('SubscribeCtrl', function ($scope, $state, AppService) {
        // call createUser method of appService
        //   AppService.createUser(user);
        // Vérifier validité du password
        $scope.newUser = { FirstName: '', LastName: '', Email: '', PhoneNumber: '', UserName: '', Password: '' };

        $scope.createUser = function (user, subscribeForm) {
            if (subscribeForm.$valid) {
                AppService.createUser(user);
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
        $scope.user = { FirstName: '', LastName: '', Email: '', PhoneNumber: '', UserName: '', Password: '' };
        $scope.connect = function (user) {
            if (authentification.$valid) {
                console.log(user);
                AppService.login(user);
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

    .controller('UserSpaceCtrl', function ($scope, $state, Scopes) {
        /*    $ionicSlideBoxDelegate.enableSlide(false);

            $scope.disableSwipe = function () { $ionicSlideBoxDelegate.enableSlide(false); };
            $scope.myActiveSlide = 2;
            $scope.onSlideChanged = function (index) {
            }*/
    })

    .controller('AccueilCtrl', function ($scope, $state, AppService) {
    })

	    .controller('InnerFriends', function ($scope, $state, AppService) {
	        $scope.friends = [
                { nom: 'Zayd', prenom: 'BEN GARA' },
                { nom: 'Lucas', prenom: 'BELAIR' },
                { nom: 'Sarah', prenom: 'ANTIGNY' },
                { nom: 'Amine', prenom: 'ALILOU' },
                { nom: 'Ismail', prenom: 'BAIH' },
                { nom: 'Joel', prenom: 'AKON' }
	        ];
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
;