const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,

        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
            
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
               
            }
            
        }, 
        date: {
            type: DataTypes.DATEONLY
        },
        dateComment: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comment',
                key: 'id',
                // SELECT u.username, c.comment, u.dateComment, 
                // FROM User u INNER JOIN Comment c
                // ON u.id = c.user_id
                // INNER JOIN Blog b
                // ON b.comment_id = c.blog_id;
            },
            onDelete: 'CASCADE',
        },

    },

    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.email = await newUserData.email.toLowerCase();
                newUserData.username = await newUserData.username.toLowerCase();
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },

        sequelize,
        timestamps: false,
        tableName: 'user',
        underscored: true,
        freezeTableName: true
        
    }
);

module.exports = User;

