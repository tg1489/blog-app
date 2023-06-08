const User = require('../models/User');


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
    // Find user in the database based on what was typed
    const user = await User.findOne({ where: { username: req.body.username } });

    // If the typed login name doesn't exist, show an error
    if (!user) {
      res.status(400).json({ error: 'Invalid username or password. Please try again.' });
      return;
    }

    // If the password of the typed username doesn't match the one stored in the database, display an error
    if (!user.checkPassword(req.body.password)) {
      res.status(400).json({ error: 'Invalid username or password. Please try again.' });
      return;
    }

    // Create a login session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      console.log(req.session.cookie);
    });
    res.status(200).json({ user: user, message: 'You are now logged in.' });
  } 
  
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {
  // Logs out of session & redirects to home page
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      err ? res.status(500).json({ error : 'Internal service error.'}) : res.redirect('/guest'); 
    })
  }
}

exports.postRegister = async (req, res) => {
  try {
   
    const { username, email, password } = req.body;
    const createUser = await User.create({
      email: email,
      username: username,
      password: password,
    });

    req.session.save(() => {
      req.session.user_id = createUser.id;
      req.session.logged_in = true;
      res.json({ user: createUser, message: "You are now logged in!" });
    });

  } catch (err) {
    res.status(400).json(err);
  }
};


exports.getRegister = async (req, res) => {
  try {
    res.status(200).render(
      "register", 
      { 
        layout: 'register',
        logged_in: req.session.logged_in, 
        user_id: req.session.user_id
      }
    );
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};



exports.home = async (req, res) => {
  // check if user is logged in with sessions

  try {
    const authorizedAccess = req.session.logged_in;
      if (!authorizedAccess) {res.render('guest');}
      else {res.render('home');}
  }
   

  catch (err) {
    res.status(500).json(err);
  }
  
}

exports.getGuest = async (req, res) => {
  try {
    const authorizedAccess = req.session.logged_in;
    // If NOT logged in:
    if (!authorizedAccess) {
      // Return to guest page
      res.render('guest');
    } 

    // If the user is logged in:
    else {
      
      const user = await User.findByPk(req.session.user_id);
      if (!user) {
        throw new Error('User not found');
      }
      
      const username = user.username;
      res.render('home', { username });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.dashboard = async (req, res) => {
  try {
    // Checks if user is logged in
    const user = req.session.user_id;
    if (!user) {
      // User is not logged in, redirect to login page
      res.redirect('/login');
    } else {
      // User is logged in, render the dashboard page
      res.render('dashboard', { user });
    }
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};
