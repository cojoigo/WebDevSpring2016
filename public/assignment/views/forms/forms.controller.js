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
        vm.callback = callback;
        vm.updating = 1;

        function init(){
            var user = UserService.getCurrentUser();
            FormService.findAllFormsForUser(user._id, callback);
        }
        init();


        function callback(formList){
            if (formList) {
                vm.forms = formList;
                $location.path('/forms');
            }
        }

        function addForm(newForm){
            var user = UserService.getCurrentUser();
            FormService.createFormForUser(user._id,newForm,callback);
            newForm.title = "";
            FormService.findAllFormsForUser(user._id, callback);
        }

        function updateForm(newForm){
            FormService.updateFormById(newForm._id,newForm,callback);
            var user = UserService.getCurrentUser();
            newForm.title = "";
            vm.updating = 1;
            FormService.findAllFormsForUser(user._id, callback);
        }

        function deleteForm(form){
            FormService.deleteFormById(form._id,callback);
            var user = UserService.getCurrentUser();
            FormService.findAllFormsForUser(user._id, callback);
        }

        function selectForm(index){
            vm.selectedFormIndex = index;
            vm.newForm = vm.forms[index];
            vm.updating = 0;
        }

    }
})();