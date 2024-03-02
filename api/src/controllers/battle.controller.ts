import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import { calcBattleWinner } from '../services/battle.service';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { monsterAId, monsterBId } = req.body;

    const monsters = await Monster.query().findByIds([monsterAId, monsterBId]);
    const monsterA = monsters.find(({ id }) => id === monsterAId);
    const monsterB = monsters.find(({ id }) => id === monsterBId);

    if (!monsterA || !monsterB) {
      throw new Error(
        `Cannot find 2 monsters related to ids: ${monsterAId} and ${monsterBId}`
      );
    }

    const winner = calcBattleWinner(monsters as [Monster, Monster]);

    const battle = await Battle.query().insert({
      monsterA: monsterA,
      monsterB: monsterB,
      winner: winner,
    });

    return res
      .status(201)
      .json({ message: 'Battle created successfully', data: battle });
  } catch (error) {
    console.error('Error creating battle:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const BattleController = {
  list,
  create,
};
