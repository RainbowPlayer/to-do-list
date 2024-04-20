import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../types/types';

export interface TasksState {
  activeTasks: Task[];
  completedTasks: Task[];
  tasks?: any;
}

const initialState: TasksState = {
  activeTasks: [],
  completedTasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: uuidv4(),
        text: action.payload,
        completed: false
      };
      state.activeTasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      let task = state.activeTasks.find(task => task.id === taskId);
      if (task) {
        state.activeTasks = state.activeTasks.filter(task => task.id !== taskId);
        task.completed = true;
        state.completedTasks.push(task);
      } else {
        task = state.completedTasks.find(task => task.id === taskId);
        if (task) {
          state.completedTasks = state.completedTasks.filter(task => task.id !== taskId);
          task.completed = false;
          state.activeTasks.push(task);
        }
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.activeTasks = state.activeTasks.filter(task => task.id !== action.payload);
      state.completedTasks = state.completedTasks.filter(task => task.id !== action.payload);
    },
    moveTask: (state, action: PayloadAction<{ taskId: string, targetIndex: number, newList: 'active' | 'completed' }>) => {
      const { taskId, targetIndex, newList } = action.payload;
      let currentList = state.activeTasks.find(task => task.id === taskId) ? 'active' : 'completed';
      let task = currentList === 'active' ? state.activeTasks.find(task => task.id === taskId) : state.completedTasks.find(task => task.id === taskId);
      if (task) {
        if (currentList === 'active') {
          state.activeTasks = state.activeTasks.filter(task => task.id !== taskId);
        } else {
          state.completedTasks = state.completedTasks.filter(task => task.id !== taskId);
        }
        if (newList === 'active') {
          state.activeTasks.splice(targetIndex, 0, task);
        } else {
          state.completedTasks.splice(targetIndex, 0, task);
        }
      }
    }
  }
});

export const { addTask, toggleTask, removeTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;

