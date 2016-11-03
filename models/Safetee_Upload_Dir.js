//
var Audio_Upload_Dir = ({
    //
    audio_dir_windows: function (req) {
        return './public/records';
    },
    //
    audio_dir_heroku: function (req) {
        //console.log(__dirname);
        return '/app/public/records';
    }
    //
});
//
module.exports = {
    audio_upload_dir:  Audio_Upload_Dir
}
