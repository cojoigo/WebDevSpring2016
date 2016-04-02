module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", findFieldsInForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findFieldsInForm(req, res){
        var formId = req.params.formId;
        model.findFieldsInForm(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldById(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldsInForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteField(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function createField(req, res){
        var formId = req.params.formId;
        var field = req.body;
        model.createField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            ).done();
    }

    function updateField(req, res){
        var fieldId = req.params.fieldId;
        var field = req.body;
        var newField = {
            label: field.label,
            formId: field.formId,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        };
        model.updateField(fieldId, newField)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};