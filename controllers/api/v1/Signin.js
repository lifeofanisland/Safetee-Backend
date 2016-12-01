var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    run: function(req, res) {
        //
        if(req.body && req.body.email && typeof req.body.email !== 'undefined' && req.body.password &&  typeof req.body.password !== 'undefined') {
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
                    uid: checkuser[0]._id,
                    fullname: checkuser[0].name,
                    email: checkuser[0].email,
                    phone_no: checkuser[0].phone_no,
                    sex: checkuser[0].sex
                };
                //
                safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
                //
            }else{
                //
                console.log(safetee_buffer.safetee_response.getresponse['user_signin']('notfound'));
                //
                safetee_buffer.safetee_return_data = {
                    success:0,
                    message:safetee_buffer.safetee_response.getresponse['user_signin']('notfound')
                };
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