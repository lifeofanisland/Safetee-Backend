var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var crypto = require("crypto");
var globalname = "Sign in";
var return_data = '';
//
module.exports = BaseController.extend({
    name: globalname,
    run: function(req, res) {
        //
        if(req.body && req.body.form && req.body.form == 'go') {
        //
        var email = req.body.email;
        var password = req.body.password;
        //
        password = crypto.createHash('md5').update(password).digest("hex");
        //
        var data = {
            "email":email,
            "password":password
        };
        //
        safetee['users'].find({email:data.email, password:data.password}, function(err, checkuser) {
            //
            if (checkuser.length > 0) {
                //
                console.log(JSON.stringify(checkuser));
                //
                return_data = {
                    success:1,
                    message:safetee_response.getresponse['user_signin']('success'),
                    info: JSON.stringify(checkuser)
                };
                //
                safetee_response.returnresponse['send'](return_data,res);
                //
            }else{
                //
                console.log(safetee_response.getresponse['user_signin']('notfound'));
                //
                return_data = {
                    status:0,
                    message:safetee_response.getresponse['user_signin']('notfound')
                }
                //
                safetee_response.returnresponse['send'](return_data,res);
            }
        });
            //
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

    }
});