// step 1: create a router (like in comments.js)
//      step 1.5: don't forget to wire your router up in the index.js
// step 2: add routes for getting all users, a single user by id, ands creating a user
// step 3: create a route for logging in (checking username + password)

// step 4: write some tests to check it works
const UUID = require('uuid').v4;
const express = require('express');

const createRouter = () => {
    const router = express.Router();
    const users = [];

    //get all users
    router.get('/', (req, res) => {
        res.send({ users })
    });

    //assign users id
    router.post('/', (req, res) => {
        const id = UUID();
        const name = req.body.name;
        const user = {
            name,
            id
        }
            // uid + ',' + name

        users.push(user);
        res.send(user);
    });

    //get one user
    router.get('/:uid', (req, res) => {
        // res.send({ users })
        const user = users.find((user) => user.id == req.params.uid)
        if(user){
            res.send(user);

        }else{
            res.status(404).send({error:'not found'})
        }
    });

    //create a user
    // router.post('/', (req, res) => {
    //     const newUser 
    //     users.push(newUser);
    // });

    return router;
}
module.exports = {
    createRouter
}