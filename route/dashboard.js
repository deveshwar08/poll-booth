const express = require('express');
var route = express.Router();

/*var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'test@123',
    database: 'pollBooth'
});

connection.connect();

connection.query();*/


var pollsActive = [[{name: "Option 1",votes: 0}]];
var pollsEnded = [[{name: "Option 1",percent: 20}]];

route.get('/',function(req, res){
    res.render('dashboard',{pollsActive: pollsActive,pollsEnded: pollsEnded});
});

route.post('/',function(req, res){
    pollsActive.forEach(function(item){
        if(req.body.poll === pollsActive.indexOf(item))
        {
            item.forEach(function(option){
                if(req.body.option === item.indexOf(option))
                {
                    option.votes++;
                    pollsEnded[0][0].percent += 20;
                    console.log("Option name:" + option.name);
                    console.log("Votes:" + option.votes);
                }
            });
        }
    });
    res.render('dashboard',{pollsActive: pollsActive,pollsEnded: pollsEnded});
});

module.exports = route;