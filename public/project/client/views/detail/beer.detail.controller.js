(function()
{
    angular
        .module("BreweryApp")
        .controller("BeerDetailController", ['brewDBService', '$location', '$routeParams', BeerDetailController]);

    function BeerDetailController(brewDBService, $location, $routeParams) {
        var vm = this;
        var beerId = $routeParams.id;

        function init(){
            brewDBService.getBeerById(beerId)
                .then(function(ret) {
                    vm.beer = ret.data;
                    $location.path('/beer/'+beerId);
                });
        }
        return init();
    }
})();