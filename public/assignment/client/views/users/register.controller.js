(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", ['UserService', '$location', RegisterController]);

    function RegisterController(UserService, $location)
    {
        var vm = this;
        vm.register = register;

        function register(user){
            var newUser = {"firstname":"", "lastname":"", "username":user.username,
                "password":user.password, "roles":[], "emails":[user.email]};
            UserService.createUser(newUser)
                .then(function() {
                    $location.path('/profile');
                })
        }
    }
})();