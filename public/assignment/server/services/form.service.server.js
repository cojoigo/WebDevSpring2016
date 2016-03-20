module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/forms", findAllForms);


    function findAllFormsForUser(req, res){
        var userId = req.params.userId;
        var form = model.findAllFormsForUser(userId);
        res.json(form);
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function deleteForm(req, res){
        var formId = req.params.formId;
        var form = model.deleteForm(formId);
        res.json(form);
    }

    function createFormForUser(req, res){
        var form = req.body;
        var userId = req.params.userId;
        form = model.createFormForUser(userId, form);
        res.json(form);
    }

    function updateFormById(req, res){
        var form = req.body;
        var formId = req.params.formId;
        form = model.updateForm(formId, form);
        res.json(form);
    }

    function findAllForms(req, res){
        var forms = model.findAllForms();
        res.json(forms);
    }
};