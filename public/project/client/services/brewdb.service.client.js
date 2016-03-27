(function(){
    angular
        .module("BreweryApp")
        .factory("brewDBService", brewDBService);

    function brewDBService($http) {
        var api = {
            searchBeers : searchBeers,
            searchBreweries : searchBreweries,
            searchAll : searchAll,
            getAllCategories : getAllCategories,
            getCategoryById : getCategoryById,
           // getBreweriesByLocation : getBreweriesByLocation,
            getBreweryByParams : getBreweryByParams,
            getBeerById : getBeerById,
            getBreweryById : getBreweryById
        };
        return api;

        function searchBeers(params) {
            return $http.post("/api/project/search/beer",params);
        }
        function searchBreweries(params) {
            return $http.post("/api/project/search/brewery",params);
        }
        function searchAll(params) {
            return $http.post("/api/project/search",params);
        }
        function getAllCategories() {
            return $http.get("/api/project/category");
        }
        function getCategoryById(id) {
            return $http.get("/api/project/category/"+id);
        }
        function getBeerById(id) {
            return $http.get("/api/project/beer/"+id);
        }
        function getBreweryById(id) {
            return $http.get("/api/project/brewery/"+id);
        }
       // function getBreweriesByLocation(location) {
       //     return $http.get("/api/project/brewery?location="+location);
       // }
        function getBreweryByParams(params) {
            return $http.post("/api/project/brewery",params);
        }
    }
})();