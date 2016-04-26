(function(){
    angular
        .module("BreweryApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/brewery", {
                    templateUrl: "views/brewery/brewery.view.html",
                    controller: "BreweryController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/beer", {
                    templateUrl: "views/brewery/beer.view.html",
                    controller: "BeerController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/beer/:id", {
                    templateUrl: "views/detail/beer.detail.view.html",
                    controller: "BeerDetailController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/brewery/:id", {
                    templateUrl: "views/detail/brewery.detail.view.html",
                    controller: "BreweryDetailController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/AdminBrewery", {
                    templateUrl: "views/admin/admin.brewery.view.html",
                    controller: "AdminBreweryController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/AdminBrewery/:breweryId", {
                    templateUrl: "views/admin/admin.brewery.details.view.html",
                    controller: "AdminBreweryDetailController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/favorites", {
                    templateUrl: "views/favorites/favorites.view.html",
                    controller: "FavoritesController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/users", {
                    templateUrl: "views/users/user.search.view.html",
                    controller: "UserSearchController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/users/:username", {
                    templateUrl: "views/users/user.favorites.view.html",
                    controller: "UserFavoritesController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else
            {
                $rootScope.errorMessage = 'You need to be an admin.';
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();