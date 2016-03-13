(function(){
    angular
        .module("BreweryApp")
        .factory("UserService", userService);

    function userService($rootScope) {
        var currentUsers = [];

        var givenData = [
            {"_id":123,"firstName":"Alice","lastName":"Wonderland",
                "username":"alice","password":"alice", "roles": ["student"]},
            {"_id":234, "firstName":"Bob","lastName":"Hope",
                "username":"bob","password":"bob","roles": ["admin"]},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan","lastName":"Craig",
                "username":"dan","password":"dan","roles": ["faculty", "admin"]},
            {"_id":567, "firstName":"Edward","lastName":"Norton",
                "username":"ed","password":"ed","roles": ["student"]}
        ];

        function initUsers() {
            for (var i in givenData) {
                currentUsers.push(givenData[i]);
            }
        }

        initUsers();

        return {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
        };

        function findUserByCredentials(username, password, callback){
            for (var i in currentUsers){
                if (currentUsers[i].username == username && currentUsers[i].password == password){
                    callback && callback(currentUsers[i]);
                    return;
                }
            }
            callback && callback(null);
        }

        function findAllUsers(callback){
            callback && callback(currentUsers);
        }

        function createUser(user, callback){
            var newUser = {"_id":(new Date).getTime(), "firstName":user.firstName, "lastName":user.lastName,
                "username":user.username,"password":user.password,"roles": user.roles};
            currentUsers.push(newUser);
            callback && callback(newUser);
        }

        function deleteUserById(userId, callback){
            for (var i in currentUsers){
                if (currentUsers[i]._id == userId) {
                    currentUsers.splice(i,1);
                    callback && callback(currentUsers);
                }
            }
        }

        function updateUser(userId, user, callback){
            for (var i in currentUsers){
                if (currentUsers[i]._id == userId) {
                    currentUsers[i] = {"_id":userId, "firstName":user.firstName, "lastName":user.lastName,
                        "username":user.username,"password":user.password,"roles": user.roles};
                    callback && callback(currentUsers[i]);
                }
            }
        }

        function setCurrentUser(user){
            $rootScope.user = user;
        }

        function getCurrentUser(){
            return $rootScope.user;
        }
    }
})();