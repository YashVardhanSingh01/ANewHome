const Alexa = require('ask-sdk-core');

module.exports = {
    switchVoice(text,voice_name) {
        if (text){
          return "<voice name='" + voice_name + "'>" + text + "</voice>"
        }
      },
    switchVoiceLang(lang,text,voice_name) {
        if (text){
          return "<lang xml:lang='" + lang + "'><voice name='" + voice_name + "'>" + text + "</voice></lang>"
        }
      },
    audioTag(text) {
        if (text){
          return "<audio src ='" +text + "'/>"
        }
      }
}