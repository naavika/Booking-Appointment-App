const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('booking-appointment-app', 'root', 'RRRR@NNNN', {
  host: 'localhost',
  dialect: 'mysql', 
});

const userModel = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        
    }
});

module.exports = userModel;
