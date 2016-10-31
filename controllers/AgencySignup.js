var BaseController = require("./Base");
var crypto = require("crypto");
var safetee = require("../models/Safetee");
var safetee_response = require('../models/SafeteeResponse');
var globalname = "Sign up";

module.exports = BaseController.extend({
    //
    run: function(req, res, next) {
        //
            self.form(req, res, function(formMarkup) {
                //
                safetee_response.returnresponse['render'](req,'signup',{
                    title: globalname,
                    form:formMarkup,
                    showformornot:'block'
                },res);
                //
            });
    },
    form: function(req, res, callback) {
        //
        if(req.body && req.body.formsubmitted && req.body.formsubmitted == 'yes') {
           //
            var type = req.body.agencytype;
            var title = req.body.agencytitle;
            var name = req.body.agencyname;
            var phone_no = req.body.agencyphone;
            var email = req.body.agencyemail;
            var password = req.body.agencypassword;
            var address = req.body.agencyaddress;
            var about = req.body.agencyabout;
            var website = req.body.website;
            var facebook = req.body.facebook;
            //
            password = crypto.createHash('md5').update(password).digest("hex");
            //
            var data = {type:type,
                name:title,
                contact_person:name,
                contact_email:email,
                contact_phone:phone_no,
                website:website,
                facebook:facebook,
                about:about,
                address:address,
                password:password,
                created:safetee.datetimenow,
                auth:0
            };
            //
            safetee['agents'].find({contact_email:data.email}, function(err, checkagent) {
                //
                if (checkagent.length > 0) {
                    //
                    console.log(JSON.stringify(checkagent));
                    //
                    console.log(safetee_response.getresponse['user_signup']('exists'));
                    //
                    return_data = {
                        success: 0,
                        message: safetee_response.getresponse['user_signup']('exists')
                    };
                    //
                    safetee_response.returnresponse['render'](req,'signup',{
                        title: globalname,
                        returninfo:return_data.message,
                        showformornot:'block'
                    },res);
                    //
                }else{
                    //
                    safetee['agents'].create(data, function(err, newagent) {
                        //
                        if(err){
                            //
                            safetee_response.returnresponse['render'](req,'signup',{
                                title: globalname,
                                returninfo:safetee_response.getresponse['error'](req),
                                showformornot:'none'
                            },res);
                            //
                        }else {
                            //
                            safetee_response.returnresponse['render'](req,'signup',{
                                title: globalname,
                                returninfo:safetee_response.getresponse['user_signup']('success_agency'),
                                showformornot:'none'
                            },res);
                        }
                        });
                }
            });

        }else{
            //
            callback('');
        }
    }
});