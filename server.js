// This import is pulling from node_modules now
const express = require("express");
const db = require("./users.js");
const cors = require("cors");
const server = express();

// This is installing some middleware to allow Express
// to parse JSON request bodies. We'll go more into detail about this later.
server.use(express.json());
server.use(cors());

server.get("/api/users", (req, res) => {
    const users = db.getUsers();
    if (users.length > 0) {
        res.json(users);
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
        });
    }
});

server.get("/api/users/:id", (req, res) => {
    // The param variable matches up to the name of our URL param above
    const user = db.getUserById(req.params.id);

    // Since we're now taking in values from the client,
    // we need to make sure the value is valid before trying to use it
    if (user) {
        res.status(200).json(user);
    } else {
        if (res.status(404)) {
            res.json({
                errorMessage: "The user with the specified ID does not exist.",
            });
        } else {
            res.json({
                errorMessage: "The user information could not be retrieved.",
            });
        }
    }
});

server.post("/api/users", (req, res) => {
    // never trust data coming from the client,
    // always validate it to some degree. make sure it's what you're expecting
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user.",
        });
    }

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    });

    if (newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({
            errorMessage:
                "There was an error while saving the user to the database",
        });
    }
});

server.put("/api/users/:id", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user.",
        });
    }

    const user = db.getUserById(req.params.id);

    // can't update a user that doesn't exist, so check first
    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
        });

        res.status(200).json(updatedUser);
    } else {
        if (res.status(404)) {
            res.json({
                errorMessage: "The user with the specified ID does not exist.",
            });
        } else {
            res.json({
                errorMessage: "The user information could not be retrieved.",
            });
        }
    }
});

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);

    if (user) {
        db.deleteUser(user.id);
        res.status(204).end();
    } else {
        if (res.status(404)) {
            res.json({
                errorMessage: "The user with the specified ID does not exist.",
            });
        } else {
            res.json({
                errorMessage: "The user could not be removed.",
            });
        }
    }
});

server.listen(8080, () => {
    console.log("server started on port 8080");
});
