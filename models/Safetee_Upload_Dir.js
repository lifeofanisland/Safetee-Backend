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
var Clip_Upload_Dir = ({
    //
    clip_dir_windows: function (req) {
        return './public/clips';
    },
    //
    clip_dir_heroku: function (req) {
        //console.log(__dirname);
        return '/app/public/clips';
    }
    //
});
//
module.exports = {
    audio_upload_dir:  Audio_Upload_Dir,
    clip_upload_dir: Clip_Upload_Dir
}
