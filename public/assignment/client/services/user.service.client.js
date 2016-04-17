(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        return {
            login: login,
            logout: logout,
            register: register,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
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
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers(user){
            return $http.get("/api/assignment/user", user);
        }

        function createUser(user){
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/"+userId);
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
            return $http.put("/api/assignment/user/"+userId, newUser);
        }

        function setCurrentUser(user){
            $rootScope.user = user;
        }

        function getCurrentUser(){
            return $rootScope.user;
        }
    }
})();