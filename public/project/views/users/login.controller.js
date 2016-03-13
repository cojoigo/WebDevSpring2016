(function()
{
    angular
        .module("BreweryApp")
        .controller("LoginController", ['UserService', '$location', LoginController]);

    function LoginController(UserService, $location)
    {
        var vm = this;

        vm.login = login;
        vm.callback = callback;

        function callback(usr){
            if (usr) {
                UserService.setCurrentUser(usr);
                $location.path('/profile');
            }
        }

        function login(user){
            if (!user){
                return;
            }
            UserService.findUserByCredentials(user.username, user.password, callback);
        }
    }
})();