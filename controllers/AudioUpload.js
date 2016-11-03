var safetee_buffer = require('../models/Safetee_Head_Buffer');

//

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function (req, res) {
        //
        console.log(safetee_buffer.safetee_var.url['host_url'](req));
        //
        if(typeof req.files.record !== 'undefined') {
            //
            this.AudioUpload(req, function (audio_url) {
                    //
                    console.log(safetee_buffer.safetee_response.getresponse['new_record']('success'));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 1,
                        message: safetee_buffer.safetee_response.getresponse['new_record']('success'),
                        audio_url: audio_url
                    }
                    //
                    safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                //
            });
        }else{
            //
            //
            console.log(safetee_buffer.safetee_response.getresponse['no_form_data'](req));
            //
            safetee_buffer.safetee_return_data = {
                success:0,
                message:safetee_buffer.safetee_response.getresponse['no_form_data'](req)
            };
            //
            safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
        }
    },

    //handle audio upload here
    AudioUpload: function(req, callback) {
        //
        if (!req.files || !req.files.record || !req.files.record.name) {
            callback ('');
        }
        var data = safetee_buffer.safetee_filesync.readFileSync(req.files.record.path);
        var audioid = safetee_buffer.safetee_crypto.randomBytes(10).toString('hex');
        var fileName = audioid + "_" + Date.now() + "_" + req.files.record.name;
        var dir = safetee_buffer.safetee_dir.audio_upload_dir['audio_dir_heroku'](req);
        console.log(dir);
        safetee_buffer.safetee_filesync.writeFileSync(dir + "/" + fileName, data);
        callback(safetee_buffer.safetee_var.url['host_url'](req) + '/records/' + fileName);
    }

});
