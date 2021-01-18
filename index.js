/*
 * @created 18/01/2021 - 8:43 PM
 * @project two
 * @author  dennis joel
*/

const server = require('./lib/server');

const app = {};

app.init = () => {
    server.init();
};

app.init();

module.exports = app;
