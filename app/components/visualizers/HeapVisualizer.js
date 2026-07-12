"use client";

import React, { useEffect, useState } from "react";

export default function HeapVisualizer({ state }) {
  // states: "insert", "heapify", "extract"
  const [activeNodes, setActiveNodes] = useState([]);
  
  const heapArray = [90, 80, 70, 60, 50, 40, 30]; // Max Heap
  
  useEffect(() => {
    let interval;
    if (state === "insert") {
      const sequence = [6, 2, 0]; // Simulating bubbling up from index 6 -> 2 -> 0
      let i = 0;
      interval = setInterval(() => {
        setActiveNodes([sequence[i]]);
        i = (i + 1) % sequence.length;
      }, 1000);
    } else if (state === "heapify") {
      const sequence = [0, 1, 3]; // Simulating sinking down 0 -> 1 -> 3
      let i = 0;
      interval = setInterval(() => {
        setActiveNodes([sequence[i]]);
        i = (i + 1) % sequence.length;
      }, 1000);
    } else if (state === "extract") {
      const sequence = [0, 6]; // Swap root with last element
      let i = 0;
      interval = setInterval(() => {
        setActiveNodes([sequence[i]]);
        i = (i + 1) % sequence.length;
      }, 1000);
    } else {
      setActiveNodes([]);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container tree-visualizer" style={{ flexDirection: 'column' }}>
      <div className="tree-level">
        <div className={`tree-node ${activeNodes.includes(0) ? "active" : ""}`}>{heapArray[0]}</div>
      </div>
      <div className="tree-level">
        <div className={`tree-node ${activeNodes.includes(1) ? "active" : ""}`}>{heapArray[1]}</div>
        <div className={`tree-node ${activeNodes.includes(2) ? "active" : ""}`}>{heapArray[2]}</div>
      </div>
      <div className="tree-level">
        <div className={`tree-node ${activeNodes.includes(3) ? "active" : ""}`}>{heapArray[3]}</div>
        <div className={`tree-node ${activeNodes.includes(4) ? "active" : ""}`}>{heapArray[4]}</div>
        <div className={`tree-node ${activeNodes.includes(5) ? "active" : ""}`}>{heapArray[5]}</div>
        <div className={`tree-node ${activeNodes.includes(6) ? "active" : ""}`}>{heapArray[6]}</div>
      </div>
      
      <div className="array-row" style={{ marginTop: '24px' }}>
        {heapArray.map((el, idx) => (
          <div key={idx} className="array-cell-container">
            <div className={`array-cell ${activeNodes.includes(idx) ? "active" : ""}`}>
              {el}
            </div>
            <span className="array-index">{idx}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
