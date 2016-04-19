(function()
{
    angular
        .module("BreweryApp")
        .controller("FavoritesController", ['UserService', '$location', '$rootScope', FavoritesController]);

    function FavoritesController(UserService, $location, $rootScope)
    {
        var vm = this;
        vm.selectItem = selectItem;

        function init(){
            vm.$location = $location;
            vm.user = $rootScope.currentUser;
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