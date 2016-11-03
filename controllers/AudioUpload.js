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
            this.AudioUpload(req, function (err, audio_url) {
                //
                if (err){
                    //
                    console.log(safetee_buffer.safetee_response.getresponse['error'](req));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 0,
                        message: safetee_buffer.safetee_response.getresponse['error'](req)
                    };
                    //
                    safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
                    //
                }else {
                    //
                    console.log(safetee_buffer.safetee_response.getresponse['new_record']('success'));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 1,
                        message: safetee_buffer.safetee_response.getresponse['new_record']('success'),
                        info: audio_url
                    };
                    //
                    safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                }

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
    AudioUpload: function(req) {
    //
    if(!req.files || !req.files.record || !req.files.record.name) {
            return  '';
    }
    var data = fs.readFileSync(req.files.record.path);
    var audioid = crypto.randomBytes(10).toString('hex');
    var fileName = audioid+"_"+Date.now()+"_"+req.files.record.name;
    var dir = safetee_buffer.safetee_dir.audio_upload_dir['audio_dir'](req);
    fs.writeFileSync(dir + "/" + fileName, data);
    return safetee_buffer.safetee_var.url['host_url'](req)+'/records/' + fileName;
}

});
