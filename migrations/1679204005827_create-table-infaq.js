exports.up = (pgm) => {
    pgm.createTable('infaq', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        date: {
            type: 'TEXT',
            notNull: true,
        },
        total: {
            type: 'integer',
            notNull: true,
        },
        ownerId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('infaq');
};