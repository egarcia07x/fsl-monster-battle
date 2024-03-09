import { Monster } from '../models';

export const calcBattleWinner = (monsters: [Monster, Monster]) => {
  monsters.sort((a, b) => {
    const speedDiff = b.speed - a.speed;
    if (!speedDiff) {
      return speedDiff;
    }
    return b.attack - a.attack;
  });

  const countAttacksToKill = [];

  for (let i = 0; i < 2; i++) {
    let damage = monsters[i].attack - monsters[1 - i].defense;
    if (damage <= 0) damage = 1;

    countAttacksToKill.push(Math.ceil(monsters[1 - i].hp / damage - 0.00001));
  }

  if (countAttacksToKill[0] <= countAttacksToKill[1]) {
    return monsters[0];
  }

  return monsters[1];
};
