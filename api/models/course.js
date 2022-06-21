'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {}
    Course.init({
       title: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               notNull: {
                   msg: 'Course Title is required.'
               },
               notEmpty: {
                   msg: 'Course Title is required.'
               }
           }
       },
       description: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               notNull: {
                   msg: 'Description is required.'
               },
               notEmpty: {
                   msg: 'Description is required.'
               }
           }
       },
       estimatedTime: {
           type: DataTypes.TEXT
       },
       materialsNeeded: {
           type: DataTypes.STRING
       }  
    }, {
        sequelize,
        modelName: 'Course'
    });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: 'userInfo',
            foreignKey: {
                fieldName: 'userId'
            }
        });
    };

    return Course;
}