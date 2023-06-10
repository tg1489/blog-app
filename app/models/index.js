const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User model
User.hasMany(Comment);
User.hasMany(Blog);

// Comment model
Comment.belongsTo(User);
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });

// Blog model
Blog.belongsTo(User);
Blog.hasMany(Comment, { foreignKey: 'blog_id' });

module.exports = { User, Blog, Comment };
