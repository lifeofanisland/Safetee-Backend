var safetee_buffer = require('../models/Safetee_Head_Buffer');

//

module.exports = safetee_buffer.safetee_base_controller.extend({
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
            password = safetee_buffer.safetee_crypto.createHash('md5').update(password).digest("hex");
            //
            var data = {
                "name": name,
                "phone_no": phone_no,
                "email": email,
                "sex": sex,
                "password": password,
                "location": location,
                "created": safetee_buffer.safetee.datetimenow
            };
            //
            safetee_buffer.safetee['users'].find({email:data.email}, function (err, checkuser) {
                //
                if (checkuser.length > 0) {
                    //
                    console.log(JSON.stringify(checkuser));
                    //
                    console.log(safetee_buffer.safetee_response.getresponse['user_signup']('exists'));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 0,
                        message: safetee_buffer.safetee_response.getresponse['user_signup']('exists')
                    };
                    //
                    safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
                    //
                } else {
                    //
                    safetee_buffer.safetee['users'].create(data, function (err, newuser) {
                        //
                        if(err){
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
                            console.log(safetee_buffer.safetee_response.getresponse['user_signup']('success'));
                            //
                            safetee_buffer.safetee_return_data = {
                                success: 1,
                                message: safetee_buffer.safetee_response.getresponse['user_signup']('success'),
                                info: JSON.stringify(newuser)
                            };
                            //
                            safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
                        }
                    });
                }
            });
        } else {
            //
            console.log(safetee_buffer.safetee_response.getresponse['no_form_data'](req));
            //
            safetee_buffer.safetee_return_data = {
                success: 0,
                message: safetee_buffer.safetee_response.getresponse['no_form_data'](req)
            };
            //
            safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
        }

    }
});