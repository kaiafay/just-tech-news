const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access the User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        // return all users in JSON format
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            // if error, return status 500
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    // findOne() method searches for a user with the corresponding id
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    // create() method will create a user based off input for username, email, and password
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // if req.body has exact key/value pairs to match the model, use 'req.body'
    // pass in req.body to provide the new data for the update
    User.update(req.body, {
        individualHooks: true,
        where: {
            // req.params.id indicates where the new data should be used
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;