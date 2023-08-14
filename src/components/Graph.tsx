import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";

import tw from "tailwind-styled-components";

interface Node {
  id: string;
  label: string;
  color: string;
  task: string;
  shape: string;
}

interface Edge {
  id: string;
  from: string;
  to: string;
  arrows: string;
}

interface GraphProps {
  graphData: {
    nodes: Node[];
    edges: Edge[];
  };
}

const Graph: React.FC<GraphProps> = ({ graphData }) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }
    const nodes = new DataSet<Node>(graphData.nodes);
    const edges = new DataSet<Edge>(graphData.edges);

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      nodes: {
        font: {
          size: 20, // Increased font size for labels
          color: "black", // Set a readable font color
        },
        shapeProperties: {
          useBorderWithImage: true,
        },
      },
      edges: {
        length: 250, // Increased edge length
      },
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 300,
          nodeSpacing: 250,
          treeSpacing: 250,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: "UD",
          sortMethod: "directed",
        },
      },
      physics: {
        stabilization: {
          enabled: true,
          iterations: 1000,
        },
        hierarchicalRepulsion: {
          centralGravity: 0.0,
          springLength: 200,
          springConstant: 0.01,
          nodeDistance: 300,
          damping: 0.09,
        },
        timestep: 0.5,
      },
    };

    const network = new Network(graphRef.current, data, options);

    // Add an event listener for node clicks
    network.on("click", (params) => {
      if (params.nodes.length) {
        const nodeId = params.nodes[0];
        const clickedNodeArray = nodes.get(nodeId);
        console.log(clickedNodeArray);
        if (clickedNodeArray && clickedNodeArray[0]) {
          setSelectedTask(clickedNodeArray[0].task);
        }
      } else {
        setSelectedTask(null);
      }
    });
  }, [graphData]);

  return (
    <FlexRowContainer>
      <GraphContainer ref={graphRef} />
      {selectedTask && (
        <TaskDetails>
          <h3>Task:</h3>
          <p>{selectedTask}</p>
        </TaskDetails>
      )}
    </FlexRowContainer>
  );
};

export default Graph;

const GraphContainer = tw.div`
    w-full
    h-full
`;

const FlexRowContainer = tw.div`
  flex
  flex-row
`;

const TaskDetails = tw.div`
  ml-5
  p-2
  border
  border-gray-400
`;
