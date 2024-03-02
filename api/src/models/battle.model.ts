import { Id, RelationMappings } from 'objection';
import Base from './base';
import { Monster } from './monster.model';

export class Battle extends Base {
  id!: Id;
  monsterA!: Monster;
  monsterB!: Monster;
  winner!: Monster;

  static tableName = 'battle';

  static get relationMappings(): RelationMappings {
    return {
      monsterARelation: {
        relation: Base.BelongsToOneRelation,
        modelClass: Monster,
        join: {
          from: 'battle.monsterAId',
          to: 'monster.id',
        },
      },
      monsterBRelation: {
        relation: Base.BelongsToOneRelation,
        modelClass: Monster,
        join: {
          from: 'battle.monsterBId',
          to: 'monster.id',
        },
      },
      winnerRelation: {
        relation: Base.BelongsToOneRelation,
        modelClass: Monster,
        join: {
          from: 'battle.winnerId',
          to: 'monster.id',
        },
      },
    };
  }
}
