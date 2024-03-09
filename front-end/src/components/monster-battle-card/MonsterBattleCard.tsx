import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterDivider,
  BattleMonsterImage,
  BattleMonsterName,
  BattleMonsterTitle,
  FieldContainer,
  FieldName,
  ProgressBar,
} from './MonsterBattleCard.styled';

const fields = [
  {
    name: 'hp',
    label: 'HP',
  },
  {
    name: 'attack',
    label: 'Attack',
  },
  {
    name: 'defense',
    label: 'Defense',
  },
  {
    name: 'speed',
    label: 'Speed',
  },
] as const;

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  if (!monster) {
    return (
      <BattleMonsterCard centralized>
        <BattleMonsterTitle>{title!}</BattleMonsterTitle>
      </BattleMonsterCard>
    );
  }

  return (
    <BattleMonsterCard>
      <BattleMonsterImage>
        <img src={monster.imageUrl} alt={monster.name} loading="lazy" />
      </BattleMonsterImage>
      <BattleMonsterName>{monster.name}</BattleMonsterName>
      <BattleMonsterDivider />
      <FieldContainer>
        {fields.map(({ name, label }) => (
          <>
            <FieldName>{label}</FieldName>
            <ProgressBar value={monster[name]} variant="determinate" />
          </>
        ))}
      </FieldContainer>
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
