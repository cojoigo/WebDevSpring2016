(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormFieldsController", ['FieldService', '$routeParams', '$location',  FormFieldsController]);

    function FormFieldsController(FieldService, $routeParams, $location)
    {
        var vm = this;
        var formId = $routeParams.formId;
        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;
        vm.selectField = selectField;
        vm.updating = 0;

        function init(){
            FieldService.getFieldsForForm(formId)
                .then(function(fieldList) {
                    vm.fields = fieldList.data;
                    $location.path('/form/'+formId+'/fields');
                });
        }
        init();

        function editField(field){
            vm.updating = 0;
            if (vm.selectedField.options[0]) {
                var parseOptions = vm.selectedField.selectedOptions.split(",");
                var retOptions = [];
                for (var i in parseOptions) {
                    var splitting = parseOptions[i].split(":");
                    retOptions.push(
                        {
                            label: splitting[0],
                            value: splitting[1]
                        });
                }
                field.options = retOptions;
            }
            FieldService.updateField(formId, field._id,field);
            FieldService.getFieldsForForm(formId)
                .then(function(fieldList) {
                    vm.fields = fieldList.data;
                    $location.path('/form/'+formId+'/fields');
                });
        }

        function removeField(field){
            FieldService.deleteFieldFromForm(formId, field._id);
            FieldService.getFieldsForForm(formId)
                .then(function(fieldList) {
                    vm.fields = fieldList.data;
                    $location.path('/form/'+formId+'/fields');
                });
        }

        function addField(fieldType){
            var field = {};
            switch(fieldType){
                case "Single Line Text Field":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "Multi Line Text Field":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "Date Field":
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "Dropdown Field":
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "Checkboxes Field":
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "Radio Buttons Field":
                    field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
                default:
                    break;
            }
            FieldService.createFieldForForm(formId, field);
            FieldService.getFieldsForForm(formId)
                .then(function(fieldList) {
                    vm.fields = fieldList.data;
                    $location.path('/form/'+formId+'/fields');
                });
        }

        function selectField(field){
            vm.selectedField = field;
            var selectedOptions = [];
            for (var i in vm.selectedField.options){
                var str = vm.selectedField.options[i].label + ":" + vm.selectedField.options[i].value + "\n";
                selectedOptions.push(str);
            }
            vm.selectedField.selectedOptions = selectedOptions;
            vm.updating = 1;
        }

    }
})();