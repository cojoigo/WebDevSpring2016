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
                    if ($rootScope.currentUser.favoriteBeers.indexOf(vm.beer.name) >= 0){
                        console.log($rootScope.currentUser.favoriteBeers.indexOf(vm.beer.name));
                        vm.favorited = 1;
                    }
                });
        }
        return init();

        function favorite(){
            if ($rootScope.currentUser.favoriteBeers.indexOf(vm.beer.name) < 0){
                $rootScope.currentUser.favoriteBeers.push(vm.beer.name);
                console.log($rootScope.currentUser.favoriteBeers);
                UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser)
                    .then(function () {
                        $location.path('/beer/'+beerId);
                        vm.favorited = 1;
                    });
            }
            else {
                $rootScope.currentUser.favoriteBeers.splice(vm.favorited,1);
                UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser)
                    .then(function () {
                        $location.path('/beer/'+beerId);
                        vm.favorited = 0;
                    });
            }
        }
    }
})();