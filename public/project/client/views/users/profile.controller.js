(function()
{
    angular
        .module("BreweryApp")
        .controller("ProfileController", ['UserService', '$location', '$rootScope', ProfileController]);

    function ProfileController(UserService, $location, $rootScope)
    {

        var vm = this;

        vm.update = update;

        function init(){
            vm.$location = $location;
            vm.user = $rootScope.currentUser;
            console.log(vm.user.roles.indexOf("admin"));
        }
        return init();

        function update(user){
            var newUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                emails: user.emails,
                phones: user.phones,
                favorites: user.favorites,
                adminBreweries: user.adminBreweries
            };
            UserService.updateUser(vm.user._id, newUser)
                .then(function() {
                    $location.path('/profile');
                });
        }
    }
})();