module.exports = (sequelize, Sequelize) => {
    const Order_Details = sequelize.define('order_details', {
        orderId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        feedback: {
            type: Sequelize.STRING,
        },
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        feedback: {
            type: Sequelize.STRING,
        },
    },
        {
            freezeTableName: true,
            timestamps: false
        });
    return Order_Details
}