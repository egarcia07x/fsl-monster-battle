import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { monstersReducer } from './reducers/monsters.reducer';
import { battlesReducer } from './reducers/battles.reducer';

export const store = configureStore({
  reducer: {
    monsters: monstersReducer,
    battles: battlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
