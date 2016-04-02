module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/forms", findAllForms);


    function findAllFormsForUser(req, res){
        var userId = req.params.userId;
        model.findAllFormsForUser(userId).then(
            function (doc) {
                res.json(doc);
            },
            // send error if promise rejected
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }

    function findFormById(req, res){
        var formId = req.params.formId;
        model.findFormById(formId)
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

    function deleteForm(req, res){
        var formId = req.params.formId;
        model.deleteForm(formId)
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

    function createFormForUser(req, res){
        var form = req.body;
        var userId = req.params.userId;
        model.createFormForUser(userId, form)
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

    function updateFormById(req, res){
        var form = req.body;
        var formId = req.params.formId;
        var newForm = {
            userId: form.userId,
            title: form.title,
            fields: form.fields,
            created: form.created,
            updated: form.updated
        };
        model.updateForm(formId, newForm)
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

    function findAllForms(req, res){
        model.findAllForms()
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