import { Monster } from './monster.interface';

export interface Battle {
  id: string;
  winner: Monster;
  monsterA: Monster;
  monsterB: Monster;
}

export interface BattleCreateRequestParams {
  monsterAId: string;
  monsterBId: string;
}
