(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", ['FormService', 'UserService', '$location',  FormController]);

    function FormController(FormService, UserService, $location)
    {
        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.clickForm = clickForm;
        vm.updating = 1;

        function init(){
            var user = UserService.getCurrentUser();
            FormService.findAllFormsForUser(user._id)
                .then(function(formList) {
                    vm.forms = formList.data;
                    $location.path('/forms');
                });
        }
        init();


        function addForm(newForm){
            var user = UserService.getCurrentUser();
            FormService.createFormForUser(user._id,newForm);
            FormService.findAllFormsForUser(user._id)
                .then(function(formList) {
                    vm.forms = formList.data;
                    newForm.title = "";
                    $location.path('/forms');
                });
        }

        function updateForm(newForm){
            FormService.updateFormById(newForm._id,newForm);
            var user = UserService.getCurrentUser();
            FormService.findAllFormsForUser(user._id)
                .then(function(formList) {
                    newForm.title = "";
                    vm.updating = 1;
                    vm.forms = formList.data;
                    $location.path('/forms');
                });
        }

        function deleteForm(form){
            FormService.deleteFormById(form._id)
                .then(function(formList) {
                    vm.forms = formList.data;
                    $location.path('/forms');
                });
        }

        function selectForm(index){
            vm.selectedFormIndex = index;
            vm.newForm = vm.forms[index];
            vm.updating = 0;
        }

        function clickForm(form){
            $location.path('/form-fields/'+form._id);
        }
    }
})();