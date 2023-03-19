exports.up = (pgm) => {
    pgm.createTable('infaq', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        date: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
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

    pgm.addConstraint('infaq', 'fk_infaq.ownerId', 'FOREIGN KEY("ownerId") REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropTable('users');
    pgm.dropConstraint('infaq', 'fk_infaq.ownerId');
};