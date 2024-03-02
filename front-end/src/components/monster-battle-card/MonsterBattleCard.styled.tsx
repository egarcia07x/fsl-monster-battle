import styled from '@emotion/styled';
import {
  Box,
  Card,
  Divider,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import { colors } from '../../constants/colors';

export const BattleMonsterCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'centralized',
})<{ centralized?: boolean }>(({ centralized }) => ({
  padding: '13px 11px',
  width: 'calc(307px - 22px)',
  height: '415px',
  background: colors.white,
  boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '7px',
  display: centralized ? 'flex' : 'auto',
  alignItems: centralized ? 'center' : 'auto',
  justifyContent: centralized ? 'center' : 'auto',
}));

export const BattleMonsterTitle = styled(Typography)(() => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '36px',
  lineHeight: '42px',
  color: colors.black,
}));

export const BattleMonsterImage = styled.div(() => ({
  width: '100%',
  height: '178px',
  borderRadius: '7px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: 'auto',
  },
}));

export const BattleMonsterName = styled(Typography)(() => ({
  marginTop: '10px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '22px',
  color: colors.black,
}));

export const BattleMonsterDivider = styled(Divider)(() => ({}));

export const FieldContainer = styled(Box)(() => ({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
}));

export const FieldName = styled(Typography)(() => ({
  color: colors.black,
}));

export const ProgressBar = styled(LinearProgress)(() => ({
  height: 8,
  boxSizing: 'border-box',
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: colors.progressBarBackground,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: colors.progressColor,
  },
}));
