const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// Users have many Blogs
User.hasMany(Blog);

// Users have many Comments
User.hasMany(Comment);

// Comments belong to User
Comment.belongsTo(User);

// Blogs have many Comments
Blog.hasMany(Comment);

// Comments belong to Blog
Comment.belongsTo(Blog);

module.exports = { User, Blog, Comment };