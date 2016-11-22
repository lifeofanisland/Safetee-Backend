var safetee_buffer = require('../../../models/Safetee_Head_Buffer');
//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function (req, res) {
        //
        if (req.body && req.body.email && typeof req.body.email !== 'undefined') {
            //
            var name = req.body.name;
            var email = req.body.email;
            //
            var data = {
                name: name,
                email: email,
                created: safetee_buffer.safetee.datetimenow

            };
            //
            safetee_buffer.safetee['subscribers'].find({email: data.email}, function (err, checkuser) {
                //
                if (checkuser.length > 0) {
                    //
                    console.log(JSON.stringify(checkuser));
                    //
                    console.log(safetee_buffer.safetee_response.getresponse['subscribe']('exists'));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 0,
                        message: safetee_buffer.safetee_response.getresponse['subscribe']('exists')
                    };
                    //
                    safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
                    //
                } else {
                    //
                    safetee_buffer.safetee['subscribers'].create(data, function (err, newuser) {
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
                            console.log(safetee_buffer.safetee_response.getresponse['subscribe']('success'));
                            //
                            safetee_buffer.safetee_return_data = {
                                success: 1,
                                message: safetee_buffer.safetee_response.getresponse['subscribe']('success'),
                                info: JSON.stringify(newuser)
                            };
                            //
                            safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
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
