"use client";

import React, { useEffect, useState } from "react";

export default function BarsVisualizer({ state }) {
  // state: "unsorted", "bubble", "selection", "merge"
  const [bars, setBars] = useState([50, 20, 80, 40, 90, 10, 60]);
  const [activeIndices, setActiveIndices] = useState([]);

  useEffect(() => {
    let interval;
    if (state === "unsorted") {
      setBars([50, 20, 80, 40, 90, 10, 60]);
      setActiveIndices([]);
    } else if (state === "bubble") {
      setBars([50, 20, 80, 40, 90, 10, 60]);
      let step = 0;
      interval = setInterval(() => {
        const pairs = [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]];
        setActiveIndices(pairs[step % pairs.length]);
        step++;
      }, 500);
    } else if (state === "selection") {
      setBars([50, 20, 80, 40, 90, 10, 60]);
      let minIdx = 5;
      let currIdx = 0;
      interval = setInterval(() => {
        setActiveIndices([minIdx, currIdx % 7]);
        currIdx++;
      }, 500);
    } else if (state === "merge") {
      // Simulate split
      interval = setInterval(() => {
        setBars(prev => {
          if (prev.length === 7) return [50, 20, 80, 40];
          return [50, 20, 80, 40, 90, 10, 60];
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container bars-visualizer">
      <div className="bars-row">
        {bars.map((height, idx) => (
          <div
            key={idx}
            className={`bar ${activeIndices.includes(idx) ? "active" : ""}`}
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
