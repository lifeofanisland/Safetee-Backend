var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

//

module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function (req, res) {
        //
        if (req.body && req.body.donor && typeof req.body.donor !== 'undefined' && req.body.amount && typeof req.body.amount !== 'undefined') {
            //
            var donor = req.body.donor;
            var recipient = req.body.recipient;
            var amount = req.body.amount;
            //
            var data = {
                donor: donor,
                recipient: recipient,
                amount: amount,
                created: safetee_buffer.safetee.datetimenow
            };
            //
            safetee_buffer.safetee['donations'].create(data, function (err, newdonor) {
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
                    console.log(safetee_buffer.safetee_response.getresponse['donate']('success'));
                    //
                    safetee_buffer.safetee_return_data = {
                        success: 1,
                        message: safetee_buffer.safetee_response.getresponse['donate']('success'),
                        info: JSON.stringify(newdonor)
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

