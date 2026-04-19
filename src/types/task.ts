export interface ApiTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface LocalTask {
  id: number;         
  title: string;
  completed: boolean;
  userId: number;
  isLocal: true;     
}

export type Task = ApiTask | LocalTask;

export type FilterStatus = 'all' | 'completed' | 'pending';