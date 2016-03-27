module.exports = function(brewdb) {
    return {
        searchBeers : searchBeers,
        searchBreweries : searchBreweries,
        searchAll : searchAll,
        getAllCategories : getAllCategories,
        getCategoryById : getCategoryById,
        getBeerById : getBeerById,
        getBeerByIds : getBeerByIds,
        getBeerByParams : getBeerByParams,
        getBreweryById : getBreweryById,
        getBreweryByIds : getBreweryByIds,
        getBreweryByParams : getBreweryByParams,
        getBreweriesByLocation : getBreweriesByLocation
    };


    //Search Functions
    function searchBeers(params, f){
        return brewdb.search.beers(params, f);
    }
    function searchBreweries(params, f){
        return brewdb.search.breweries(params, f);
    }
    function searchAll(params, f){
        return brewdb.search.all(params, f);
    }

    //Category
    function getAllCategories(f) {
        return brewdb.category.all(f);
    }
    function getCategoryById(id, f) {
        return brewdb.category.getById(Number(id), f);
    }

    //Beer
    function getBeerById(id, f){
        return brewdb.beer.getById(id, {}, f);
    }
    function getBeerByIds(ids, f){
        return brewdb.beer.getById(ids, {}, f);
    }
    function getBeerByParams(params, f){
        return brewdb.beer.find(params, f);
    }

    //Breweries
    function getBreweryById(id, f){
        return brewdb.breweries.getById(id, {withLocations: 'Y', withSocialAccounts: 'Y'}, f);
    }
    function getBreweryByIds(ids, f){
        return brewdb.breweries.getById(ids, {}, f);
    }
    function getBreweryByParams(params, f){
        return brewdb.breweries.find(params, f);
    }
    function getBreweriesByLocation(location){
        var apiKey = "&key=d3aab9c57c687035a95747bd8450ae75";
       /* return Q.Promise(function(callback) {
            return $http.get({
                host: 'api.brewerydb.com',
                path: '/v2/locations?region='+location+apiKey
            }, function(response) {
                // Continuously update stream with data
                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    console.log("abjsdasdb");
                    callback({
                        body: body
                    });
                });
            });*/
            return http.get("http://api.brewerydb.com/v2/locations?region="+location+apiKey);
       // });
    }
};