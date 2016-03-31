(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", ['UserService', '$location', LoginController]);

    function LoginController(UserService, $location)
    {
        var vm = this;

        vm.login = login;

        function login(user){
            if (!user){
                return;
            }
            UserService.findUserByCredentials(user.username, user.password)
                .then(function(){
                    if (UserService.getCurrentUser()) {
                        $location.path('/profile');
                    }
                });
        }
    }
})();