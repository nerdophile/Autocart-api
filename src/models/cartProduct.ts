const Sequelize = require('sequelize');

export default (sequelize, DataTypes) => {
    return sequelize.define('CartProducts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        productId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        cartId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            }
        }
    }, {
        freezeTableName: false,
        timestamps: false,
    })
};