const Audio = require('../models/audioModel');

exports.listAllAudios = async(req,res) => {
    try{
    const links = await Audio.find();
    res.status(200).json(links);
    } catch(err) {
    res.status(500).send(err);
    }
};

exports.createNewAudios = async (req,res)=>{
    const {name,audio} = req.body;
    try {
        console.log(req.body);
        const newLink = await Audio.create({name,audio});
        res.json(newLink);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.listOneAudio = async (req,res) => {
    try{
        const link = await Audio.findOne({name: req.params.name});
        res.status(200).json(link);
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.updateAudios = async (req,res) => {
    try{
        const links = await Audio.findOneAndUpdate({name:req.params.name}, req.body, {new:true});
        res.status(200).json(links);
    } catch (err) {
        res.status(500).send(error);
    }
};
exports.deleteAudios = async (req,res) => {
    try{
        const audio = await Audio.findOneAndDelete({name: req.params.name});
        res.status(200).json(audio);
    } catch (err) {
        res.status(500).send(err);
    }
};
