const PageviewController = require('../controllers/PageviewController');

module.exports = (app) => {
    app.get('/v1/graph-facebook/receive', PageviewController);
};