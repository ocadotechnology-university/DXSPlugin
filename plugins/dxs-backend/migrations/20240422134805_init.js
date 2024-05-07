const fs = require('fs');
const path = require('path');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    const sqlFilePath = path.join(__dirname, 'dxs.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

    // Execute the SQL queries in the file
    await knex.raw(sqlContent);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
