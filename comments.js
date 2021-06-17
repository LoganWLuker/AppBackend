const express = require('express');
const router = express.Router();
const comments = [{message: 'ayo ayo', user: 'Jeff', id: "1234135"}, {message: 'yea yea', user: 'Jennifer', id: "123413"}]
let num = 0;
router.get('/', (req, res) => {
    // res.send(commenterID)
    res.send({ comments })
}); 
router.post('/', (req, res) => {
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    const { body } = req
    const comment = {
        id,
        ...body
    }
    comments.unshift(comment);
    console.log({ comments })
    res.send(comment);
});
router.delete('/', (req, res) => {
    const { id } = req.body
    const indexToDelete = comments.findIndex((comment) => comment.id === id)

    if (indexToDelete === -1 ){
        console.warn (`Could not find comment with id #${id}`)
        res.send(`Could not find comment with id #${id}`)
        return
    }
    const [deletedComment] = comments.splice(indexToDelete, 1);
    res.send(deletedComment);
});

//export this router to use in our index.js
module.exports = router;