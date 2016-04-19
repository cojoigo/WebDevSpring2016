var mongoose = require('mongoose');

module.exports = function() {

    var objectSchema = mongoose.Schema({
        name: String,
        id: String,
        type: String
    });

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        roles: [String],
        emails: [String],
        phones: [String],
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        favorites: [objectSchema],
        adminBreweries: [String]
    }, {collection: 'user'});
    return UserSchema;
};