import { Monster } from '../models';

export const calcBattleWinner = (monsters: [Monster, Monster]) => {
  monsters.sort((a, b) => {
    const speedDiff = b.speed - a.speed;
    if (speedDiff !== 0) {
      return speedDiff;
    }
    return b.attack - a.attack;
  });

  const countAttacksToKill = [];

  for (let i = 0; i < 2; i++) {
    let damage = monsters[i].attack - monsters[1 - i].defense;
    if (damage <= 0) damage = 1;

    countAttacksToKill.push(Math.ceil(monsters[1 - i].hp / damage - 0.0001));
  }

  // [0] starts attack first, so if count is same, [0] will kill [1] before [1] does the final attack to [0]
  if (countAttacksToKill[0] <= countAttacksToKill[1]) {
    return monsters[0];
  }
  return monsters[1];
};
