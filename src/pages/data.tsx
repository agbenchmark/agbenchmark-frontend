import React, { useState } from "react";
import tw from "tailwind-styled-components";

const DataPage: React.FC = () => {
  return (
    <PageContainer>
      <div>Dashboard</div>
      <div>Direct Comparisons</div>
      <div>Search reports</div>
    </PageContainer>
  );
};

export default DataPage;

const PageContainer = tw.div`
  
`;
