var safetee_buffer = require('../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function(req) {
        //
        safetee_buffer.safetee['agents'].find({_id:req.params.id},function(err, agency) {
            //
            safetee_buffer.safetee_response.returnresponse['send'](agency);
        });
        //
    }
});
