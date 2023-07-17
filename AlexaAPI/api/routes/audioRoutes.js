module.exports = function(app) {
    const audioList = require('../controllers/audioController');

    app.route("/api/v1/audios")
    .get(audioList.listAllAudios)
    .post(audioList.createNewAudios);

    app.route("/api/v1/audio/:name")
    .get(audioList.listOneAudio)
    .put(audioList.updateAudios)
    .delete(audioList.deleteAudios);
};
