(function()
{
    angular
        .module("FormBuilderApp")
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
            user.emails = [user.emails];
            UserService.updateUser(vm.user._id, user)
                .then(function() {
                    $location.path('/profile');
                });
        }
    }
})();