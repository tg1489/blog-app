require('dotenv').config();
const sequelize = require('./config/connection');
const express = require('express');
const { join } = require('path');
const exphbs = require('express-handlebars');
const routes = require('./app/routes/router');
const session = require('express-session');
const generateKey = require('./app/utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const viewsPath = join(__dirname, './app/views');
const hbs = exphbs.create({
      defaultLayout: 'guest',
      layoutsDir: viewsPath + '/layouts'
});

app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(express.static(join(__dirname, './app/public')));
      app.use(session({
            secret: generateKey,
            cookie: {
                  
                  maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
                },
            resave: false,
            saveUninitialized: true,
            store: new SequelizeStore({
                  db: sequelize,
                }), 
      }));

      // Content-Type for JavaScript files
      app.use((req, res, next) => {
            if (req.url.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
            }
            next();
      });

      app.set('views', viewsPath);
      app.engine('handlebars', hbs.engine);
      app.set('view engine', 'handlebars');
      app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT || 3000, () => console.log(`Connected on port ${process.env.PORT}.`));
})
    



