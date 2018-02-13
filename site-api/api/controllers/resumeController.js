'use strict';
var HARDCODED_PASSWORD = process.env.RESUME_PASSWORD || 'ANYPASSWORD';

//Checks given request against the password for the full resume
exports.get_full_resume = function(req, res) {

    var allowedOrigins = ['http://0.0.0.0:8081', 'http://localhost:8081', 'http://0.0.0.0','http://localhost',
        'http://maxgardiner.ca', 'https://maxgardiner.ca', 'http://torontoweb.ninja','https://torontoweb.ninja'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    else{
        res.setHeader('Access-Control-Allow-Origin', "http://0.0.0.0");
    }


    var fs = require('fs');

    //if there is an error return it
    if ( req.query.attempted_password == null){
        res.json({results: -1});
    }

    //otherwise check for password
    else{

        //if password is correct
        if (req.query.attempted_password === HARDCODED_PASSWORD){

            //send unencrypted resume
            fs.readFile('./full-resume.txt', 'utf8', function(err, data) {
                if (err) {
                    res.json({results: -1,
                        error: err});
                }
                else{
                    res.json({results: 1,
                              data: data});
                }
            });
        }

        //incorrect password
        else{
            res.json({results: 0});
        }
    }




};


