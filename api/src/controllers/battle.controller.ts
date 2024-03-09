import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import knex from '../db/knex';
import { calcBattleWinner } from '../services/battle.serivce';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { monsterAId, monsterBId } = req.body || {};

    if (monsterAId === undefined || monsterBId === undefined) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'monsterAId/monsterBId should not be undefined' });
    }

    const monsters = await Monster.query().findByIds([monsterAId, monsterBId]);
    const monsterA = monsters.find(({ id }) => id === monsterAId);
    const monsterB = monsters.find(({ id }) => id === monsterBId);

    if (!monsterA || !monsterB) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Cannot find 2 monsters related to ids: ${monsterAId} and ${monsterBId}`,
      });
    }

    const winner = calcBattleWinner([monsterA, monsterB]);

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

    return res.status(StatusCodes.CREATED).json({
      message: 'Battle created successfully',
      data: battle,
    });
  } catch (error) {
    console.error('Error creating battle:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error', error });
  }
};

export const BattleController = {
  list,
  create,
};
