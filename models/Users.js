const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

class Users extends Model {checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }}

Users.init(

    {
        // List of fields
        id: {
            type:  DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        // lastName: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
    }, 
    {
        sequelize: sequelize,
        timestamps: false,
        freezeTableName: true,

        modelName: 'users',
        hooks: {
            beforeCreate: async (newUserData) => {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            },
          },
    }
    
)

module.exports = Users;

