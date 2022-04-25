const router = require('express').Router();
// import packaged api routes
const apiRoutes = require('./api');
const homeRoutes = require('./home.routes');

// prefixing the packaged group of api endpoints with the path /api
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// recieve 404 error if making a request to an endpoint that doesn't exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;