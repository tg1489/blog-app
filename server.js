require('dotenv').config();
const sequelize = require('./config/connection');
const express = require('express');
const { join } = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require('express-session');
// const generateKey = require('./app/utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebarHelpers = require('./utils/handlebar-helpers');

const app = express();
const viewsPath = join(__dirname, './views');
const hbs = exphbs.create({
  helpers: handlebarHelpers,
  defaultLayout: 'guest',
  layoutsDir: viewsPath + '/layouts',
  // helpers: handlebarHelpers, // Used to make the comments show in reverse order so newest are on top
});
// const addUserIdToRequest = (req, res, next) => {
//   // Check if the session object exists and has the user_id property
//   if (req.session && req.session.user_id) {
//     req.user_id = req.session.user_id; // Add user_id property to the request object
//   }

//   next(); // Move to the next middleware
// };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, './public')));
// app.use(addUserIdToRequest);

app.use(
  session({
    secret: 'super secret secret',
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// app.set('views', viewsPath);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Connected on port ${process.env.PORT}.`)
  );
});
