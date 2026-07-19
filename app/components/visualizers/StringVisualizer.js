"use client";

import React, { useEffect, useState } from "react";

export default function StringVisualizer({ state }) {
  // state: "string", "concat", "substring"
  const [chars, setChars] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [pointers, setPointers] = useState({});

  useEffect(() => {
    let interval;
    if (state === "string") {
      setChars(["S", "T", "R", "I", "N", "G"]);
      let idx = 0;
      interval = setInterval(() => {
        setActiveIndices([idx]);
        setPointers({ [idx]: "i" });
        idx = (idx + 1) % 6;
      }, 1000);
    } else if (state === "concat") {
      setChars(["H", "I", "+", "W", "O", "R", "L", "D"]);
      setActiveIndices([0,1,3,4,5,6,7]);
      setPointers({});
    } else if (state === "substring") {
      setChars(["P", "A", "T", "T", "E", "R", "N"]);
      let start = 0;
      interval = setInterval(() => {
        if (start > 4) start = 0;
        setActiveIndices([start, start+1, start+2]);
        setPointers({ [start]: "start", [start+2]: "end" });
        start++;
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container string-visualizer" style={{ overflowX: 'auto', padding: '10px' }}>
      <div className="array-row">
        {chars.map((char, idx) => (
          <div key={idx} className="array-cell-container">
            {pointers[idx] && <div style={{ fontSize: '12px', color: 'var(--accent)' }}>↓ {pointers[idx]}</div>}
            <div className={`array-cell ${activeIndices.includes(idx) ? "active" : ""}`}>
              {char}
            </div>
            <span className="array-index">{idx}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
