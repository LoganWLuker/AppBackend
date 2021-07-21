// step 1: create a router (like in comments.js)
//      step 1.5: don't forget to wire your router up in the index.js
// step 2: add routes for getting all users, a single user by id, ands creating a user
// step 3: create a route for logging in (checking username + password)
// step 4: write some tests to check it works

/* This file is meant to support:
returning all users
registering a user
logging in an existing user
and returns all users */

const UUID = require('uuid').v4;
const express = require('express');
const bcrypt = require('bcrypt');


const createRouter = () => {
    const router = express.Router();
    const users = [];
    const cleanUser = (u) => {
        return {
            uName: u.uName,
            id: u.id
        }
    }
    const findUser = (u, request) => {
        return users.find((u) => u.uName == request.body.uName)
    }

    // create new user
    router.post('/create', (req, res) => {
        const id = UUID();
        const uName = req.body.uName
        const pass = req.body.pass

        let hash = bcrypt.hashSync(pass, 10);// hash the password

        const user = {
            uName,
            hash,
            id
        }

        // no duplicate usernames allowed
        if (findUser(user, req)) {
            res.send({ error: "user already exists" })
        } else {
            users.push(user);
            res.send(cleanUser(user));
        }
    });

    //get all users
    router.get('/', (req, res) => {
        const cleaned = users.map(cleanUser)
        res.send({ cleaned })

    });


    //get one user
    router.get('/:uid', (req, res) => {
        // const user = users.find((user) => user.id == req.params.uid)
        const user = users.find((user) => user.uName == req.params.uid)

        if (user) {
            res.send(cleanUser(user));

        } else {
            res.status(404).send({ error: '404 not found' })
        }
    });

    //updating existing user password
    router.post('/update', (req, res) => {

        // validate new passwords match
        let success = false
        let new1 = req.body.new1;
        let new2 = req.body.new2;
        if ((new1 !== new2)) {
            return res.send({ error: "new passwords do not match" });
        }
        // validate login
        if (findUser(user, req)) {
            const valid = bcrypt.compareSync(req.body.pass, user.hash)
            if (valid) {
                user.hash = bcrypt.hashSync(new1, 10);
                success = true
            }
        }

        if (success) {
            // if (req.body.pass == req.body.new1) {
            //     res.send({ msg: "must update password" });
            //     return
            // }
            // user.hash = bcrypt.hashSync(new1, 10);
            res.send({ msg: "password succesfully updated!" });
        } else {
            res.send({ msg: "invalid username or password" });
        }

        // res.send(`Username: ${username} Password: ${password}`);
    });

    //login existing user
    router.post('/login', (req, res) => {
        // res.send(`Username: ${uName} Password: ${pass}`);
        let valid = false
        if (findUser(user, req)) {
            valid = bcrypt.compareSync(req.body.pass, user.hash)
        }
        // const validLogin = users.find(user => user.uName == req.body.uName && user.pass == req.body.pass)
        if (valid) {
            res.send({ msg: "welcome " + user.uName + "!" });
        } else {
            res.send({ msg: "invalid username or password" });
        }
    });

    return router;
}
module.exports = {
    createRouter
}