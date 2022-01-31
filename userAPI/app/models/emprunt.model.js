module.exports = function (sequelize, Sequelize) {
    const Emprunt = sequelize.define("emprunt", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        bookID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date_retour: {
            type: Sequelize.DATE,
            primaryKey: true
        },
    }, {
        freezeTableName: true,
        tableName: 'emprunt',
        createdAt: false,
        updatedAt: false
    });

   /* Emprunt.associate = function (modals) {
        Emprunt.hasMany(modals.User, {
            foreignKey: 'userID',
        });
        Emprunt.hasMany(modals.Book, {
            foreignKey: 'bookID',
        });
    };*/

    return Emprunt;
};