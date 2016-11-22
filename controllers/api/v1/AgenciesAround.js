var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res) {
        //
        safetee_buffer.safetee['agents'].find({type:req.params.id},function(err, agencies) {
            //
            if(agencies.length > 0) {
                //
                safetee_buffer.safetee_response.returnresponse['send'](agencies);
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
