const express = require('express');
const app = express();


app.set('view engine','ejs');

app.get('/',function(req, res){
    res.render('index');
});

const dashBoardRoute = require(__dirname + '/route/dashboard.js');
app.use('/dashboard',dashBoardRoute);

app.use(express.static(__dirname + '/public/assets/'))


const port = 2000;

app.listen(port);