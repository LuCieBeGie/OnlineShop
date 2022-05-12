module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        productId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'products',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
    return Cart
}