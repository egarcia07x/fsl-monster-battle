import { API_URL } from '../constants/env';
import {
  Battle,
  BattleCreateRequestParams,
} from '../models/interfaces/battle.interface';

const create = async (params: BattleCreateRequestParams): Promise<Battle> =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then(({ data }) => data);

export const BattleService = {
  create,
};
