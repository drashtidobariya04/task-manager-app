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
   
  },
});

export const {  } = tasksSlice.actions;
export default tasksSlice.reducer;