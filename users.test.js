const request = require('supertest');
const express = require('express');
var bodyParser = require('body-parser')

const { createRouter } = require('./users')

let app, router
beforeEach(() => {
    app = express()

    router = createRouter()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/users', router)

})

describe('users router', () => {
    it('readUsers', (done) => {
        request(app)
            .get('/users')
            .end((err, res) => {
                console.log('what happened', err, res.body)
                done()
            })
    })

//     it('add stuff!', async () => {
//         const agent = request.agent(app)
//         // set / send =  headers / body (respectively)
//         const response1 = await agent.post('/comments')
//             .set('Content-Type', 'application/json')
//             .set('Accept', 'application/json')
//             .send({ message: 'from test', user: 'bob' })

//         const allComments = await request(app).get('/comments')
//         const newPost = allComments.body.comments.find(e => e.id === response1.body.id)
//         console.log('did i find it?', newPost, router._comments)
                
//         const inMemoryPost = router._comments.find(e => e.id === response1.body.id)
//         console.log('was it in memory?', inMemoryPost)
//     })
// })

// // example test suite
// describe('login', () => {

//     it('it accepts correct passwords', async () => {
//         console.log('correct')
//     })

//     it('reject bad passwords', async () => {
//         console.log('wrong')
//     })
})