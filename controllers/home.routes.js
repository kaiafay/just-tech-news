// import necessary dependencies 
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          // loop over and map each sequelize object into a serialized version of itself and save into a new array
          // sequelize returns a sequelize object with a lot of information attached  
          // sequelize's get() method allows us to serialize the object down to only the properties we need   
          const posts = dbPostData.map(post => post.get({ plain: true}));
          // pass a single post object into the homepage template
          res.render('homepage', { posts });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;