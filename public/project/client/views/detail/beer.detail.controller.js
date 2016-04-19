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
                    if ($rootScope.currentUser.favorites.indexOf(vm.beer.name) >= 0){
                        console.log($rootScope.currentUser.favorites.indexOf({name: vm.beer.name, id: vm.beer.id, type: "beer"}));
                        vm.favorited = 1;
                    }
                });
        }
        return init();

        function favorite(){
            console.log({name: vm.beer.name, id: vm.beer.id, type: "beer"});
            if ($rootScope.currentUser.favorites.indexOf({name: vm.beer.name, id: vm.beer.id, type: "beer"}) < 0){
                UserService.userLikes($rootScope.currentUser._id, {name: vm.beer.name, id: vm.beer.id, type: "beer"})
                    .then(function () {
                        $location.path('/beer/'+beerId);
                        vm.favorited = 1;
                    });
            }
            else {
                UserService.userLikes($rootScope.currentUser._id, {name: vm.beer.name, id: vm.beer.id, type: "beer"})
                    .then(function () {
                        $location.path('/beer/'+beerId);
                        vm.favorited = 0;
                    });
            }
        }
    }
})();