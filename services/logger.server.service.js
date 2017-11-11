const winston = require('winston');

module.exports = {
    activate: function() {
        winston.setLevels(winston.config.syslog.levels);
        const transport = new (winston.transports.Console)({
            colorize: true,
            timestamp: true,
            prettyPrint: true
        });
        return new (winston.Logger)({
            transports: [transport]
        });
    }
}