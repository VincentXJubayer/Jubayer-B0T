const chalk = require('chalk');

module.exports = (message, type) => {
    switch (type) {
        case 'warn':
            console.log(chalk.bold.hex('#FF00FF')('[ Error ] » ') + message);
            break;
        case 'error':
            console.log(chalk.bold.hex('#ff334b')('[ Error ] » ') + message);
            break;
        default:
            console.log(chalk.bold.hex('#FF0000')(type + ' » ') + message);
            break;
    }
};

module.exports.loader = (message, type) => {
    switch (type) {
        case 'log':
            console.log(chalk.bold.hex('#b4ff33')('[ JUBAYER AHMED ] » ') + message);
            break;
        case 'error':
            console.log(chalk.bold.hex('#ff334b')('[ Error ] » ') + message);
            break;
        default:
            console.log(chalk.bold.hex('#33ffc9')('[ JUBAYER AHMED ] » ') + message);
            break;
    }
};
