var safetee_buffer = require('../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req) {
        //
        safetee_buffer.safetee['tips'].find({_id:req.params.id},function(err, tip) {
            //
            safetee_buffer.safetee_response.returnresponse['send'](tip);
        });
        //
    }
});

