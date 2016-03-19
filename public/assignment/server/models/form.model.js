var mock = require("./form.mock.json");

module.exports = function(app) {
    return {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser
    };

    function createForm(form){
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function findAllForms(){
        var forms = [];
        for (var i in mock) {
            forms.push(mock[i]);
        }
        return forms;
    }

    function findFormById(formId){
        for(var i in mock) {
            if( mock[i]._id === formId ){
                return mock[i];
            }
        }
        return null;
    }

    function updateForm(formId, form){
        for (var i in mock){
            if (mock[i]._id == formId){
                mock[i] = {"_id":formId, "title":form.title, "userId":form.userId,
                    "fields":form.fields};
                return mock[i];
            }
        }
    }

    function deleteForm(formId){
        for (var i in mock){
            if (mock[i]._id == formId){
                mock.splice(i,1);
                return mock;
            }
        }
    }

    function findFormByTitle(title){
        for(var i in mock) {
            if( mock[i].title === title){
                return mock[i];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId){
        var foundForms = [];
        for (var i in mock){
            if (mock[i].userId == userId){
                foundForms.push(mock[i]);
            }
        }
        return foundForms;
    }

    function createFormForUser(userId, form){
        form._id=(new Date).getTime();
        form.userId = userId;
        mock.push(form);
        return form;
    }
};