import { Knex } from 'knex';
import { Monster } from '../../src/models';

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
