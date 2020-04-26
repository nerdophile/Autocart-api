const Sequelize = require('sequelize');

export default (sequelize, DataTypes) => {
    return sequelize.define('Products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        barcode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        updatedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    })
};