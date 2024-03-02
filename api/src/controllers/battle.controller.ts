import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import { calcBattleWinner } from '../services/battle.service';
import knex from '../db/knex';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { monsterAId, monsterBId } = req.body || {};

    if (!monsterAId || !monsterBId) {
      return res
        .status(400)
        .json({ message: 'monsterAId/monsterBId should not be undefined' });
    }

    const monsters = await Monster.query().findByIds([monsterAId, monsterBId]);
    const monsterA = monsters.find(({ id }) => id === monsterAId);
    const monsterB = monsters.find(({ id }) => id === monsterBId);

    if (!monsterA || !monsterB) {
      return res
        .status(404)
        .json({
          message: `Cannot find 2 monsters related to ids: ${monsterAId} and ${monsterBId}`,
        });
    }

    const winner = calcBattleWinner(monsters as [Monster, Monster]);

    const [id] = await knex(Battle.tableName).insert({
      monsterA: monsterA.id,
      monsterB: monsterB.id,
      winner: winner.id,
    });

    const battle = {
      id,
      monsterA,
      monsterB,
      winner,
    };

    return res
      .status(201)
      .json({ message: 'Battle created successfully', data: battle });
  } catch (error) {
    console.error('Error creating battle:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Inertnal Server Error' });
  }
};

export const BattleController = {
  list,
  create,
};
