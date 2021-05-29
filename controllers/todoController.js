var bodyParser = require('body-parser');
const mongoose = require('mongoose');

//var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'take notes' }]
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect(
  'mongodb+srv://dbUser:secrate@learning-cluster-gv442.mongodb.net/test?retryWrites=true&w=majority'
);
module.exports = function (app) {
  //create schema
  var todoSchema = new mongoose.Schema({
    item: String,
  });

  var Todo = mongoose.model('Todo', todoSchema);

  app.get('/todo', function (req, res) {
    //get data from mongo and pass it to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, function (req, res) {
    //get data from view and edit to monodb
    console.log(req.body);
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function (req, res) {
    //delete requested item
    Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
    /*  data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        })
        res.json(data); */
  });
};
