'use strict';

//
// var mongoose = require('mongoose'),
//     Task = mongoose.model('Tasks');

//Checks given request against the password for the full resume
exports.check_passwords = function(req, res) {
    //if there is an error
    if (req == null || req.attempted_password == null){
        res.json({ results: -1 });
    }

    //check for password
    if (req.attempted_password === 'sog'){
        res.json({ results: 0 });
    }
    else{
        res.json({ results: -1 });
    }
};

// exports.list_all_tasks = function(req, res) {
//     Task.find({}, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
//
//
// exports.create_a_task = function(req, res) {
//     var new_task = new Task(req.body);
//     new_task.save(function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.read_a_task = function(req, res) {
//     Task.findById(req.params.taskId, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.update_a_task = function(req, res) {
//     Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.delete_a_task = function(req, res) {
//
//
//     Task.remove({
//         _id: req.params.taskId
//     }, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Task successfully deleted' });
//     });
// };
//
