(function()
{
    angular
        .module("BreweryApp")
        .controller("BeerDetailController", ['brewDBService', '$location', '$routeParams', BeerDetailController]);

    function BeerDetailController(brewDBService, $location, $routeParams) {
        var vm = this;
        var beerId = $routeParams.id;
        vm.favorite = favorite;

        function init(){
            brewDBService.getBeerById(beerId)
                .then(function(ret) {
                    vm.beer = ret.data;
                    $location.path('/beer/'+beerId);
                });
        }
        return init();

        function favorite(){
            vm.favorited = !vm.favorited;
        }
    }
})();