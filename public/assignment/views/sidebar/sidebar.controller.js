(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", ['UserService', '$location', SidebarController]);

    function SidebarController(UserService, $location) {

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.user = UserService.getCurrentUser();
        }

        init();
    }
})();