(function()
{
    angular
        .module("BreweryApp")
        .controller("HomeController", ['brewDBService', '$location',  HomeController]);

    function HomeController(brewDBService, $location) {
        var vm = this;
        vm.searchAll = searchAll;
        vm.select = select;

        function searchAll(name){
            brewDBService.searchAll({q: name})
                .then(function(ret) {
                    vm.found = ret.data;
                    $location.path('/home');
                });
        }

        function select(item){
            if (item.type == 'beer'){
                $location.path('/beer/'+item.id);
            }
            else if (item.type == 'brewery') {
                $location.path('/brewery/'+item.id);
            }
        }
    }
})();