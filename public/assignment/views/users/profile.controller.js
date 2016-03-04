(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ['UserService', '$location',  ProfileController]);

    function ProfileController(UserService, $location)
    {

        var vm = this;

        vm.update = update;
        vm.callback = callback;

        function init(){
            vm.user = UserService.getCurrentUser();
        }
        return init();

        function callback(usr){
            if (usr) {
                UserService.setCurrentUser(usr);
                $location.path('/profile');
            }
        }

        function update(user){
            UserService.findUserByCredentials(vm.user.username, vm.user.password, function(findUser)
            {
                var updatedUser = {"_id":findUser._id, "firstName":user.firstName, "lastName":user.lastName,
                    "username":user.username,"password":user.password,"roles":findUser.roles};
                UserService.updateUser(updatedUser.id, updatedUser, callback);
            });
        }
    }
})();