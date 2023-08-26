import React, { useState } from "react";

import tw from "tailwind-styled-components";

import { TaskData } from "../lib/types";
import LatestRunData from "./LatestRunData";
import SelectedTask from "./SelectedTask";
import MockCheckbox from "./MockCheckbox";

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
  const [cutoff, setCutoff] = useState<number | null>(null);

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
          <MockCheckbox isMock={isMock} setIsMock={setIsMock} />
          <Detail>
            <b>or click a node on the left</b>
          </Detail>
        </BenchmarkWrapper>
      )}

      {selectedTask && (
        <SelectedTask
          selectedTask={selectedTask}
          isMock={isMock}
          setIsMock={setIsMock}
          cutoff={cutoff}
          setResponseData={setResponseData}
        />
      )}
      {!isMock && (
        <CheckboxWrapper>
          <p>Custom cutoff</p>
          <CutoffInput
            type="number"
            placeholder="Leave blank for default"
            value={cutoff ?? ""}
            onChange={(e) =>
              setCutoff(e.target.value ? parseInt(e.target.value) : null)
            }
          />
        </CheckboxWrapper>
      )}
      {responseData && <LatestRunData latestRun={responseData} />}
    </TaskDetails>
  );
};

export default TaskInfo;

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
  overflow-x-hidden
`;

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

const CutoffInput = tw.input`
  border rounded w-1/2 h-8 text-sm
  focus:outline-none focus:border-blue-400
  pl-2
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
    mt-2
`;
