module.exports = function(app, model) {
    app.post("/api/project/search/beer", searchBeers);
    app.post("/api/project/search/brewery", searchBreweries);
    app.post("/api/project/search", searchAll);
    app.get("/api/project/category", getAllCategories);
    app.get("/api/project/category/:id", getCategoryById);
    app.get("/api/project/beer/:id", getBeerById);
    app.get("/api/project/beer/beers", getBeerByIds);
    app.get("/api/project/beer", getBeerByParams);
    app.get("/api/project/brewery/breweries", getBreweryByIds);
    app.get("/api/project/brewery/:id", getBreweryById);
    app.post("/api/project/brewery", getBreweryByParams);

    function searchBeers(req, res){
        var params = req.body;
        model.searchBeers(params, function(err, list)
            {
                res.json(list);
            });
    }

    function searchBreweries(req, res){
        var params = req.body;
        model.searchBeers(params, function(err, list)
        {
            res.json(list);
        });
    }

    function searchAll(req, res){
        var params = req.body;
        model.searchAll(params, function(err, list)
        {
            res.json(list);
        });
    }

    function getAllCategories(req, res){
        model.getAllCategories(function(err, list)
        {
            res.json(list);
        });
    }

    function getCategoryById(req, res){
        var id = req.params.id;
        model.getCategoryById(id, function(err, list)
        {
            res.json(list);
        });
    }

    function getBeerById(req, res){
        var id = req.params.id;
        model.getBeerById(id, function(err, list)
        {
            res.json(list);
        });
    }

    function getBeerByIds(req, res){
        var ids = req.body;
        model.getBeerByIds(ids, function(err, list)
        {
            res.json(list);
        });
    }

    function getBeerByParams(req, res){
        var params = req.body;
        model.getBeerByParams(params, function(err, list)
        {
            res.json(list);
        });
    }

    function getBreweryById(req, res){
        var id = req.params.id;
        model.getBreweryById(id, function(err, list)
        {
            res.json(list);
        });
    }
    function getBreweryByIds(req, res){
        var ids = req.body;
        model.getBreweryByIds(ids, function(err, list)
        {
            res.json(list);
        });
    }
    function getBreweryByParams(req, res){
        var params = req.body;
        //if (req.query.location){
        //    getBreweriesByLocation(req, res);
       //}
        if (req.query.id){
            getBreweryById(req, res);
        }
        model.getBreweryByParams(params, function(err, list)
        {
            res.json(list);
        });
    }

    function getBreweriesByLocation(req, res){
        var location = req.query.location;
        model.getBreweriesByLocation(location)
            .then(function (list) {
            res.json(list);
        });
    }
};