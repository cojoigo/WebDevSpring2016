(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService() {
        var forms = [];

        var givenData = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        function initForms() {
            for (var i in givenData) {
                forms.push(givenData[i]);
            }
        }

        initForms();

        return {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        function createFormForUser(userId, form, callback){
            newForm = {"_id": (new Date).getTime(), "title": form.title, "userId": userId}
            forms.push(newForm);
            callback && callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var foundForms = [];
            for (var i in forms){
                if (forms[i].userId == userId){
                    foundForms.push(forms[i]);
                }
            }
            callback && callback(foundForms);
        }

        function deleteFormById(formId, callback){
            for (var i in forms){
                if (forms[i]._id == formId){
                    forms.splice(i,1);
                }
            }
            callback && callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            for (var i in forms){
                if (forms[i]._id == formId){
                    forms[i] =  {"_id": formId, "title": newForm.title, "userId": newForm.userId};
                    callback && callback(forms[i]);
                }
            }
        }
    }
})();