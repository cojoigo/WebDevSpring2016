var q = require("q");
var mongoose = require("mongoose");

module.exports = function(){

    var objectSchema = new mongoose.Schema({
        name: String,
        id: String,
        type: String
    });

    var UserSchema = new mongoose.Schema(
        {
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
        }, {collection: "user"});

    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        getMongooseModel: getMongooseModel,
        userLikes: userLikes,
        userDislikes: userDislikes
    };
    return api;

    function getMongooseModel() {
        return UserModel;
    }

    function userLikes (userId, object) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.favorites.push(object);
                doc.save (function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve (doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function userDislikes (userId, object) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (i in doc.favorites){
                    if (doc.favorites[i].id == object.id) {
                        doc.favorites.splice(i, 1);
                    }
                }
                doc.save (function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve (doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user){
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId, user, function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                UserModel.find(function (err, doc) {
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

    function findUserByCredentials(creds) {
        var deferred = q.defer();
        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            { username: creds.username,
                password: creds.password },
            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            { username: username },
            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

};