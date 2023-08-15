import React from "react";

import tw from "tailwind-styled-components";

import { TaskData } from "../lib/types";

interface TaskInfoProps {
  selectedTask: TaskData | null;
  isTaskInfoExpanded: boolean;
  setIsTaskInfoExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskData | null>>;
}

const TaskInfo: React.FC<TaskInfoProps> = ({
  selectedTask,
  isTaskInfoExpanded,
  setIsTaskInfoExpanded,
  setSelectedTask,
}) => {
  return (
    <TaskDetails isExpanded={isTaskInfoExpanded}>
      {isTaskInfoExpanded ? (
        <ToggleButton
          onClick={() => {
            setIsTaskInfoExpanded(!isTaskInfoExpanded);
            setSelectedTask(null);
          }}
        >
          →
        </ToggleButton>
      ) : (
        <BenchmarkWrapper>
          <RunButton>Run Benchmark</RunButton>
          <Detail>
            <b>or click a node on the left</b>
          </Detail>
        </BenchmarkWrapper>
      )}

      {selectedTask && (
        <>
          <TaskName>{selectedTask?.name}</TaskName>
          <TaskPrompt>{selectedTask?.task}</TaskPrompt>
          <Detail>
            <b>Cutoff:</b> {selectedTask?.cutoff}
          </Detail>
          <Detail>
            <b>Description:</b> {selectedTask?.info?.description}
          </Detail>
          <Detail>
            <b>Difficulty:</b> {selectedTask?.info?.difficulty}
          </Detail>
          <Detail>
            <b>Category:</b> {selectedTask?.category}
          </Detail>
          <RunButton>Run Task</RunButton>
        </>
      )}
    </TaskDetails>
  );
};

const TaskDetails = tw.div<{ isExpanded: boolean }>`
  ${(p) => (p.isExpanded ? "w-1/2" : "w-1/4")}
  ml-5
  transition-all
  duration-500
  ease-in-out
  p-4
  border
  border-gray-400
  h-full
  overflow-hidden
`;

export default TaskInfo;

const ToggleButton = tw.button`
    font-bold
    text-2xl
`;

const BenchmarkWrapper = tw.div`
    flex
    flex-col
    items-center
    justify-center
`;

const TaskName = tw.h1`
    font-bold
    text-2xl
    break-words
`;

const TaskPrompt = tw.p`
    text-gray-900
    break-words
`;
const Detail = tw.p`
    mt-2
`;

const RunButton = tw.button`
    border
    mt-4
    py-1
    px-3
    rounded
`;
