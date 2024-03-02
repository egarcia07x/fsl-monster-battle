import { Monster } from '../models';

export const calcBattleWinner = (monsters: [Monster, Monster]) => {
  monsters.sort((a, b) => {
    const speedDiff = a.speed - b.speed;
    if (speedDiff !== 0) {
      return speedDiff;
    }
    return a.attack - b.attack;
  });

  let i = 0;
  while (monsters[i].hp > 0) {
    let damage = monsters[i].attack - monsters[1 - i].defense;
    if (damage <= 0) damage = 1;
    monsters[1 - i].hp -= damage;
    i = 1 - i;
  }

  return monsters[i];
};
