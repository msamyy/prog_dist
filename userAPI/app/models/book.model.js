module.exports = function (sequelize, Sequelize) {
    const Book = sequelize.define("book", {
        bookID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        authors: {
            type: Sequelize.STRING
        },
        long_description: {
            type: Sequelize.STRING
        },
        short_description: {
            type: Sequelize.STRING
        },
        average_rating: {
            type: Sequelize.REAL
        },
        isbn: {
            type: Sequelize.STRING(30)
        },
        num_pages: {
            type: Sequelize.INTEGER
        },
        publication_date: {
            type: Sequelize.DATE
        },
        url: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        categories: {
            type: Sequelize.TEXT
        },

        // ajouter un champs pour les exemplaires dispos
    }, {
        freezeTableName: true,
        tableName: 'book',
        createdAt: false,
        updatedAt: false
    });

    Book.associate = function (modals) {
        Book.hasMany(modals.Emprunt, {
            foreignKey: 'bookID',
        });
    };

    return Book;
};