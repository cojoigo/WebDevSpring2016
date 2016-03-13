(function()
{
    angular
        .module("BreweryApp")
        .controller("BreweryController", ['UserService', '$location',  BreweryController]);

    function BreweryController(UserService, $location) {
    }
})();