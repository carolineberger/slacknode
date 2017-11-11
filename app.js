const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./services/logger.server.service').activate();
const routes = require('./routes');
const socketService = require('./services/socket');

const app = express();
const port  = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const apiRouter = express.Router();

routes.activate(apiRouter);
logger.info(`ACTIVATE: API Router on path ${routes.path} with methods ${routes.methods}`);

app.use('/api', apiRouter);

// Activate socket server
socketService.activate();

app.listen(port);
logger.info(`Server running on 127.0.0.1:${port}`);