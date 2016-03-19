module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", findFieldsInForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findFieldsInForm(req, res){
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form.fields);
    }

    function findFieldById(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = model.findFormById(formId);
        for (var i in form.fields){
            if (form.fields[i]._id === fieldId){
                res.json(form.fields);
            }
        }
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = model.findFormById(formId);
        for (var i in form.fields){
            if (form.fields[i]._id === fieldId){
                form.fields.splice(i,1);
            }
        }
        model.updateForm(formId, form);
        res.json(form.fields);
    }

    function createField(req, res){
        var formId = req.params.formId;
        var field = req.body;
        var form = model.findFormById(formId);
        form.fields.push(field);
        model.updateForm(formId, form);
        res.json(form.fields);
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var form = model.findFormById(formId);
        for (var i in form.fields){
            if (form.fields[i]._id === fieldId){
                form.fields[i] = field;
            }
        }
        model.updateForm(formId, form);
        res.json(form.fields);
    }
};