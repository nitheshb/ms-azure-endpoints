var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function TaskList(taskDao) {
  this.taskDao = taskDao;
}

module.exports = TaskList;
TaskList.prototype = {
    showTasks: function (req, res) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.completed=@completed',
            parameters: [{
                name: '@completed',
                value: false
            }]
        };

        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }

            res.render('index', {
                title: 'My ToDo List ',
                tasks: items
            });
        });
    },
    showMyGames: function (req, res) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r',
            parameters: [{
                name: '@completed',
                value: false
            }]
        };

        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
                res.send(items);
            // res.render('index', {
            //     title: 'My ToDo List ',
            //     tasks: items
            // });
        });
    },

    addTask: function (req, res) {
        var self = this;
        var item = req.body;

        self.taskDao.addItem(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });
    },
    addFantasyTeam: function (req, res) {
        // this will put the user saved fantasy team under the choosed fixture
        var self = this;
        var item = req.body;
        // user should send the below details in body

        // uid
        // team : []
        // cur_points: 0

        console.log("posted by user fantasy team", item);
        self.taskDao.addItem(item, function (err) {
            if (err) {
                throw (err);
            }
            console.log("added item is", item);
            res.json(item.id);
            
        });
    },

    completeTask: function (req, res) {
        var self = this;
        var completedTasks = Object.keys(req.body);


        async.forEach(completedTasks, function taskIterator(completedTask, callback) {
            self.taskDao.updateItem(completedTask, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
};