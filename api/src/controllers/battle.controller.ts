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
    if (monsters.length !== 2) {
      throw new Error(
        `Cannot find 2 monsters related to ids: ${monsterAId} and ${monsterBId}`
      );
    }
    const winner = calcBattleWinner(monsters as [Monster, Monster]);
    const monsterA = monsters.find(({ id }) => id === monsterAId);
    const monsterB = monsters.find(({ id }) => id === monsterBId);

    const battle = await Battle.query().insert({
      monsterA,
      monsterB,
      winner,
    });

    return res
      .status(201)
      .json({ message: 'Battle created successfully', battle });
  } catch (error) {
    console.error('Error creating battle:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const BattleController = {
  list,
  create,
};
