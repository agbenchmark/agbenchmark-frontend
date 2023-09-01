import React, { useState } from "react";

import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface RunButtonProps {
  testRun: () => Promise<void>;
  isLoading: boolean;
}

const RunButton: React.FC<RunButtonProps> = ({ testRun, isLoading }) => {
  return (
    <RunButtonWrapper onClick={testRun}>
      {!isLoading ? (
        "Run Task"
      ) : (
        <FontAwesomeIcon size="lg" icon={faCircleNotch} spin />
      )}
    </RunButtonWrapper>
  );
};

export default RunButton;

const RunButtonWrapper = tw.button`
    border
    mt-4
    py-1
    px-3
    w-28
    rounded
    flex
    items-center
    justify-center
`;
