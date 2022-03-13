const apidata = require('./users');
const constructerMethod = (app) => {
    app.use('/api/people', apidata);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};
module.exports = constructerMethod;
