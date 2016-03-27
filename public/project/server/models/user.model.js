var mock = require("./user.mock.json");

module.exports = function(app){
    return {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };

    function createUser(user){
        user._id = (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findAllUsers(){
        var users = [];
        for (var i in mock) {
            users.push(mock[i]);
        }
        return users;
    }

    function findUserById(userId){
        for(var i in mock) {
            if( mock[i]._id === userId ){
                return mock[i];
            }
        }
        return null;
    }

    function updateUser(userId, user){
        for (var i in mock){
            if (mock[i]._id === userId){
                mock[i] = {"_id":userId, "firstName":user.firstName, "lastName":user.lastName,
                    "username":user.username,"password":user.password, "email":user.email};
                return mock[i];
            }
        }
    }

    function deleteUserById(userId){
        for (var i in mock){
            if (mock[i]._id == userId){
                mock.splice(i,1);
                return mock;
            }
        }
    }

    function findUserByCredentials(username, password){
        for(var i in mock){
            if( mock[i].username == username &&
                mock[i].password == password){
                    return mock[i];
            }
        }
        return null;
    }

    function findUserByUsername(username){
        for(var i in mock) {
            if( mock[i].username == username){
                return mock[i];
            }
        }
        return null;
    }

};