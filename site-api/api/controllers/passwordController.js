'use strict';
const HARDCODED_PASSWORD = process.env.RESUME_PASSWORD || 'ANYPASSWORD';

//Checks given request against the password for the full resume
exports.check_passwords = function(req, res) {

    var allowedOrigins = ['http://0.0.0.0:8081', 'http://localhost:8081', 'http://0.0.0.0','http://localhost',
        'http://maxgardiner.ca', 'https://maxgardiner.ca', 'http://torontoweb.ninja','https://torontoweb.ninja'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    else{
        res.setHeader('Access-Control-Allow-Origin', "http://0.0.0.0");
    }

    //if there is an error
    if ( req.query.attempted_password == null){
        res.json({results: -1});
    }
    else{
        //check for password
        if (req.query.attempted_password === HARDCODED_PASSWORD){
            res.json({results: 1});
        }
        else{
            res.json({results: 0});
        }
    }

};


