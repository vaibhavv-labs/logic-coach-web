"use client";

import React, { useEffect, useState } from "react";

export default function ArrayVisualizer({ state }) {
  // state could be: "empty", "memory", "access", "traverse", "string", "concat", "substring", "linear", "binary"
  const [elements, setElements] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let interval;
    if (state === "empty") {
      setElements([12, 45, 7, 89, 3]);
      setActiveIndex(null);
    } else if (state === "memory") {
      setElements([10, 20, 30, 40, 50]);
      setActiveIndex(null);
    } else if (state === "access") {
      setElements([10, 20, 30, 40, 50]);
      setActiveIndex(2); // Highlighting index 2
    } else if (state === "traverse" || state === "linear") {
      setElements([10, 20, 30, 40, 50]);
      setActiveIndex(0);
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % 5;
        setActiveIndex(idx);
      }, 1000);
    } else if (state === "binary") {
      setElements([10, 20, 30, 40, 50, 60, 70]);
      let steps = [[0,6,3], [4,6,5], [5,5,5]]; // low, high, mid
      let stepIdx = 0;
      setActiveIndex(steps[0]);
      interval = setInterval(() => {
        stepIdx = (stepIdx + 1) % steps.length;
        setActiveIndex(steps[stepIdx]);
      }, 2000);
    } else if (state === "string") {
      setElements(["H", "E", "L", "L", "O"]);
      setActiveIndex(null);
    } else if (state === "concat") {
      setElements(["H", "I", "+", "W", "O", "R", "L", "D"]);
      setActiveIndex(null);
    } else if (state === "substring") {
      setElements(["C", "O", "D", "E", "R"]);
      setActiveIndex([1, 2, 3]); // highlight O, D, E
    } else if (state === "matrix") {
      setElements([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]);
      setActiveIndex([1, 1]); // highlight center
    }

    return () => clearInterval(interval);
  }, [state]);

  const renderBinarySearch = (low, high, mid) => {
    return elements.map((el, idx) => (
      <div key={idx} className="array-cell-container">
        <div className={`array-cell ${idx === mid ? "active" : ""} ${idx >= low && idx <= high ? "in-range" : "out-range"}`}>
          {el !== null ? el : ""}
        </div>
        <span className="array-index">{idx}</span>
      </div>
    ));
  };

  return (
    <div className="visualizer-container array-visualizer">
      {state === "matrix" ? (
        <div className="matrix-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {elements.map((row, rIdx) => (
            <div key={rIdx} className="array-row">
              {row.map((el, cIdx) => {
                const isActive = activeIndex && activeIndex[0] === rIdx && activeIndex[1] === cIdx;
                return (
                  <div key={cIdx} className="array-cell-container">
                    <div className={`array-cell ${isActive ? "active" : ""}`}>
                      {el !== null ? el : ""}
                    </div>
                    <span className="array-index">[{rIdx},{cIdx}]</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="array-row">
          {state === "binary" && Array.isArray(activeIndex) ? (
            renderBinarySearch(activeIndex[0], activeIndex[1], activeIndex[2])
          ) : (
            elements.map((el, idx) => {
              let isActive = false;
              if (Array.isArray(activeIndex)) {
                isActive = activeIndex.includes(idx);
              } else {
                isActive = activeIndex === idx;
              }
              
              return (
                <div key={idx} className="array-cell-container">
                  <div className={`array-cell ${isActive ? "active" : ""} ${state === 'memory' ? 'memory-view' : ''}`}>
                    {el !== null ? el : ""}
                  </div>
                  <span className="array-index">
                    {state === 'memory' ? `0x${(4096 + idx * 4).toString(16).toUpperCase()}` : idx}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
