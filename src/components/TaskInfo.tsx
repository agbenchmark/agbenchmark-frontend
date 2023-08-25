import React, { useState } from "react";

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
  const [isMock, setIsMock] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any>();

  const runBenchmark = async () => {
    try {
      const response = await fetch(`http://localhost:8000/run?mock=${isMock}`);
      const data = await response.json();

      // You can handle the response data here, if necessary
      setResponseData(data);
      console.log(data);
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  };

  const runTest = async () => {
    // If there's no selected task, do nothing
    if (!selectedTask?.name) return;

    const testParam = selectedTask.name;

    try {
      const response = await fetch(
        `http://localhost:8000/run_single_test?test=${testParam}&mock=${isMock}`
      );
      const data = await response.json();

      if (data["returncode"] > 0) {
        throw new Error(data["stderr"]);
      } else {
        const jsonObject = JSON.parse(data["stdout"]);
        setResponseData(jsonObject);
      }
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  };

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
          <RunButton onClick={runBenchmark}>Run Benchmark</RunButton>
          <CheckboxWrapper>
            <MockCheckboxInput
              type="checkbox"
              checked={isMock}
              onChange={() => setIsMock(!isMock)}
            />
            <span>Run mock test</span>
          </CheckboxWrapper>
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
          <RunButton onClick={runTest}>Run Task</RunButton>
          <CheckboxWrapper>
            <MockCheckboxInput
              type="checkbox"
              checked={isMock}
              onChange={() => setIsMock(!isMock)}
            />
            <span>Run mock test</span>
          </CheckboxWrapper>
          <Detail>
            <b>Previous Run</b>
          </Detail>
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

const MockCheckboxInput = tw.input`
    border 
    rounded 
    focus:border-blue-400 
    focus:ring 
    focus:ring-blue-200 
    focus:ring-opacity-50
`;

const CheckboxWrapper = tw.label`
    flex 
    items-center 
    space-x-2 
`;
