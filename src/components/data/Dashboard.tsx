import React, { useState } from "react";
import tw from "tailwind-styled-components";

interface DashboardProps {
  data: any;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <DashboardContainer>
      <div>Dashboard</div>
      <div>Search reports</div>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = tw.div`
  
`;
