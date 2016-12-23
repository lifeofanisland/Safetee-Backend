var request = require('request');
//
var send_sms = ({
    //
    config: function () {
        //
        var config = {
            url: 'https://api.infobip.com',
            username: 'Trulo',
            password: '{trulo16}',
            end_points: {
                single: '/sms/1/text/single',
                multiple: '/sms/1/text/multi'
            }
        }
        //
        return config;
    },
    //
    transport:function (from, to, text) {
        //
        var encoded_credents = new Buffer(this.config().username + ':' + this.config().password).toString('base64');
        //
        var to_;
        //
        if (to.indexOf("+234") !== -1){
            to_ = to;
        }else{
            //
            var to__ = to;
            while(to__.charAt(0) === '0') {
                to__ = to__.substr(1);
            }
            //
            to_ = '+234'+to__;
        }
        //
        var data_to_transport = JSON.stringify(
            {
                from: from,
                to: to_,
                text: text
            }
        )
        request({
            url: this.config().url + this.config().end_points.single,
            method: 'POST',
            headers: {
                content_type: "application/json",
                Authorization: "Basic " + encoded_credents,
                Accept: "application/json"
            },
            body: data_to_transport

        },
        //
        function (err, response, body) {
            console.log(JSON.stringify(body) + response.statusCode);
        });
        //
    }
    //
});

//
var sms_messages = ({
    //
    verifyphone: function (req) {
        //
        return 'Your phone number was verified successfully, your verification code is '+req;
        //
    }
})
//
var service_name = ({
    //
    global: function () {
        //
        return 'Safetee';
    },

    verify: function () {
        //
        return 'Safetee Beta';
    }

})
//
var sms_from = ({
    //
    global: function () {
        //
        return 'Safetee';
    },

     verify: function () {
        //
        return 'Safetee Beta';
    }
})
//
var customer_support = ({
    //
    global: function () {
        //
        return '';
    },
    //
    email: function (){
        //
        return 'hello@getsafetee.com';
    }
})
//
module.exports = {
    sms_shoot: send_sms,
    sms_message: sms_messages,
    sms_sender: sms_from
}
