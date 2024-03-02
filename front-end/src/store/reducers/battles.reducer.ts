import { createReducer } from '@reduxjs/toolkit';
import { Battle } from '../../models/interfaces/battle.interface';
import { postBattle, resetBattle } from '../actions/battles.actions';

interface BattleState {
  pending: boolean;
  battle: Battle | null;
}

const initialState: BattleState = {
  pending: false,
  battle: null,
};

export const battlesReducer = createReducer(initialState, (builder) => {
  builder.addCase(postBattle.pending, (state) => ({
    ...state,
    pending: true,
    battle: null,
  }));

  builder.addCase(postBattle.rejected, (state) => ({
    ...state,
    pending: false,
    battle: null,
  }));

  builder.addCase(postBattle.fulfilled, (state, action) => ({
    ...state,
    pending: false,
    battle: action.payload,
  }));

  builder.addCase(resetBattle, (state) => ({
    ...state,
    pending: false,
    battle: null,
  }));
});
