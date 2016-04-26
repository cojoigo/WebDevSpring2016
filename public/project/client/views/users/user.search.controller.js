(function()
{
    angular
        .module("BreweryApp")
        .controller("UserSearchController", ['UserService', '$location',  UserSearchController]);

    function UserSearchController(UserService, $location) {
        var vm = this;
        vm.selectUser = selectUser;
        vm.searchUsers = searchUsers;

        function init(){
        }
        return init();

        function selectUser(user){
            $location.path('/users/'+user.username);
        }

        function searchUsers(username){
            UserService.findUserByUsername(username)
                .then(function(user) {
                    console.log(user.data);
                    //debugger
                    vm.foundUser = user.data;
                    $location.path('/users');
                });
        }
    }
})();