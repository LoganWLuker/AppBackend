var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
var things = require('./things.js');
const comments = require('./comments.js');
//both index.js and things.js should be in same directory
app.use('/things', things);
app.use('/comments', comments);
app.get('/hello', function(req, res) {
    res.send("Hello world!");
});
app.post('/hello', function(req, res) {
    res.send("You just called the post method at '/hello'!\n")
})

app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this route!");
})

app.get('/:id', function(req, res) {
    res.send('The id you specified is ' + req.params.id)
})

app.listen(3000);