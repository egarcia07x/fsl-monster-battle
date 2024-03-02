import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { Monster } from '../../models';
import knex from '../../db/knex';
import { faker } from '@faker-js/faker';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    const strongMonster = {
      id: 1,
      name: 'strong',
      attack: 100,
      defense: 70,
      hp: 70,
      speed: 90,
      imageUrl: faker.image.imageUrl(),
    };
    const weakMonster = {
      id: 2,
      name: 'weak',
      attack: 50,
      defense: 50,
      hp: 50,
      speed: 50,
      imageUrl: faker.image.imageUrl(),
    };
    beforeAll(async () => {
      await knex(Monster.tableName).del();
      await knex(Monster.tableName).insert([strongMonster, weakMonster]);
    });

    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      const response = await request(server).post('/battle');

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe(
        'monsterAId/monsterBId should not be undefined'
      );
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {
      const monsterAId = 3;
      const monsterBId = 4;
      const response = await request(server).post('/battle').send({
        monsterAId,
        monsterBId,
      });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe(
        `Cannot find 2 monsters related to ids: ${monsterAId} and ${monsterBId}`
      );
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      const response = await request(server).post('/battle').send({
        monsterAId: strongMonster.id,
        monsterBId: weakMonster.id,
      });

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.message).toBe('Battle created successfully');
      expect(response.body.data.winner).toMatchObject(strongMonster);
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      const response = await request(server).post('/battle').send({
        // NOTE: monsterAId and monsterBId is changed compared to previous test
        monsterAId: weakMonster.id,
        monsterBId: strongMonster.id,
      });

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.message).toBe('Battle created successfully');
      expect(response.body.data.winner).toMatchObject(strongMonster);
    });
  });
});
