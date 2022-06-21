'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'First Name is required.'
                },
                notEmpty: {
                    msg: 'First Name is required.'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Last Name is required.'
                },
                notEmpty: {
                    msg: 'Last Name is required.'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Email address is required.'
                },
                notEmpty: {
                    msg: 'Email address is required.'
                },
                isEmail: {
                    msg: 'Please enter a valid email address.'
                }               
            },
            unique: {
                args: true,
                msg: 'Please enter a valid email address.'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                    const hashedPassword = bcrypt.hashSync(val, 10);
                    this.setDataValue('password', hashedPassword);
            },
            validate: {
                notNull: {
                    msg: 'Password is required.'
                },
                notEmpty: {
                    msg: 'Password is required.'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User'
    });

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'userInfo',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false
            }
        });
    };

    return User;
};