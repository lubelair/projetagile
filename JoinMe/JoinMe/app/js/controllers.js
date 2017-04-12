angular.module('directory.controllers', [])

//AppService => name of service in service.js
    .controller('SubscribeCtrl', function ($scope, $state,$ionicPopup, AppService) {
        // call createUser method of appService
        //   AppService.createUser(user);
        // V�rifier validit� du password
        $scope.newUser = { FirstName: '', LastName: '', Email: '', PhoneNumber: '', UserName: '', Password: '' };



        $scope.createUser = function (user, subscribeForm) {
            if (subscribeForm.$valid) {
                AppService.createUser(user);
            } else {
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'form not valid'
                });
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

    .controller('AuthentificationCtrl', function ($scope, $state, AppService) {
        $scope.user = { FirstName: '', LastName: '', Email: '', PhoneNumber: '', UserName: '', Password: '' };
        $scope.connect = function (user) {
            console.log(user);
            AppService.login(user);
            // $state.go('accueil');
        }
        $scope.inscription = function () {
            //change state to inscription state
            $state.go('inscription');
            // AppService.getUsers();
        }
        $scope.forgetPassword = function () {
            //$state.go('forgetPassword');
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
