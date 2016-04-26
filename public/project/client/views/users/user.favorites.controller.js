(function()
{
    angular
        .module("BreweryApp")
        .controller("UserFavoritesController", ['UserService', '$location', '$routeParams', UserFavoritesController]);

    function UserFavoritesController(UserService, $location, $routeParams)
    {
        var vm = this;
        vm.selectItem = selectItem;
        var username = $routeParams.username;

        function init(){
            vm.$location = $location;
            UserService.findUserByUsername(username)
                .then(function(user) {
                    vm.user = user.data;
                    $location.path('/users/'+username);
                });
        }
        return init();

        function selectItem(item){
            if (item.type == "beer") {
                $location.path('/beer/' + item.id);
            } else {
                $location.path('/brewery/' + item.id);
            }
        }
    }
})();