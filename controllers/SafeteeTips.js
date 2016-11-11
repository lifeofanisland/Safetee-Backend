var safetee_buffer = require('../models/Safetee_Head_Buffer');

//
module.exports = safetee_buffer.safetee_base_controller.extend({
    //
    run: function() {
        //
        safetee_buffer.safetee['tips'].find({},function(err, tips) {
            //
            safetee_buffer.safetee_response.returnresponse['send'](tips);
        });
        //
    }
});

