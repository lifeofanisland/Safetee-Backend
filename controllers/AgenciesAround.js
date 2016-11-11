var safetee_buffer = require('../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req) {
        //
        safetee_buffer.safetee['agents'].find({type:req.params.id},function(err, agencies) {
            //
            safetee_buffer.safetee_response.returnresponse['send'](agencies);
        });
        //
    }
});
