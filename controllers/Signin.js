var safetee_buffer = require('../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    run: function(req, res) {
        //
        if(req.body && req.body.form && req.body.form == 'go') {
        //
        var email = req.body.email;
        var password = req.body.password;
        //
        password = safetee_buffer.safetee_crypto.createHash('md5').update(password).digest("hex");
        //
        var data = {
            "email":email,
            "password":password
        };
        //
            safetee_buffer.safetee['users'].find({email:data.email, password:data.password}, function(err, checkuser) {
            //
            if (checkuser.length > 0) {
                //
                console.log(JSON.stringify(checkuser));
                //
                safetee_buffer.safetee_return_data = {
                    success:1,
                    message:safetee_buffer.safetee_response.getresponse['user_signin']('success'),
                    info: JSON.stringify(checkuser)
                };
                //
                safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
                //
            }else{
                //
                console.log(safetee_buffer.safetee_response.getresponse['user_signin']('notfound'));
                //
                safetee_buffer.safetee_return_data = {
                    status:0,
                    message:safetee_buffer.safetee_response.getresponse['user_signin']('notfound')
                }
                //
                safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
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