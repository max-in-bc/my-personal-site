var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'); //for parsing request bodies

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var resumeRoutes = require('./api/routes/resumeRoutes'); //importing route
resumeRoutes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);