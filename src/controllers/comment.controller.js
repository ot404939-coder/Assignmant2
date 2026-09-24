const { Op } = require('sequelize');
const { Comment, User, Post } = require('../models');

exports.createComments = async (req, res) => {
  try {
    const { comments } = req.body;

    await Comment.bulkCreate(comments);

    res.status(201).json({ message: 'comments created.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'comment not found.' });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this comment.' });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: 'Comment updated.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content }
    });

    res.status(200).json({ comment, created });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchComments = async (req, res) => {
  try {
    const { word } = req.query;

    const result = await Comment.findAndCountAll({
      where: {
        content: { [Op.like]: `%${word}%` }
      }
    });

    if (result.count === 0) {
      return res.status(404).json({ message: 'no comments found.' });
    }

    res.status(200).json({ count: result.count, comments: result.rows });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getNewestComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
      limit: 3
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCommentDetails = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Post, as: 'post', attributes: ['id', 'title', 'content'] }
      ]
    });

    if (!comment) {
      return res.status(404).json({ message: 'no comment found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
