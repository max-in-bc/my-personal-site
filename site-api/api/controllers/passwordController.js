'use strict';
const HARDCODED_PASSWORD = process.env.RESUME_PASSWORD || 'ANYPASSWORD';

//Checks given request against the password for the full resume
exports.check_passwords = function(req, res) {

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


