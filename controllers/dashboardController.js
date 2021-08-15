const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Poll = require('../models/Poll');
const mongoose = require('mongoose');


module.exports.dashboard_get = async (req ,res) => {
    const pollsActive = await Poll.find({pollEnded: false});
    const pollsEnded = await Poll.find({pollEnded: true})
    try {
        res.status(200).render('dashboard',{data : {pollsActive, pollsEnded}});
    }
    catch(err) {
        res.status(400).send(err.message);
    }  
}

module.exports.vote = async (req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => { 
        const user = await User.findById( mongoose.Types.ObjectId(decodedToken.id));
        const pollId = req.params.pollId;
        const optionId = req.params.optionId;
        console.log(pollId,optionId,user.name);
        try {
            const poll = await Poll.vote(pollId, user, optionId);            
            res.status(200).redirect('/dashboard');
        }
        catch(err) {
            res.status(400).send(err.message);
        }        
    });  
}

module.exports.poll_end = async (req, res) => {
    const pollId = req.params.pollId;
    try {
        const poll = await Poll.endPoll(pollId);
        res.status(200).redirect('/dashboard');
    } catch (err) {
        res.status(400).send(err.message);
    }
}