module.exports = (Sequelize, DataTypes) => {
    const AccountList = Sequelize.define('AccountList', {
        category: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(33),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        memo: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    }, {
        tableName: 'accountlist',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
    });

    AccountList.associate = (db) => {
        db.AccountList.belongsTo(db.User, {
            foreignKey: 'fk_userId1',
        });
    };

    return AccountList;
};