var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore(
    {
        uri: 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/safeteedb',
        collection: 'mySessions',
        clear_interval: 3600
    });
//
var Index = require('./controllers/Index');
var Signup = require('./controllers/Signup');
var Signin = require('./controllers/Signin');
var AgencySignup = require('./controllers/AgencySignup');
var AgencySignin = require('./controllers/Dashboard');
var AgencySignout = require('./controllers/AgencySignout');
var NewRecord = require('./controllers/NewRecord');
var AudioUpload = require('./controllers/AudioUpload');
var Records = require('./controllers/Records');
var ARecord = require('./controllers/ARecord');
var RecordStream = require('./controllers/RecordStream');
var TakeLeaveCase = require('./controllers/TakeLeaveCase');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('safetee-backend'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'safetee_backend_rocks_onMicassa_!!!!',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    },
    store: store,
    resave: false,
    saveUninitialized: true
}));
//
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/safeteedb', function (err, db) {
    if (err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {

        //
        app.all('/', function (req, res, next) {
            Index.run(req, res, next);
        });
        app.all('/user/signup', function (req, res, next) {
            Signup.run(req, res, next);
        });
        app.all('/user/login', function (req, res, next) {
            Signin.run(req, res, next);
        });
        app.all('/agency/signup', function (req, res, next) {
            AgencySignup.run(req, res, next);
        });
        app.all('/agency/dashboard', function (req, res, next) {
            AgencySignin.run(req, res, next);
        });
        app.all('/agency/logout', function (req, res, next) {
            AgencySignout.run(req, res, next);
        });
        app.all('/agency/record', function (req, res, next) {
            RecordStream.run(req, res, next);
        });
        app.all('/agency/takeleavecase', function (req, res, next) {
            TakeLeaveCase.run(req, res, next);
        });
        app.all('/record/add', function (req, res, next) {
            NewRecord.run(req, res, next);
        });
        app.all('/audio/upload', function (req, res, next) {
            AudioUpload.run(req, res, next);
        });
        app.all('/records/get/:id', function (req, res, next) {
            Records.run(req, res, next);
        });
        app.all('/record/:id', function (req, res, next) {
            ARecord.run(req, res, next);
        });
        http.createServer(app).listen(app.get('port'), function () {
            console.log(
                'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
                '\nServer listening on port 3000'
            );
        });
    }
});