const logger = require('./services/logger.server.service').activate();
const notificationRoute = require('./routes/notify.server.route');

module.exports = {
    activate: function(apiRouter) {
        apiRouter.route('/')
        .get(function (req, res) {
                res.status(200).json({message: 'Welcome to the API!'});
        });
        
        notificationRoute.activate(apiRouter);
        logger.info(`ACTIVATED: Notification route on path ${notificationRoute.path} with methods ${notificationRoute.methods}`);

    },
    path: '/api',
    methods: 'GET'
}