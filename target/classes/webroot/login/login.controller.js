(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http','$location', 'AuthenticationService', 'FlashService'];
    function LoginController($http, $location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;


            $http.post('/login-auth', { username: vm.username, password: vm.password,return_url: vm.return_url})
                .then(successCallback,errorCallback);


                   /* function (response) {
                    if (response.data.success) {
                    //console.log(response.data.success);
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                }
                }).catch(function (response){
                    console.log("hello");
                    console.log(response.data.success);
                });
            AuthenticationService.Login(vm.username, vm.password,vm.return_url, function (response) {
               console.log(response.data.success);
                if (response.data.success) {
                    //console.log(response.data.success);
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error("error");
                    vm.dataLoading = false;
                   
                    
                }
            });*/
        };

        function successCallback(response) {
                
                // this callback will be called asynchronously
                // when the response is available
                
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');
        };

        function errorCallback(response) {
                
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                FlashService.Error(response.data.message);
                vm.dataLoading = false;
            };

    }

})();
