module.exports = function(app, brewdb) {

    var userModel   = require("./models/user.model.js")();
    var brewDBModel   = require("./models/brewDB.model.js")(brewdb);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var brewDBService = require("./services/brewDB.service.server.js")(app, brewDBModel, userModel);
};