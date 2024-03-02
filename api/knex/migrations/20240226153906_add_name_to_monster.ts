import { Knex } from 'knex';
import { Monster } from '../../src/models';

// there was seed error due to missing column 'name' in monster table
// migration to add a new column 'name' to Monster table

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(Monster.tableName, function (table) {
    table.string('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(Monster.tableName, function (table) {
    table.dropColumn('name');
  });
}
