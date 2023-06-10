const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// GET
exports.home = async (req, res) => {
  try {
    const authorizedAccess = req.session.logged_in;
    if (!authorizedAccess) {
      res.render('guest');
    } else {
      const users = await User.findAll({attributes: ['username', 'dateComment'],});
      const blogs = await Blog.findAll({attributes: ['title', 'paragraph', 'date']});
      const comments = await Comment.findAll({attributes: ['comment']});

      const serializedUsers = users.map(user => user.get({ plain: true }));
      const serializedBlogs = blogs.map(blog => blog.get({ plain: true }));
      const serializedComments = comments.map(comment => comment.get({ plain: true }));

      console.log(serializedUsers);
      console.log(serializedBlogs);
      console.log(serializedComments);

      res.status(200).render('homeId', {
        layout: 'home',
        user: authorizedAccess,
        username: req.session.username,
        serializedUsers,
        serializedBlogs,
        serializedComments,
      });
    }
  } catch (err) {
    console.log(err); // Check the error message
    res.status(500).json(err);
  }
};






exports.getGuest = async (req, res) => {
  try {
    const authorizedAccess = req.session.logged_in;
    // If NOT logged in:
    if (!authorizedAccess) {

      const users = await User.findAll({attributes: ['username', 'dateComment'],});
      const blogs = await Blog.findAll({attributes: ['title', 'paragraph', 'date']});
      const comments = await Comment.findAll({attributes: ['comment']});

      const serializedUsers = users.map(user => user.get({ plain: true }));
      const serializedBlogs = blogs.map(blog => blog.get({ plain: true }));
      const serializedComments = comments.map(comment => comment.get({ plain: true }));

      res.status(200).render('guest', { 
        layout: 'guest', 
        serializedUsers,
        serializedBlogs,
        serializedComments,
        logCheck: true,
        });
    } 
    // If the user is logged in:
    else {
      
      const user = await User.findByPk(req.session.user_id);
      if (!user) {
        throw new Error('User not found');
      }
      res.status(200).render('dashboard', { layout: 'dash', username: req.session.username });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getLogin = async (req, res) => {
  try {

    res.status(200).render('login', {
      layout: 'login', 
      logged_in: req.session.logged_in, 
      user_id: req.session.user_id});
  }

  catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
}

exports.postLogin = async (req, res) => {
  
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // const primaryKey = await User.findOne({
    //   attributes: ['id'],
    //   where: { username: req.body.username }
    // });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect Username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect Username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.logout = async (req, res) => {
  // Logs out of session & redirects to home page
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      err ? res.status(500).json({ error : 'Internal service error.'}) : res.status(200).redirect('/'); 
    })
  }
}

exports.getRegister = async (req, res) => {
  try {
      const user = await User.findByPk(req.session.user_id);
      const serializedUser = user.get({ plain: true })
    res.status(200).render(
      "register", 
      { 
        layout: 'register',
        serializedUser,
        logged_in: req.session.logged_in, 
        user_id: req.session.user_id
      }
    );
    
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

exports.postRegister = async (req, res) => {

  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.logged_in = true;

        // res.redirect(`/home/${req.pa}`);
  
        // res.status(200).json({ user: newUser, message: "You are now logged in!" });
      });
} 
catch (err) {
    res.status(400).json(err);
}
}

exports.postHome = async (req, res) => {
  try {
    const authorizedAccess = req.session.logged_in;

    if (!authorizedAccess) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findByPk(req.session.user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { comment } = req.body;

    const newComment = await Comment.create({
      comment: comment,
      user_id: user.id,
    });
    res.status(200).json({ success: true, comment: newComment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    // Checks if user is logged in
    const authorizedAccess = req.session.logged_in;

    if (!authorizedAccess) {
      // User is not logged in, redirect to login page
      res.redirect('/login');
    } else {
      const user = await User.findByPk(req.session.user_id);
      const serializedUser = user.get({ plain: true })
      // User is logged in, render the dashboard page
      res.status(200).render('dashboard', { 
        layout: 'dash',
        serializedUser, 
        username: req.session.username,
      });
    }
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

exports.getBlog = async (req, res) => {
  try {

       // Checks if user is logged in
       const user = req.session.user_id;
       if (!user) {res.render('login', { layout: 'login'})}
       else {
        const user = await User.findByPk(req.session.user_id);
        const serializedUser = user.get({ plain: true })
        res.status(200).render('createBlog', { 
          layout: 'blog', 
          user: user, 
          serializedUser,
          username: req.session.username,
          logged_in: req.session.logged_in, 
          user_id: req.session.user_id });
      }
       }
  catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
}

exports.postBlog = async (req, res) => {
  try {

    // Get the logged-in user ID from the session
    const userId = req.session.user_id;

    // Check if the user is logged in
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create the blog entry and associate it with the user
    const blogData = await Blog.create({
      title: req.body.title,
      date: req.body.date,
      paragraph: req.body.paragraph,
    });

      res.status(200).json({ success: true, blogData });
      
  }
  catch (err) {
    res.status(400).json({ success: false, error: err });
  }
}

