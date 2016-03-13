(function()
{
    angular
        .module("BreweryApp")
        .controller("BeerController", ['UserService', '$location',  BeerController]);

    function BeerController(UserService, $location) {
    }
})();