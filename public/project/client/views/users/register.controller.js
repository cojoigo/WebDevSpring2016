(function()
{
    angular
        .module("BreweryApp")
        .controller("RegisterController", ['UserService', '$location', '$rootScope', RegisterController]);

    function RegisterController(UserService, $location, $rootScope)
    {
        var vm = this;
        vm.register = register;

        function register(user){
            if(user.password != user.verifypassword || user.password == null)
            {
                vm.error = "Your passwords don't match";
            } else {
                UserService.register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user != null) {
                                $rootScope.currentUser = user;
                                $location.url("/profile");
                            }
                        },
                        function (err) {
                            vm.error = err;
                        }
                    );
            }
        }
    }
})();