var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res) {
        //
        if(typeof req.files.record !== 'undefined' && typeof req.body.sender !== 'undefined' && typeof req.body.location !== 'undefined' && typeof req.body.uid !=='undefined') {
            //
            this.ClipUpload(req, function (clip_url) {
                //
                var uid = req.body.uid;
                var sender = req.body.sender;
                var location = req.body.location;
                var clip = clip_url;
                //
                var data = {
                    "uid": uid,
                    "sender": sender,
                    "location": location,
                    "clip": record,
                    "created": safetee_buffer.safetee.datetimenow
                };
                //
                safetee_buffer.safetee['reports'].create(data, function (err, response) {
                    //
                    if (err) {
                        //
                        console.log(safetee_buffer.safetee_response.getresponse['error'](req));
                        //
                        safetee_buffer.safetee_return_data = {
                            success: 0,
                            message: safetee_buffer.safetee_response.getresponse['error'](req)
                        };
                        //
                        safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                        //
                    } else {
                        //
                        console.log(safetee_buffer.safetee_response.getresponse['new_report']('success'));
                        //
                        safetee_buffer.safetee_return_data = {
                            success: 1,
                            message: safetee_buffer.safetee_response.getresponse['new_report']('success'),
                            info: JSON.stringify(response)
                        };
                        //
                        safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                    }
                });
            });

        }else{
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

    //handle clip upload here
    ClipUpload: function(req, callback) {
        //
        if (!req.files || !req.files.clip || !req.files.clip.name) {
            callback ('');
        }
        var data = safetee_buffer.safetee_filesync.readFileSync(req.files.clip.path);
        var clipid = safetee_buffer.safetee_crypto.randomBytes(10).toString('hex');
        var fileName = clipid + "_" + Date.now() + "_" + req.files.clip.name;
        var dir = safetee_buffer.safetee_dir.clip_upload_dir['clip_dir_heroku'](req);
        console.log(dir);
        safetee_buffer.safetee_filesync.writeFileSync(dir + "/" + fileName, data);
        callback(safetee_buffer.safetee_var.url['host_url'](req) + '/clips/' + fileName);
    }
});