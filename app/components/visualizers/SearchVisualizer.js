"use client";

import React, { useEffect, useState } from "react";

export default function SearchVisualizer({ state }) {
  // state: "linear", "binary"
  const [arr, setArr] = useState([10, 23, 35, 41, 55, 68, 72, 85, 91]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [pointers, setPointers] = useState({});

  useEffect(() => {
    let interval;
    if (state === "linear") {
      let idx = 0;
      interval = setInterval(() => {
        setActiveIndices([idx]);
        setPointers({ [idx]: "curr" });
        idx = (idx + 1) % arr.length;
      }, 800);
    } else if (state === "binary") {
      const steps = [
        { l: 0, r: 8, m: 4 },
        { l: 5, r: 8, m: 6 },
        { l: 7, r: 8, m: 7 }
      ];
      let stepIdx = 0;
      interval = setInterval(() => {
        const s = steps[stepIdx];
        setActiveIndices([s.m]);
        setPointers({ [s.l]: "L", [s.r]: "R", [s.m]: "M" });
        stepIdx = (stepIdx + 1) % steps.length;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [state, arr.length]);

  return (
    <div className="visualizer-container string-visualizer" style={{ overflowX: 'auto', padding: '10px' }}>
      <div className="array-row">
        {arr.map((val, idx) => {
          const isL = pointers[idx] === "L";
          const isR = pointers[idx] === "R";
          const isM = pointers[idx] === "M";
          const isCurr = pointers[idx] === "curr";
          
          return (
            <div key={idx} className="array-cell-container">
              <div style={{ fontSize: '12px', color: 'var(--accent-orange)', minHeight: '18px' }}>
                {isL && "↓ L"} {isR && "↓ R"} {isM && "↓ M"} {isCurr && "↓ scan"}
              </div>
              <div className={`array-cell ${activeIndices.includes(idx) ? "active" : ""}`}>
                {val}
              </div>
              <span className="array-index">{idx}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
