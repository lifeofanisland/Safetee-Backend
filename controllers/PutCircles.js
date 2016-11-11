var safetee_buffer = require('../models/Safetee_Head_Buffer');

//

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function (req, res) {
        //
        if (req.body && req.body.sender && typeof req.body.sender !== 'undefined' && req.body.circle && typeof req.body.circle !== 'undefined') {
            //
            var sender = req.body.sender;
            var circle = req.body.circle;
            //
            var data = {

            };
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
                    console.log(safetee_buffer.safetee_response.getresponse['put_circle']('success'));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 1,
                        message: safetee_buffer.safetee_response.getresponse['put_circle']('success'),
                        info: JSON.stringify(newuser)
                    };
                    //
                    safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data, res);
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
