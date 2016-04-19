(function()
{
    angular
        .module("BreweryApp")
        .controller("BreweryDetailController", ['brewDBService', 'UserService', '$location', '$routeParams', '$rootScope',BreweryDetailController]);

    function BreweryDetailController(brewDBService, UserService, $location, $routeParams, $rootScope) {
        var vm = this;
        var breweryId = $routeParams.id;
        vm.favorite = favorite;
        vm.favorited = 0;

        function init(){
            brewDBService.getBreweryById(breweryId)
                .then(function(ret) {
                    vm.brewery = ret.data;
                    $location.path('/brewery/'+breweryId);
                    if ($rootScope.currentUser.favoriteBreweries.indexOf(vm.brewery.name) >= 0){
                        console.log($rootScope.currentUser.favoriteBreweries.indexOf(vm.brewery.name));
                        vm.favorited = 1;
                    }
                });
        }
        return init();

        function favorite(){
            if ($rootScope.currentUser.favoriteBreweries.indexOf(vm.brewery.name) < 0){
                $rootScope.currentUser.favoriteBreweries.push(vm.brewery.name);
                UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser)
                    .then(function () {
                        $location.path('/brewery/'+breweryId);
                        vm.favorited = 1;
                    });
            }
            else {
                $rootScope.currentUser.favoriteBreweries.splice(vm.favorited,1);
                UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser)
                    .then(function () {
                        $location.path('/brewery/'+breweryId);
                        vm.favorited = 0;
                    });
            }
        }
    }
})();