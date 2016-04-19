(function()
{
    angular
        .module("BreweryApp")
        .controller("BreweryController", ['brewDBService', '$location', BreweryController]);

    function BreweryController(brewDBService, $location) {
        var vm = this;
        vm.selectBrewery = selectBrewery;
        vm.searchBrewery = searchBrewery;

        function init(){
        }
        return init();

        function selectBrewery(brewery){
            $location.path('/brewery/'+brewery.id);
        }

        function searchBrewery(name){
            vm.breweries = [];
            brewDBService.searchAll({q: name})
                .then(function(breweryList) {
                    for (var i  in breweryList.data){
                        if (breweryList.data[i].type == 'brewery'){
                            vm.breweries.push(breweryList.data[i]);
                        }
                    }
                });
            $location.path('/brewery');
        }
    }
})();