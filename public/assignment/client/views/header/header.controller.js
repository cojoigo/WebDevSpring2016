(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", ['UserService', '$location', HeaderController]);

    function HeaderController(UserService, $location) {

        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
            vm.user = UserService.getCurrentUser();
        }

        init();

        function logout(){
            $location.path('#/home');
            UserService.setCurrentUser(null);
        }

    }
})();