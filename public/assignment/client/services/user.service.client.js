(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        return {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user?username="+username+"&password="+password)
                .then(function(user) {
                    setCurrentUser(user.data)
                });
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function createUser(user){
            return $http.post("/api/assignment/user", user)
                .then(function(user) {
                    setCurrentUser(user.data)
            });
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user){
            console.log(userId);
            return $http.put("/api/assignment/user/"+userId, user);
        }

        function setCurrentUser(user){
            $rootScope.user = user;
        }

        function getCurrentUser(){
            return $rootScope.user;
        }
    }
})();