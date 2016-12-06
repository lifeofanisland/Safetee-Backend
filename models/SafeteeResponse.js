//
var ReturnResponse_ = ({
    //
    send: function (req, res) {
        //
        console.log(JSON.stringify(req));
        //
        res.send(JSON.stringify(req));
    },
    //
    render: function (req, page, initials, res) {
        //
        res.render(
            page,
            initials
        )
    },
    //
    redirect: function (req, page, res) {
        //
        res.redirect(page);
    }
});
//
var GetResponse_ = ({
    //
    no_form_data: function (req) {
        //
        return 'No form data sent';
    },
   //
    error: function (req) {
        //
        return 'Aw! snap, an error was encountered';
    },
    //
    no_content: function () {
        //
        return 'Oh! snap, no content available for this query';
    },
    //
    user_signup: function (req) {
        //
        switch (req){
            case 'title':
                return 'Create new acccount';
            break;
            case 'exists':
                return 'User with email address exists already';
            break;
            case 'success':
                return 'Account was created';
            break;
            case 'success_agency':
                return 'Account was successfully created, we will get in touch as soon as we are done reviewing your submitted data.';
            break;
        }
    },
    //
    user_signin: function (req) {
        //
        switch (req){
            case 'title':
                return 'Please log in';
                break;
            case 'notfound':
                return 'incorrect login credentials';
                break;
            case 'success':
                return 'user account exists';
                break;
        }
    },
    //
    user_setting: function (req) {
        //
        switch (req){
            case 'title':
                return 'Settings';
                break;
            case 'notfound':
                return 'incorrect password';
                break;
            case 'success':
                return 'changes were made successfully';
                break;
        }
    },
    //
    new_record: function (req) {
        //
        switch (req){
            case 'success':
                return 'Record successfully sent';
                break;
        }
    },
    //
    new_report: function (req) {
        //
        switch (req){
            case 'success':
                return 'Report successfully sent';
                break;
        }
    },
    //
    page_title:function (req) {
        //
        switch (req){
            case 'index':
                return 'Welcome to Safetee';
            break;
        }
    },
    //
    put_circle: function (req) {
        //
        switch (req){
            case 'success':
                return 'Circle(s) added successfully';
            break;
        }
    },
    //
    subscribe: function (req) {
        //
        switch (req){
            case 'success':
                return 'You are subscribed successfully';
            break;
            case  'exists':
                return 'You are subscribed already';
            break;
        }
    },
    //
    donate: function (req) {
        //
        switch (req){
            case 'success':
                return 'Donation was successful';
                break;
        }
    }
});

module.exports = ({
    returnresponse:ReturnResponse_,
    getresponse:GetResponse_
});