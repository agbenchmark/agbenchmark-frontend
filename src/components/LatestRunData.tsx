import React, { useState } from "react";
import { LatestRun } from "../lib/types";
import tw from "tailwind-styled-components";

const LatestRunData: React.FC<{ latestRun: LatestRun }> = ({ latestRun }) => {
  return (
    <Card>
      <Header>Previous Run</Header>
      <Section>
        <Label>Command:</Label>
        <Data>{latestRun.command}</Data>
      </Section>
      <Section>
        <Label>Start Time:</Label>
        <Data>{latestRun.benchmark_start_time}</Data>
      </Section>
      <Section>
        <Label>Run Time:</Label>
        <Data>{latestRun.metrics.run_time}</Data>
      </Section>
      <Section>
        <Label>Highest Difficulty:</Label>
        <Data>{latestRun.metrics.highest_difficulty}</Data>
      </Section>

      {Object.keys(latestRun.tests).map((testKey) => (
        <Dropdown key={testKey}>
          <DropdownSummary>{testKey}</DropdownSummary>
          <DropdownContent>
            {latestRun.tests[testKey] &&
              Object.entries(latestRun.tests[testKey]!).map(([key, value]) => (
                <Section key={key}>
                  <Label>{key}:</Label>
                  <Data>{JSON.stringify(value)}</Data>
                </Section>
              ))}
          </DropdownContent>
        </Dropdown>
      ))}
    </Card>
  );
};

export default LatestRunData;

const Card = tw.div`
  bg-white
  p-4
  rounded
  shadow-lg
  w-full
`;

const Header = tw.h5`
  text-xl
  font-semibold
`;

const Section = tw.div`
  mt-2
`;

const Label = tw.span`
  font-medium
`;

const Data = tw.span`
  ml-1
`;

const Dropdown = tw.details`
  mt-4
`;

const DropdownSummary = tw.summary`
  cursor-pointer
  text-blue-500
`;

const DropdownContent = tw.div`
  pl-4
  mt-2
`;
