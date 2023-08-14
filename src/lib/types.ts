export interface GraphNode {
  id: string;
  label: string;
  color: string;
  data: TaskData;
  shape: string;
}

export interface TaskData {
  name: string;
  task: string;
  cutoff: string;
  info: { description: string; difficulty: string };
  category: string[];
}
