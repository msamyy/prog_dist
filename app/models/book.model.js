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
        average_rating: {
            type: Sequelize.REAL
        },
        isbn: {
            type: Sequelize.STRING(30)
        },
        isbn13: {
            type: Sequelize.STRING(30)
        },
        language_code: {
            type: Sequelize.STRING(5)
        },
        num_pages: {
            type: Sequelize.INTEGER
        }, 
        rating_count: {
            type: Sequelize.BIGINT
        },
        text_reviews_count: {
            type: Sequelize.BIGINT
        },
        publication_date: {
            type: Sequelize.DATE
        },
        publisher: {
            type: Sequelize.STRING
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