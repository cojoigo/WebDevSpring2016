(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http) {
        return {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/:formId/field", formId, field);
        }

        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/:formId/field", formId);
        }

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignment/form/:formId/field/:fieldId", formId, fieldId);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/:formId/field/:fieldId", formId, fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.get("/api/assignment/form/:formId/field/:fieldId", formId, fieldId, field);
        }
    }
})();