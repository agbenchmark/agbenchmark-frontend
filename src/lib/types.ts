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

type Metrics = {
  run_time: string;
  highest_difficulty: string;
};

type TestMetrics = {
  difficulty: string;
  success: boolean;
  attempted: boolean;
  fail_reason?: string;
  "success_%": number;
  cost: null | number;
  run_time: string;
};

type Test = {
  data_path: string;
  is_regression: boolean;
  category: string[];
  task: string;
  answer: string;
  description: string;
  metrics: TestMetrics;
  reached_cutoff: boolean;
};

export type LatestRun = {
  command: string;
  benchmark_git_commit_sha: string;
  agent_git_commit_sha: string;
  completion_time: string;
  benchmark_start_time: string;
  metrics: Metrics;
  tests: Record<string, Test>;
  config: Record<string, string>;
};
