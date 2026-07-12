"use client";

import React, { useEffect, useState } from "react";

export default function TreeVisualizer({ state }) {
  // state: "basic", "binary", "bst", "traverse", "overlap"
  const [activeNodes, setActiveNodes] = useState([]);

  useEffect(() => {
    let interval;
    if (state === "traverse") {
      const traversalOrder = [4, 2, 5, 1, 6, 3, 7]; // In-order indices roughly
      let idx = 0;
      interval = setInterval(() => {
        setActiveNodes([traversalOrder[idx]]);
        idx = (idx + 1) % traversalOrder.length;
      }, 1000);
    } else if (state === "overlap") {
      setActiveNodes([2, 5]); // highlighting overlapping subproblems
    } else {
      setActiveNodes([]);
    }
    return () => clearInterval(interval);
  }, [state]);

  const bstNodes = {
    1: 50,
    2: 30,
    3: 70,
    4: 20,
    5: 40,
    6: 60,
    7: 80
  };

  const normalNodes = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7
  };

  const nodes = state === "bst" ? bstNodes : normalNodes;

  return (
    <div className="visualizer-container tree-visualizer">
      <div className="tree-level">
        <div className={`tree-node ${activeNodes.includes(1) ? "active" : ""}`}>{nodes[1]}</div>
      </div>
      <div className="tree-level">
        <div className={`tree-node ${activeNodes.includes(2) ? "active" : ""}`}>{nodes[2]}</div>
        <div className={`tree-node ${activeNodes.includes(3) ? "active" : ""}`}>{nodes[3]}</div>
      </div>
      <div className="tree-level">
        <div className={`tree-node ${activeNodes.includes(4) ? "active" : ""}`}>{nodes[4]}</div>
        <div className={`tree-node ${activeNodes.includes(5) ? "active" : ""}`}>{nodes[5]}</div>
        <div className={`tree-node ${activeNodes.includes(6) ? "active" : ""}`}>{nodes[6]}</div>
        <div className={`tree-node ${activeNodes.includes(7) ? "active" : ""}`}>{nodes[7]}</div>
      </div>
      {/* CSS will draw lines connecting them ideally, or we just rely on flex layout for the diagram */}
    </div>
  );
}
