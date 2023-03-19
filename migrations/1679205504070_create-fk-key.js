exports.up = pgm => {

    pgm.addConstraint('infaq', 'fk_infaq.ownerId', 'FOREIGN KEY("ownerId") REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('infaq', 'fk_infaq.ownerId');
};
