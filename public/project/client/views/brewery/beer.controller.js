(function()
{
    angular
        .module("BreweryApp")
        .controller("BeerController", ['brewDBService', '$location',  BeerController]);

    function BeerController(brewDBService, $location) {
        var vm = this;
        vm.selectBeer = selectBeer;
        vm.searchBeer = searchBeer;

        function init(){
            /*brewDBService.searchBeers({q: "allagash"})
                .then(function(beerList) {
                    //debugger
                    vm.beers = beerList.data;
                    $location.path('/beer');
                });*/
        }
        return init();

        function selectBeer(beer){
            $location.path('/beer/'+beer.id);
        }

        function searchBeer(name){
            brewDBService.searchBeers({q: name})
                .then(function(beerList) {
                    //debugger
                    vm.beers = beerList.data;
                    $location.path('/beer');
                });
        }
    }
})();