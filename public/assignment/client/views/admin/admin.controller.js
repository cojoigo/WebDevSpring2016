(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", ['UserService', '$location',  AdminController]);

    function AdminController(UserService, $location)
    {
        var vm = this;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updating = 1;

        function init(){
            UserService.findAllUsers()
                .then(function(userList) {
                    vm.users = userList.data;
                    $location.path('/admin');
                });
        }
        init();


        function addUser(newUser){
            UserService.createUser(newUser);
            UserService.findAllUsers()
                .then(function(userList) {
                    vm.users = userList.data;
                    newUser.username = "";
                    newUser.password = "";
                    newUser.firstName = "";
                    newUser.lastName = "";
                    newUser.roles = "";
                    $location.path('/admin');
                });
        }

        function updateUser(newUser){
            UserService.updateUser(newUser._id,newUser);
            UserService.findAllUsers()
                .then(function(userList) {
                    vm.users = userList.data;
                    newUser.username = "";
                    newUser.password = "";
                    newUser.firstName = "";
                    newUser.lastName = "";
                    newUser.roles = "";
                    vm.updating = 1;
                    $location.path('/admin');
                });
        }

        function deleteUser(user){
            UserService.deleteUserById(user._id)
                .then(function(userList) {
                    vm.users = userList.data;
                    $location.path('/admin');
                });
        }

        function selectUser(index){
            vm.selectedUserIndex = index;
            vm.newUser = vm.users[index];
            vm.updating = 0;
        }
    }
})();