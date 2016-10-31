var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var globalname = 'Add Record';
var return_data = '';

module.exports = BaseController.extend({
    name: globalname,
    //
    run: function(req, res, next) {
        //
        if(req.body && req.body.form && req.body.form == 'go') {
        //
        var sender = req.body.sender;
        var location = req.body.location;
        var record = this.AudioUpload(req);
        var category = req.body.category;
        //
        var data = {
            "sender":sender,
            "location":location,
            "record":record,
            "created":safetee.datetimenow,
            "category":category,
            "agencies":[],
            "share": false
        };
        //
        safetee['records'].create(data, function(err, response) {
        //
            if (err){
                //
                console.log(safetee_response.getresponse['error'](req));
                //
                return_data = {
                    success: 0,
                    message: safetee_response.getresponse['error'](req)
                };
                //
                safetee_response.returnresponse['send'](return_data,res);
                //
            }else {
                //
                console.log(safetee_response.getresponse['new_record']('success'));
                //
                return_data = {
                    success: 1,
                    message: safetee_response.getresponse['new_record']('success'),
                    info: JSON.stringify(response)
                };
                //
                safetee_response.returnresponse['send'](return_data, res);
            }
        });

        }else{
            //
            console.log(safetee_response.getresponse['no_form_data'](req));
            //
            return_data = {
                success:0,
                message:safetee_response.getresponse['no_form_data'](req)
            };
            //
            safetee_response.returnresponse['send'](return_data,res);
        }

    },

    //handle audio upload here
    AudioUpload: function(req) {
        //
        var data = fs.readFileSync(req.files.record.path);
        var audioid = crypto.randomBytes(10).toString('hex');
        var fileName = audioid+"_"+Date.now()+"_"+req.files.record.name;
        var dir = "/root/SafeteeJsFlex/public/records";
        fs.writeFileSync(dir + "/" + fileName, data);
        return '/records/' + fileName;
    }
});