import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../store/actions/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../store/selectors/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { Monster } from '../../models/interfaces/monster.interface';
import { selectBattle } from '../../store/selectors/battles.selectors';
import { postBattle, resetBattle } from '../../store/actions/battles.actions';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();
  const [computerMonster, setComputerMonster] = useState<Monster | null>(null);

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const { battle, pending: battlePending } = useSelector(selectBattle);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMonster) {
      updateComputerMonster(selectedMonster, monsters);
    }

    dispatch(resetBattle());
  }, [monsters, selectedMonster, dispatch]);

  const updateComputerMonster = (
    selectedMonster: Monster,
    monsters: Monster[],
  ) => {
    const availableMonsters = monsters.filter(
      ({ id }) => id !== selectedMonster.id,
    );
    const n = availableMonsters.length;
    const idx = Math.floor(n * Math.random());
    setComputerMonster(availableMonsters[idx]);
  };

  const handleStartBattleClick = () => {
    if (!selectedMonster || !computerMonster) {
      return;
    }
    dispatch(
      postBattle({
        monsterAId: selectedMonster.id,
        monsterBId: computerMonster.id,
      }),
    );
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {!!battle && <WinnerDisplay text={battle.winner.name} />}

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}
          monster={selectedMonster}
        />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null || battlePending}
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
