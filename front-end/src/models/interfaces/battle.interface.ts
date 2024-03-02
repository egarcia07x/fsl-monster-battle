import { Monster } from './monster.interface';

export interface Battle {
  monsterA: Monster;
  monsterB: Monster;
  winner: Monster;
}

export interface BattleCreateRequestParams {
  monsterAId: string;
  monsterBId: string;
}
