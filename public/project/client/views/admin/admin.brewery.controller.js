(function()
{
    angular
        .module("BreweryApp")
        .controller("AdminBreweryController", ['brewDBService', '$location', '$rootScope',  AdminBreweryController]);

    function AdminBreweryController(brewDBService, $location, $rootScope)
    {
        var vm = this;
        vm.updating = 1;
        vm.addBrewery = addBrewery;
        vm.updateBrewery = updateBrewery;
        vm.deleteBrewery = deleteBrewery;
        vm.selectBrewery = selectBrewery;
        vm.clickBrewery = clickBrewery;
        vm.updating = 1;

        function init(){
            console.log("init");
            vm.$location = $location;
            vm.user = $rootScope.currentUser;
            brewDBService.findAllBreweriesForUser(vm.user._id)
                .then(function(breweries) {
                    //debugger
                    console.log(breweries.data);
                    vm.breweries = breweries.data;
                    $location.path('/AdminBrewery');
                });
        }
        return init();

        function addBrewery(newBrewery){
            brewDBService.createBreweryForUser(vm.user._id, newBrewery);
            brewDBService.findAllBreweriesForUser(vm.user._id)
                .then(function(breweries) {
                    newBrewery.name = "";
                    newBrewery.details = "";
                    vm.breweries = breweries.data;
                    $location.path('/AdminBrewery');
                });
        }

        function updateBrewery(newBrewery){
            brewDBService.updateBreweryById(newBrewery._id, newBrewery);
            brewDBService.findAllBreweriesForUser(vm.user._id)
                .then(function(breweries) {
                    newBrewery.name = "";
                    newBrewery.details = "";
                    vm.updating = 1;
                    vm.breweries = breweries.data;
                    $location.path('/AdminBrewery');
                });
        }
        function deleteBrewery(brewery){
            brewDBService.deleteBreweryById(brewery._id)
                .then(function(breweries) {
                    vm.breweries = breweries.data;
                    $location.path('/AdminBrewery');
                });
        }

        function selectBrewery(index){
            vm.selectedBreweryIndex = index;
            vm.newBrewery = vm.breweries[index];
            vm.updating = 0;
        }

        function clickBrewery(brewery){
            $location.path('/AdminBrewery/'+brewery._id);
        }
    }
})();