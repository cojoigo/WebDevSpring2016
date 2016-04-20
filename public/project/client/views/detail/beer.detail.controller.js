(function()
{
    angular
        .module("BreweryApp")
        .controller("BeerDetailController", ['brewDBService', 'UserService', '$location', '$routeParams', '$rootScope', BeerDetailController]);

    function BeerDetailController(brewDBService, UserService, $location, $routeParams, $rootScope) {
        var vm = this;
        var beerId = $routeParams.id;
        vm.favorite = favorite;
        vm.favorited = 0;

        function init(){
            brewDBService.getBeerById(beerId)
                .then(function(ret) {
                    vm.beer = ret.data;
                    $location.path('/beer/'+beerId);
                    if (!$rootScope.currentUser) return;
                    for (var i in $rootScope.currentUser.favorites) {
                        if ($rootScope.currentUser.favorites[i].name == vm.beer.name) {
                            vm.favorited = 1;
                        }
                    }
                });
        }
        return init();

        function favorite(){
            if (!vm.favorited){
                UserService.userLikes($rootScope.currentUser._id, {name: vm.beer.name, id: vm.beer.id, type: "beer"})
                    .then(function () {
                        $location.path('/beer/'+beerId);
                        vm.favorited = 1;
                    });
            }
            else {
                UserService.userDislikes($rootScope.currentUser._id, {name: vm.beer.name, id: vm.beer.id, type: "beer"})
                    .then(function () {
                        $location.path('/beer/'+beerId);
                        vm.favorited = 0;
                    });
            }
        }
    }
})();