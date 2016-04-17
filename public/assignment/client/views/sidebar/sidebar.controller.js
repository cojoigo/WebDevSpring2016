(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", ['$location', '$rootScope', SidebarController]);

    function SidebarController($location, $rootScope) {

        var vm = this;

        function init() {
            vm.$location = $location;
        }

        init();
    }
})();