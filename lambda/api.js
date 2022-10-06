const Util = require('./util.js');
const axios = require('axios');

module.exports = {
    async getDialogueLinks(){
        let Intent
        try{
        const resp = await axios.get("https://1rw6xb62xh.execute-api.us-east-1.amazonaws.com/dev/api/v1/audio/IntentDialogues");
        Intent = resp.data.audio;
        } catch(err) {
           console.log(err);
        }
        var intent = [];
        for(let i = 0; i < Intent.length; i++){
            intent.push(Util.getS3PreSignedUrl(Intent[i].url).replace(/&/g,'&amp;'));
        }
        return {
            intent: intent
        }
    }
    
}