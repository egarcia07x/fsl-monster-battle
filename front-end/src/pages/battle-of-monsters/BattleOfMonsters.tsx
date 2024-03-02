import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { Monster } from '../../models/interfaces/monster.interface';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();
  const [computerMonster, setComputerMonster] = useState<Monster | null>(null);

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  useEffect(() => {
    console.log('selectedMonster', selectedMonster);
    if (selectedMonster) {
      const availableMonsters = monsters.filter(
        ({ id }) => id !== selectedMonster.id,
      );
      const n = availableMonsters.length;
      const idx = Math.floor(n * Math.random());
      setComputerMonster(availableMonsters[idx]);
    }
  }, [monsters, selectedMonster]);

  const handleStartBattleClick = () => {
    // Fight!
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}
          monster={selectedMonster}
        />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          title={computerMonster?.name || 'Computer'}
          monster={computerMonster}
        />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
