var safetee_buffer = require('../../../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req, res) {
        //
        safetee_buffer.safetee['records'].find({uid:req.params.id},function(err, records) {
            //
            if(records.length > 0) {
                //
                safetee_buffer.safetee_response.returnresponse['send'](records,res);
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