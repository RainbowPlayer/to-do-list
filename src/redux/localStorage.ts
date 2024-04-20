import { TasksState } from "./slicers/tasksSlice";

interface RootState {
  tasks: TasksState;
}

export const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as RootState;
  } catch (err) {
    console.error("Failed to load state", err);
    return undefined;
  }
};
  
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error("Failed to save state", err);
  }
};