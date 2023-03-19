exports.up = (pgm) => {
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
        password: {
            type: 'TEXT',
            notNull: true,
        },
        fullname: {
            type: 'TEXT',
            notNull: true,
        },
        role: {
            type: 'TEXT',
            notNull: true,
            default: 'user',
        }

    });
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};