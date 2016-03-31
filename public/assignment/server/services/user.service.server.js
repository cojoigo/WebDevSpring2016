module.exports = function(app, model){
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res){
        var user = req.body;
        model.createUser(user)
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

    function findAllUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username === undefined) {
            model.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    });
        } else if (password === undefined) {
            model.findUserByUsername(username)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    });
        } else {
             model.findUserByCredentials(username, password)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
    }

    function findUserById(req, res){
        var userId = req.params.id;
        model.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function updateUser(req, res){
        var user = req.body;
        var userId = req.params.id;
        model.updateUser(userId, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function deleteUserById(req, res){
        var userId = req.params.id;
        model.deleteUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                });
    }
};