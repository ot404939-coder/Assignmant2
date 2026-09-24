const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/', commentController.createComments);
router.post('/find-or-create', commentController.findOrCreateComment);
router.patch('/:commentId', commentController.updateComment);
router.get('/search', commentController.searchComments);
router.get('/newest/:postId', commentController.getNewestComments);
router.get('/details/:id', commentController.getCommentDetails);

module.exports = router;
