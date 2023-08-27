import React, { useState } from "react";
import tw from "tailwind-styled-components";

interface ReportsProps {
  data: any;
}

const Reports: React.FC<ReportsProps> = ({ data }) => {
  return (
    <ReportsContainer>
      <div>Dashboard</div>
      <div>Search reports</div>
    </ReportsContainer>
  );
};

export default Reports;

const ReportsContainer = tw.div`
  
`;
