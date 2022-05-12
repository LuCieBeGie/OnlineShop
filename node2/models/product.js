module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('products', {
        name: {
            type: Sequelize.STRING,
        },
        count: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
        {
            freezeTableName: true,
            timestamps: false
        });
    return Product
}