(function()
{
    angular
        .module("BreweryApp")
        .controller("AdminBreweryDetailController", ['brewDBService', '$routeParams', '$location',  AdminBreweryDetailController]);

    function AdminBreweryDetailController(brewDBService, $routeParams, $location)
    {
        var vm = this;
        var breweryId = $routeParams.breweryId;

        function init(){
        }
        init();
    }
})();