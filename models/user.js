module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        tableName: 'user',
        timestamps: false
    });
    
    User.associate = (db) => {
        db.User.hasMany(db.AccountList, {
            foreignKey: 'fk_userId1',
            onDelete: 'cascade'
        });

        db.User.hasMany(db.Monthly, {
            foreignKey: 'fk_userId2',
            onDelete: 'cascade'
        });
    };

    return User;
};