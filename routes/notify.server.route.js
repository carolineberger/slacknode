const logger = require('../services/logger.server.service').activate();
const notifier = require('node-notifier');
const socketService = require('../services/socket');

const express = require('express');

module.exports = {
    activate: function(apiRouter) {
        const notRouter = express.Router();
        notRouter.route('/')
        .post(function (req, res) {
            const message = req.body.message;
            // notifier.notify({
            //     'title': 'Test notification',
            //     'message': req.body.message
            // });
            socketService.notifyAllSockets(message);
            res.status(200).json({message: 'Success'});
        });
        apiRouter.use('/notification', notRouter);
    },
    path: '/api/notification',
    methods: 'POST'
}

