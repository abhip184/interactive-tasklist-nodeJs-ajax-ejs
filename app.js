var express = require('express')
var todoController = require('./controllers/todoController');

var app = express();

//set up templete engine
app.set('view engine', 'ejs');

//stactcs
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listening port
app.listen(5000);
console.log(' listen on 5000 port');


