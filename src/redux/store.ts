import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slicers/tasksSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
console.log('Loaded State:', persistedState);

export const store = configureStore({
    reducer: {
      tasks: tasksReducer
    },
    preloadedState: persistedState
  });
  
  store.subscribe(() => {
    saveState({
      tasks: store.getState().tasks
    });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
