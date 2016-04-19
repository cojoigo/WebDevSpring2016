var mongoose = require('mongoose');

module.exports = function() {

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
        favoriteBeers: [String],
        favoriteBreweries: [String]
    }, {collection: 'user'});
    return UserSchema;
};