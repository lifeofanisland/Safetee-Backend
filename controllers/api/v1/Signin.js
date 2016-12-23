var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    run: function(req, res) {
        //
        if(req.body && req.body.phone_no && typeof req.body.phone_no !== 'undefined' && req.body.ccode && typeof req.body.ccode !== 'undefined') {
        //
        var phone_no = req.body.phone_no;
        var ccode = req.body.ccode || Math.floor(Math.random()*10)+1;
        //
        //password = safetee_buffer.safetee_crypto.createHash('md5').update(password).digest("hex");
        //
        var data = {
            "phone_no":phone_no
        };
        //
            safetee_buffer.safetee['users'].find({phone_no:data.phone_no}, function(err, checkuser) {
            //
            if (checkuser.length > 0) {
                //
                console.log(JSON.stringify(checkuser));
                //
                safetee_buffer.safetee_return_data = {
                    success:1,
                    message:safetee_buffer.safetee_response.getresponse['user_signin']('success'),
                    uid: checkuser[0]._id,
                    fullname: checkuser[0].name || "",
                    phone_no: checkuser[0].phone_no,
                    ccode: ccode

                };
                //
                safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
                //
            }else{
                //
                    safetee_buffer.safetee['users'].create(data, function (err, newuser) {
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
                            console.log(safetee_buffer.safetee_response.getresponse['user_signup']('success') + JSON.stringify(newuser));
                            //
                            safetee_buffer.safetee_return_data = {
                                success: 1,
                                message: safetee_buffer.safetee_response.getresponse['user_signup']('success'),
                                uid: newuser._id,
                                fullname: newuser.name || "",    
                                phone_no: newuser.phone_no,
                                ccode: ccode
                            };
                            //
                            safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                        }
                    });
            }
        });
            //
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

    }
});