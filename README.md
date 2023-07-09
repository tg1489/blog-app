[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Blog App

The Blog App is a web application built with Sequelize and MySQL2. It allows users to create blog posts, view existing posts, leave comments, and manage their dashboard.

## Table of Contents

 • [Description](#description)

 • [Installation](#installation)

 • [Usage](#usage)

 • [Features](#features)

 • [Technologies Used](#technologies-used)

 • [Contributing](#contributing)

 • [Questions](#questions)

 • [License](#license)

## Description

This project is a RESTful API for managing products. It allows users to perform CRUD (Create, Read, Update, Delete) operations on products and their associated categories and tags.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-app.git
    ```

2. Install the dependencies:

```bash
npm install    
```

3. Configure the database connection:

+ Open the config/config.json file.
+ Update the database credentials (host, username, password) as per your MySQL server configuration.

4. Create the database:

+ Open MySQL Workbench

+ Run the following query to create the database:

```SQL
CREATE DATABASE blog_db;
```

5. Run the seeds inside terminal:

```bash
npm run seed
```

6. Star the application:

```bash
npm run watch
```

7. Open your browser and visit http://localhost:3000 to access the Blog App.


## Usage

+ Register a new user account or login with an existing account.
+ Explore the home page to read blog posts from various users.
+ Click on a blog post to view its details, leave comments, or edit/delete if it's your own post.
+ Access your dashboard to manage your blog posts.
+ Create new blog posts, edit existing ones, or delete posts.
+ Logout to end the session.

## Features

+ User registration and login
+ Create, edit, and delete blog posts
+ Leave comments on blog posts
+ Dashboard to manage blog posts

## Technologies Used

+ Node.js
+ Express.js
+ Sequelize (ORM)
+ MySQL2 (Database)
+ Handlebars (Template Engine)
+ HTML/CSS
+ JavaScript

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

## Questions

If you have any questions about this program or would like to report a bug, please contact the author through GitHub:
[GitHub](https://github.com/tg1489/)
Alternatively, you may reach out and email me down below if you have any additional questions about the program.
[Email](mailto:tonyguarino1489@gmail.com)

## License

This application is licensed under the MIT License. See the LICENSE file for more information.
