'use strict';
module.exports = function(app) {
    var resumeCtrl = require('../controllers/resumeController');

    app.route('/fullresume')
        .get(resumeCtrl.get_full_resume);
};
