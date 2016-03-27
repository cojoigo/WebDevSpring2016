(function()
{
    angular
        .module("BreweryApp")
        .controller("ProfileController", ['UserService', '$location',  ProfileController]);

    function ProfileController(UserService, $location)
    {

        var vm = this;

        vm.update = update;

        function init(){
            vm.user = UserService.getCurrentUser();
        }
        return init();

        function update(user){
            UserService.updateUser(vm.user._id, user)
                .then(function() {
                    $location.path('/profile');
                });
        }
    }
})();