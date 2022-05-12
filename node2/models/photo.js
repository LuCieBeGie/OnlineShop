module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define('photo', {
        url: {
            type: Sequelize.STRING,
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
    },
        {
            freezeTableName: true,
            timestamps: false
        });
    return Photo
}