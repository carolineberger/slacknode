const logger = require('../services/logger.server.service').activate();
const sockets = [];
module.exports = {
    activate: function(app) {
        const socketServer = require('http').createServer(app);
        const io = require('socket.io')(socketServer);
        io.on('connection', function(socket) {
            logger.info('New client connected!');
            sockets.push(socket);
            socket.on('disconnect', function() {
                logger.info('Client disconnected');
                sockets.splice(sockets.indexOf(socket), 1);
            });
        });
        socketServer.listen(3001);
    },
    notifyAllSockets: function(message) {
        for (let socket of sockets) {  
            socket.emit('notify', message);;
        }
    }
}