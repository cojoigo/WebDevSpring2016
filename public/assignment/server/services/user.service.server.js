module.exports = function(app, model){
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res){
        var user = req.body;
        user = model.createUser(user);
        res.json(user);
    }

    function findAllUsers(req, res){
        var user = null;
        var username = req.query.username;
        var password = req.query.password;
        if (username === undefined) {
            user = model.findAllUsers();
            res.json(user);
        } else if (password === undefined) {
            user = model.findUserByUsername(username);
            res.json(user);
        } else {
            user = model.findUserByCredentials(username, password);
            res.json(user);
        }
    }

    function findUserById(req, res){
        var userId = req.params.id;
        var user = model.findUserById(Number(userId));
        res.json(user);
    }

    function updateUser(req, res){
        var user = req.body;
        var userId = req.params.id;
        user = model.updateUser(Number(userId), user);
        res.json(user);
    }

    function deleteUserById(req, res){
        var userId = req.params.id;
        var user = model.deleteUserById(userId);
        res.json(user);
    }
};