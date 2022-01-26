module.exports = function (sequelize, Sequelize) {
    const Admin = sequelize.define("admin", {
        adminID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING(60)
        },
        hashedpwd: {
            type: Sequelize.STRING
        },
    }, {
        freezeTableName: true,
        tableName: 'admin',
        createdAt: false,
        updatedAt: false
    });

    return Admin;
};