var config = {};

config.recurrance = {};
config.server = {};
config.params = {};

config.minutesToRecord =  10;
config.recurrance.hour = 15;
config.recurrance.minute = 30;
config.recurrance.second = 0;
config.recurrance.dayOfWeek = 5;
config.server.url = '<url>';
// Optional Parameters
config.params.foo = 'bar';

module.exports = config;