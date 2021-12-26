module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define("user", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(60)
        },
        adresse: {
            type: Sequelize.STRING(60)
        },
        date_de_naissance: {
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING(60)
        },
        hashedpwd: {
            type: Sequelize.STRING
        },
        date_adhesion: {
            type: Sequelize.DATE
        },
        avatar_url: {
            type: Sequelize.INTEGER
        },
        tel: {
            type: Sequelize.STRING(12)
        },
    }, {
        freezeTableName: true,
        tableName: 'user',
        createdAt: false,
        updatedAt: false
    });

    User.associate = function (modals) {
        User.hasMany(modals.Emprunt, {
            foreignKey: 'userID',
        });
    };

    return User;
};