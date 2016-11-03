//
var Audio_Upload_Dir = ({
    //
    audio_dir_windows: function (req) {
        return './public/records';
    },
    //
    audio_dir_heroku: function (req) {
        //console.log(__dirname);
        return '/tmp/build_b0b4be187e2b7dab2261f429c2abbabc/lifeofanisland-Safetee-Backend-3aefac1/public/records';
    }
    //
});
//
module.exports = {
    audio_upload_dir:  Audio_Upload_Dir
}
