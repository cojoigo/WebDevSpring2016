var q = require("q");
var mongoose = require('mongoose');

module.exports = function(brewdb) {

    var objectSchema = new mongoose.Schema({
        location: String,
        description: String,
        other: [String]
    });

    var BrewerySchema = new mongoose.Schema(
        {
            name: String,
            detail: [objectSchema],
            userId: String
        }, {collection: "BreweryModel"});

    var BreweryModel = mongoose.model('BreweryModel', BrewerySchema);


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
        getBreweriesByLocation : getBreweriesByLocation,
        deleteBrewery: deleteBrewery,
        createBreweryForUser: createBreweryForUser,
        updateBrewery: updateBrewery,
        findAllBreweriesForUser: findAllBreweriesForUser,
        findBreweryByName: findBreweryByName
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
            return http.get("http://api.brewerydb.com/v2/locations?region="+location.region+"&locality="+location.locality+apiKey);
       // });
    }

    // Form editing
    function createBrewery(brewery){
        var deferred = q.defer();
        BreweryModel.create(brewery, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllBreweriesForUser(userId){
        var deferred = q.defer();
        BreweryModel.find(
            { userId: userId },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createBreweryForUser(userId, brewery){
        brewery.userId = userId;
        return createBrewery(brewery);
    }

    function updateBrewery(breweryId, brewery){
        var deferred = q.defer();
        BreweryModel.findByIdAndUpdate(breweryId, brewery, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteBrewery(breweryId){
        var deferred = q.defer();
        BreweryModel.findById(breweryId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                BreweryModel.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findBreweryByName(name){
        var deferred = q.defer();
        BreweryModel.find(
            { name: name },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};