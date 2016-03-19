(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormFieldsController", ['FieldService', 'FormService', '$routeParams', '$location',  FormFieldsController]);

    function FormFieldsController(FieldService, FormService, $routeParams, $location)
    {
        var vm = this;

        function init(){

        }
        init();


    }
})();