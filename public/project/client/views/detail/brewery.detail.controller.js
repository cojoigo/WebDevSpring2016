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
                    if (!$rootScope.currentUser) return;
                    for (var i in $rootScope.currentUser.favorites) {
                        if ($rootScope.currentUser.favorites[i].name == vm.brewery.name) {
                            vm.favorited = 1;
                        }
                    }
                });
        }
        return init();

        function favorite(){
            if (!vm.favorited){
                UserService.userLikes($rootScope.currentUser._id, {name: vm.brewery.name, id: vm.brewery.id, type: "brewery"})
                    .then(function () {
                        $location.path('/brewery/'+breweryId);
                        vm.favorited = 1;
                    });
            }
            else {
                UserService.userDislikes($rootScope.currentUser._id, {name: vm.brewery.name, id: vm.brewery.id, type: "brewery"})
                    .then(function () {
                        $location.path('/brewery/'+breweryId);
                        vm.favorited = 0;
                    });
            }
        }
    }
})();