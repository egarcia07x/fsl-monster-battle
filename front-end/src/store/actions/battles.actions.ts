import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Battle,
  BattleCreateRequestParams,
} from '../../models/interfaces/battle.interface';
import { BattleService } from '../../services/battles.service';

export const postBattle = createAsyncThunk<Battle, BattleCreateRequestParams>(
  'battle/postBattle',
  BattleService.create,
);

export const resetBattle = createAction('battles/resetBattle');
