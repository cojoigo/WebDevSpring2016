(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ['UserService', '$location', '$rootScope', ProfileController]);

    function ProfileController(UserService, $location, $rootScope)
    {

        var vm = this;

        vm.update = update;

        function init(){
            vm.user = $rootScope.currentUser;
        }
        return init();

        function update(user){
            user.emails = [user.emails];
            UserService.updateUser(vm.user._id, user)
                .then(function() {
                    $location.path('/profile');
                });
        }
    }
})();