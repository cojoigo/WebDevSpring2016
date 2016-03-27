(function()
{
    angular
        .module("BreweryApp")
        .controller("BreweryController", ['brewDBService', '$location',  '$routeParams', BreweryController]);

    function BreweryController(brewDBService, $location, $routeParams) {
        var vm = this;
        //var name = $routeParams.name;
        vm.selectBrewery = selectBrewery;
        vm.searchBrewery = searchBrewery

        function init(){
            vm.breweries =[];
            /*
            brewDBService.searchBreweries({q: name})
                .then(function (newList) {
                    vm.breweries = newList.data;
                    $location.path('/brewery/'+name);
            });*/

            var testList = ["Rising Tide Brewing Company", "Allagash Brewing Company", "Bissell Brothers",
                "Foundation Brewing Company", "Sea Dog Brewing Company", "Urban Farm Fermentory",
                "Gritty McDuff's Brewing Company", "Maine Beer Company", "SoMe Brewing Company",
                "Sebago Brewing Company", "Austin Street Brewery", "Bunker Brewing Company",
                "Baxter Brewing Company", "Shipyard Brewing"];
            for (var i in testList) {
                brewDBService.getBreweryByParams({name: testList[i]})
                    .then(function (brewery) {
                        vm.breweries.push(brewery.data[0]);
                    });
                $location.path('/brewery');
            }
        }
        return init();

        function selectBrewery(brewery){
            $location.path('/brewery/'+brewery.id);
        }

        function searchBrewery(name){
       /*     vm.breweries = [];
            brewDBService.searchBreweries({q: name})
                .then(function(breweryList) {
                    debugger
                    if (breweryList.type == 'brewery'){
                        vm.breweries.push(breweryList.data[0]);
                    }
                });
            $location.path('/brewery');*/
        }
    }
})();