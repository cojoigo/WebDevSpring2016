(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", ['UserService', '$location', RegisterController]);

    function RegisterController(UserService, $location)
    {
        var vm = this;

        vm.callback = callback;
        vm.register = register;

        function callback(usr){
            if (usr) {
                UserService.setCurrentUser(usr);
                $location.path('/profile');
            }
        }

        function register(user){
            var newUser = {"firstname":"", "lastname":"", "username":user.username,
                "password":user.password, "roles":[]};
            UserService.createUser(newUser, callback);
        }
    }
})();