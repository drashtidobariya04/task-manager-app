import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalTask } from "@/types/task";

interface TasksState {
  localTasks: LocalTask[];
}

const initialState: TasksState = {
  localTasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<LocalTask, 'id'>>) {
      state.localTasks.unshift({
        ...action.payload,
        id: Date.now(),
      });
    },
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;