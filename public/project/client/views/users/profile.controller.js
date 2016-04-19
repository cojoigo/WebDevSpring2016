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