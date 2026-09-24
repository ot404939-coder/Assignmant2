const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Post = require('./post.model')(sequelize, DataTypes);
db.Comment = require('./comment.model')(sequelize, DataTypes);

db.User.hasMany(db.Post, { foreignKey: 'userId', as: 'posts' });
db.Post.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Post.hasMany(db.Comment, { foreignKey: 'postId', as: 'comments' });
db.Comment.belongsTo(db.Post, { foreignKey: 'postId', as: 'post' });

db.User.hasMany(db.Comment, { foreignKey: 'userId', as: 'comments' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
