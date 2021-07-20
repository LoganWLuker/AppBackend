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
        const exist = users.find(user => user.uName == req.body.uName)
        if (exist) {
            res.send({ error: "user already exists" })
        } else {
            users.push(user); // adds user to the end of array
            // eventually will save user to database instead of local
            res.send(user);
        }
    });

    //get all users
    router.get('/', (req, res) => {
        res.send({ users })
    });


    //get one user
    router.get('/:uid', (req, res) => {
        // res.send({ users })
        // const user = users.find((user) => user.id == req.params.uid)
        const user = users.find((user) => user.uName == req.params.uid)

        if (user) {
            res.send(user);

        } else {
            res.status(404).send({ error: '404 not found' })
        }
    });

    //updating existing user password
    router.post('/update', (req, res) => {
        /*get current login info
        */

        // validate new passwords match 
        let new1 = req.body.new1;
        let new2 = req.body.new2;
        if (!(new1 === new2)) {
            res.send({ error: "new passwords do not match" });
        } else {
            // validate login
            const validUser = users.find(user => user.uName == req.body.uName && user.pass == req.body.pass)
            if (validUser) {
                validUser.pass = new1;
                res.send(validUser);
            }
        }
        // res.send(`Username: ${username} Password: ${password}`);
    });

    //login existing user
    router.post('/login', (req, res) => {
        // res.send(`Username: ${uName} Password: ${pass}`);
        const validLogin = users.find(user => user.uName == req.body.uName && user.pass == req.body.pass)
        if (validLogin) {
            res.send({ msg: "welcome " + validLogin.uName + "!" });
        } else {
            res.send({ msg: "invalid username or password" });
        }
    });

    return router;
}
module.exports = {
    createRouter
}