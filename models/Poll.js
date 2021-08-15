const mongoose = require('mongoose');
const User = require('./User');


const optionSchema = new mongoose.Schema({
    optionName: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    }
});

const pollSchema = new mongoose.Schema({
    pollName: {
        type: String,
        required: true
    },
    options:[optionSchema],
    voters: [User.schema],
    pollEnded: {
        type: Boolean,
        default: false
    }
});

pollSchema.statics.vote = async function(pollId, voter, optionId){

    const poll = await this.findById(mongoose.Types.ObjectId(pollId));
    console.log(pollId,voter._id,optionId);
    if(poll){
        let flag = 0;
        poll.voters.forEach(v => {            
            if(v.id === voter._id){
                flag++;
            }
        });
        console.log("flag",flag);
        if(flag === 0){
            let vote;
            let optionIndex;
            await poll.options.forEach(option => {
                if(option._id == optionId){
                    vote = option.votes;
                    optionIndex = poll.options.indexOf(option); 
                }
            });
            console.log("Votes",vote);
            await this.findById(mongoose.Types.ObjectId(pollId),async function(err,doc){
                console.log("docs docs docs",doc.options.id(optionId));
                doc.options.id(optionId).votes = vote + 1;
                doc.markModified('options');
                doc.save();
            });
            await poll.update({$push : {voters: voter}});
        }
        else{
            console.log("Already voted this poll");
            throw "Already voted this poll";
        }
    }
    else {
        console.log("Invalid poll");
        throw "No available poll";
    }
}

pollSchema.statics.getPollDetails = async function(pollId){
   
    const poll = await this.findById(mongoose.Types.ObjectId(pollId));
    if(poll){
        return poll;
    }
    else {
        throw "No Poll Avialable";        
    }
}

pollSchema.statics.endPoll = async function(pollId){
    const poll = await this.findById(mongoose.Types.ObjectId(pollId));
    if(poll)
    {
        await this.findByIdAndUpdate(mongoose.Types.ObjectId(pollId),{pollEnded: true});
        return poll;
    }
    else{
        throw "No Poll available"
    }
}

const poll = mongoose.model('poll',pollSchema);

module.exports = poll;