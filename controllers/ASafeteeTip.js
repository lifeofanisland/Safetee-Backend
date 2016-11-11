var safetee_buffer = require('../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res) {
        //
        safetee_buffer.safetee['tips'].find({_id:req.params.id},function(err, tip) {
            //
            if(tip.length > 0) {
                //
                safetee_buffer.safetee_response.returnresponse['send'](tip);
            }else{
                //
                safetee_buffer.safetee_return_data = {
                    success: 0,
                    message: safetee_buffer.safetee_response.getresponse['no_content'](req)
                };
                //
                safetee_buffer.safetee_response.returnresponse['send'](safetee_buffer.safetee_return_data,res);
            }
        });
        //
    }
});

