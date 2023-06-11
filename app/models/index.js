const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User model associations
User.hasMany(Comment, {
    onDelete: 'CASCADE' // Add onDelete CASCADE behavior
  });
  User.hasMany(Blog, {
    onDelete: 'CASCADE' // Add onDelete CASCADE behavior
  });
  
  // Comment model associations
  Comment.belongsTo(User, {
    onDelete: 'CASCADE' // Add onDelete CASCADE behavior
  });
  Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE' // Add onDelete CASCADE behavior
  });
  
  // Blog model associations
  Blog.belongsTo(User, {
    onDelete: 'CASCADE' // Add onDelete CASCADE behavior
  });
  Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE' // Add onDelete CASCADE behavior
  });

module.exports = { User, Blog, Comment };



