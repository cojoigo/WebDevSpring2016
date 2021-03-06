(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http) {
        return {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        function createFormForUser(userId, form){
            return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, form){
            var newForm = {
                userId: form.userId,
                title: form.title,
                fields: form.fields,
                created: form.created,
                updated: form.updated
            };
            return $http.put("/api/assignment/form/"+formId, newForm);
        }
    }
})();