const router = require('express').Router();
const { Post, User } = require('../../models');

// get all posts
router.get('/', (req, res) => {
    console.log('===================');
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        // include the JOIN to the User table
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;