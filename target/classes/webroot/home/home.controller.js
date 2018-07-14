(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$http','$timeout'];
    function HomeController(UserService, $rootScope, $http, $timeout) {
        var vm = this;

        var rethink = [];
        vm.user = {"firstName": $rootScope.globals.currentUser.username
        };
        
        
        var eb = new EventBus(window.location.protocol + "//" + window.location.host + "/eventbus");


        eb.onopen = function () {
        eb.registerHandler("page.saved", function (error, message) { // <2>
           
            //console.log("True");
             //vm.pageModified = true;
            if (message.body ) { // <3>
                //vm.pageModified = true;
                console.log(message.body);
             $rootScope.$apply(function () { // <6>
                 // <7>
                
                $rootScope.result = message.body.result;

                $rootScope.pageModified = true;

                load();
                $timeout(function() {
                   $rootScope.pageModified = false; 
                }, 5000);
                //console.log("True");
              });
            }
          });
        };


        function handleSuccess(res) {
            $rootScope.rethink = res.data;
            console.log(res.data);
             $rootScope.pageModified = true;
                $timeout(function() {
                   $rootScope.pageModified = false; 
                }, 5000);
                //console.log("True");
              
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        function load() {

            return $http.get('/tv_shows/').then(handleSuccess, handleError('Error getting all users'));    
            // body...
        }
        load();
            /*vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }*/
    }

})();