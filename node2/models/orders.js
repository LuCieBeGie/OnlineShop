module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define('orders', {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        total: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('date')).format('DD/MM/YYYY h:mm:ss');
            }
        },
    },
        {
            freezeTableName: true,
            timestamps: false
        });
    return Orders
}