const router = require('express').Router();
// import user routes
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;