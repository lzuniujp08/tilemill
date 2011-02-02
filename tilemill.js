require.paths.unshift(
    __dirname + '/lib/node',
    __dirname + '/server',
    __dirname + '/shared',
    __dirname
);

var express = require('express'),
    settings = require('settings');

var app = module.exports = express.createServer();

app.use(express.bodyDecoder());
app.use(express.staticProvider('client'));
app.use(express.staticProvider('shared'));

require('api')(app, settings);
require('tiles')(app, settings);
require('export')(app, settings);
require('bootstrap')(app, settings);

app.error(function(err, req, res){
    res.send(err, 500);
});

if (app.settings.env !== 'test') {
    app.listen(settings.port);
    console.log('Started TileMill on port %d.', settings.port);
}
