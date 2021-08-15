const Poll = require("../models/Poll");



module.exports.create_poll_get = async (req, res) => {
    res.render('pollCreate');
}


module.exports.create_poll_post = async (req, res) => {
    const pollName = req.body.pollName;
    const options = req.body.options;
    console.log(pollName, options);

    try {
        const poll = await Poll.create({pollName,options});
        res.status(200).redirect('/dashboard');
        
    } catch (err) {
        console.log(err);
        res.status(400).json({err});
    }

}