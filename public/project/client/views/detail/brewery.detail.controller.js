(function()
{
    angular
        .module("BreweryApp")
        .controller("BreweryDetailController", ['brewDBService', '$location', '$routeParams', BreweryDetailController]);

    function BreweryDetailController(brewDBService, $location, $routeParams) {
        var vm = this;
        var breweryId = $routeParams.id;

        function init(){
            brewDBService.getBreweryById(breweryId)
                .then(function(ret) {
                    vm.brewery = ret.data;
                    $location.path('/brewery/'+breweryId);
                });
        }
        return init();
    }
})();