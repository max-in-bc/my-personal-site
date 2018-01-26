'use strict';
module.exports = function(app) {
    var passwordCtrl = require('../controllers/passwordController');

    // Routes
    app.route('/password')
        .get(passwordCtrl.check_passwords);
};
