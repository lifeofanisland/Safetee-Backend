var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

//

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function (req, res) {
        //
        if (req.body && req.body.uid && typeof req.body.uid !== 'undefined' && req.body.password && typeof req.body.password !== 'undefined') {
            //
            var uid = req.body.uid;
            var phone_no = req.body.phone_no;
            var email = req.body.email;
            var password = req.body.password;
            //
            password = safetee_buffer.safetee_crypto.createHash('md5').update(password).digest("hex");
            //
            var data = {
                "phone_no": phone_no,
                "email": email
            };
            //
            safetee_buffer.safetee['users'].find({_id: uid, password: password}, function (err, checkuser) {
                //
                if (checkuser.length < 1) {
                    //
                    console.log(JSON.stringify(checkuser));
                    //
                    console.log(safetee_buffer.safetee_response.getresponse['user_setting']('notfound'));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 0,
                        message: safetee_buffer.safetee_response.getresponse['user_setting']('notfound')
                    };
                    //
                    safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                    //
                } else {
                    //
                    safetee_buffer.safetee['users'].update({_id: uid},data, function (err, user) {
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
                            console.log(safetee_buffer.safetee_response.getresponse['user_setting']('success') + JSON.stringify(user));
                            //
                            safetee_buffer.safetee['users'].find({_id: uid}, function(err, guser) {
                                //
                                safetee_buffer.safetee_return_data = {
                                    success: 1,
                                    message: safetee_buffer.safetee_response.getresponse['user_setting']('success'),
                                    uid: guser[0]._id,
                                    fullname: guser[0].name,
                                    email: guser[0].email,
                                    phone_no: guser[0].phone_no,
                                    sex: guser[0].sex
                                };
                                //
                                safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                            });
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
            safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
        }

    }
});
