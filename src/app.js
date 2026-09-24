const express = require('express');

const userRoutes = require('./routes/user.routes');
const singleUserRoutes = require('./routes/singleUser.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/user', singleUserRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

module.exports = app;
