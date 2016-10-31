var BaseController = require("./Base");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var crypto = require("crypto");
var globalname = "Sign up";
var return_data = '';
//
module.exports = BaseController.extend({
    //
    run: function (req, res) {
        //
        if (req.body && req.body.form && req.body.form == 'go') {
            //
            var name = req.body.name;
            var phone_no = req.body.phone_no;
            var email = req.body.email;
            var sex = req.body.sex;
            var password = req.body.password;
            var location = req.body.location;
            //
            password = crypto.createHash('md5').update(password).digest("hex");
            //
            var data = {
                "name": name,
                "phone_no": phone_no,
                "email": email,
                "sex": sex,
                "password": password,
                "location": location,
                "created": safetee.datetimenow
            };
            //
            safetee['users'].find({email:data.email}, function (err, checkuser) {
                //
                if (checkuser.length > 0) {
                    //
                    console.log(JSON.stringify(checkuser));
                    //
                    console.log(safetee_response.getresponse['user_signup']('exists'));
                    //
                    return_data = {
                        success: 0,
                        message: safetee_response.getresponse['user_signup']('exists')
                    };
                    //
                    safetee_response.returnresponse['send'](return_data,res);
                    //
                } else {
                    //
                    safetee['users'].create(data, function (err, newuser) {
                        //
                        if(err){
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
                            console.log(safetee_response.getresponse['user_signup']('success'));
                            //
                            return_data = {
                                success: 1,
                                message: safetee_response.getresponse['user_signup']('success'),
                                info: JSON.stringify(newuser)
                            };
                            //
                            safetee_response.returnresponse['send'](return_data,res);
                        }
                    });
                }
            });
        } else {
            //
            console.log(safetee_response.getresponse['no_form_data'](req));
            //
            return_data = {
                success: 0,
                message: safetee_response.getresponse['no_form_data'](req)
            };
            //
            safetee_response.returnresponse['send'](return_data,res);
        }

    }
});