module.exports = (sequelize, DataTypes) => {
    const Monthly = sequelize.define('Monthly', {
        yearNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        monthNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        incomeSum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        outcomeSum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        tableName: 'user',
        timestamps: false
    });
    
    Monthly.associate = (db) => {
        db.Monthly.belongsTo(db.User, {
            foreignKey: 'fk_userId2',
        });
    };

    return Monthly;
};