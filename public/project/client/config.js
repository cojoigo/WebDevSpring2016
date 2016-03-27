(function(){
    angular
        .module("BreweryApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
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
                    controllerAs: "model"
                })
                .when("/beer", {
                    templateUrl: "views/brewery/beer.view.html",
                    controller: "BeerController",
                    controllerAs: "model"
                })
                .when("/beer/:id", {
                    templateUrl: "views/detail/beer.detail.view.html",
                    controller: "BeerDetailController",
                    controllerAs: "model"
                })
                .when("/brewery/:id", {
                    templateUrl: "views/detail/brewery.detail.view.html",
                    controller: "BreweryDetailController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();