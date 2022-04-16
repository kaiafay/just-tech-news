const router = require('express').Router();
// import packaged api routes
const apiRoutes = require('./api');

// prefixing the packaged group of api endpoints with the path /api
router.use('/api', apiRoutes);
// recieve 404 error if making a request to an endpoint that doesn't exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;