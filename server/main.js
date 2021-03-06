var express = require('express');

var app = new express();

var parser = require('body-parser');

var React = require('react/addons');

var TaskItem = require('./models/TaskItem.js');

require('./database.js');

require('babel/register');

app.get('/', function (req, res) {
    //res.render('./../app/index.ejs',{});
    var application =
        React.createFactory(require('./../app/components/TaskItemList.jsx'));

    TaskItem.find(function (error, doc) {
        var generated = React.renderToString(application({
            items: doc
        }))
        res.render('./../app/index.ejs', { reactOutput: generated });
    })

})
    .use(express.static(__dirname + '/../.tmp'))
    .listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/items.js')(app);