(function(){
    angular
        .module("BreweryApp")
        .factory("UserService", userService);

    function userService($http) {
        return {
            login: login,
            logout: logout,
            register: register,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByCredentials(username, password){
            return $http.get("/api/project/user?username="+username+"&password="+password)
                .then(function(user) {
                    setCurrentUser(user.data)
                });
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function createUser(user){
            return $http.post("/api/project/user", user)
                .then(function(user) {
                    setCurrentUser(user.data)
                });
        }

        function deleteUserById(userId){
            return $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user){
            var newUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                emails: user.emails,
                phones: user.phones
            };
            return $http.put("/api/project/user/"+userId, newUser);
        }
    }
})();