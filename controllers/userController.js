const { User, Blog, Comment } = require('../models');

exports.home = async (req, res) => {
  try {
    const authorizedAccess = req.session.logged_in;
    if (!authorizedAccess) {
      res.render('guest');
    } else {
      const blogs = await Blog.findAll({
        attributes: ['title', 'paragraph', 'date'],
        include: [
          // Sets username to Blog Title?
          { model: User, attributes: ['id', 'username'] },
          {
            // Gets comments and commentID
            model: Comment,
            attributes: ['userId', 'body'],
            include: [
              {
                // Gets username of user who made comment
                model: User,
                attributes: ['username'],
              },
            ],
          },
        ],
      });

      const serializedBlogs = blogs.map((blog) => blog.get({ plain: true }));
      console.log(serializedBlogs);
      res.status(200).render('homeId', {
        layout: 'home',
        user: authorizedAccess,
        username: req.session.username,
        serializedBlogs,
      });
    }
  } catch (err) {
    console.log(err); // Check the error message
    res.status(500).json(err);
  }
};

exports.getGuest = async (req, res) => {
  try {
    // Find out if user is logged in
    const authorizedAccess = req.session.logged_in;

    // If user is not logged in, show all blogs on the guest page
    if (!authorizedAccess) {
      const blogs = await Blog.findAll({});

      // Convert blogs to readable data
      const serializedBlogs = blogs.map((blog) => blog.get({ plain: true }));

      res.status(200).render('guest', {
        layout: 'guest',
        serializedBlogs,
        logCheck: true,
      });
    } else {
      const user = await User.findByPk(req.session.user_id);
      if (!user) {
        throw new Error('User not found');
      }
      res.status(200).render('dashboard', {
        layout: 'dash',
        username: req.session.username,
      });
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
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};

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
        .json({ message: 'Incorrect Username or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect Username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.logout = async (req, res) => {
  // Logs out of session & redirects to home page
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      err
        ? res.status(500).json({ error: 'Internal service error.' })
        : res.status(200).redirect('/');
    });
  }
};

exports.getRegister = async (req, res) => {
  try {
    res.status(200).render('register', {
      layout: 'register',
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

exports.postRegister = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      // res.redirect(`/home/${req.pa}`);

      res.status(200).json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

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

    const newComment = await Comment.create({
      body: req.body,
      userId: req.session.user_id,
      blogId: req.session.user_id,
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

      const userBlogs = await Blog.findAll({
        attributes: ['id', 'title', 'paragraph', 'date'],
      });

      const serializedBlogs = userBlogs.map((blog) =>
        blog.get({ plain: true })
      );
      const serializedUser = user.get({ plain: true });
      // User is logged in, render the dashboard page
      res.status(200).render('dashboard', {
        layout: 'dash',
        serializedUser,
        serializedBlogs,
        username: req.session.username,
      });
    }
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

exports.putDashboard = async (req, res) => {
  try {
    // Retrieve the blogId from the request parameters
    const { blogId, title, paragraph, date } = req.body;

    // Update the blog with the given blogId using the data from the request body

    const updatedBlog = await Blog.update(req.body, { where: { id: blogId } });

    // Send a response indicating successful update
    res
      .status(200)
      .json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    // Handle any errors that occurred during the update process
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog' });
  }
};

exports.deleteDashboard = async (req, res) => {
  // Retrieve the blogId from the request parameters
  const { blogId } = req.body;

  try {
    // Delete the blog with the given blogId
    await Blog.destroy({ where: { id: blogId } });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};

exports.getBlog = async (req, res) => {
  try {
    // Checks if user is logged in
    const user = req.session.user_id; // Finds user by ID they are signed in with

    if (!user) {
      res.render('login', { layout: 'login' });
    } else {
      const user = await User.findByPk(req.session.user_id);
      const serializedUser = user.get({ plain: true });
      res.status(200).render('createBlog', {
        layout: 'blog',
        user: user,
        serializedUser,
        username: req.session.username,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
    }
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

exports.postBlog = async (req, res) => {
  try {
    // Get the logged-in user ID from the session
    const user = await User.findByPk(req.session.user_id);

    // Check if the user is logged in
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    } else {
      // Create the blog entry and associate it with the user
      const blogData = await Blog.create({
        title: req.body.title,
        paragraph: req.body.paragraph,
        date: req.body.date,
      });
      res.status(200).json({ success: true, blogData });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
