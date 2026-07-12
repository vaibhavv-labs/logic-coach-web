"use client";

import React, { useEffect, useState } from "react";

export default function DPVisualizer({ state }) {
  // state: "overlap", "memo"
  const [grid, setGrid] = useState(Array(5).fill(null));
  const [activeIndex, setActiveIndex] = useState(null);
  const [deps, setDeps] = useState([]);

  useEffect(() => {
    let interval;
    if (state === "overlap") {
      // Show overlapping calls
      setGrid(["fib(0)", "fib(1)", "fib(2)", "fib(3)", "fib(4)"]);
      let step = 0;
      interval = setInterval(() => {
        const pairs = [[2], [0, 1], [3], [1, 2], [4], [2, 3]];
        setActiveIndex(pairs[step % pairs.length][0]);
        setDeps(pairs[step % pairs.length].slice(1));
        step++;
      }, 1200);
    } else if (state === "memo") {
      // Filling grid
      setGrid([0, 1, null, null, null]);
      let step = 2;
      interval = setInterval(() => {
        setGrid(prev => {
          const next = [...prev];
          if (step < 5) {
            next[step] = next[step-1] + next[step-2];
            setActiveIndex(step);
            setDeps([step-1, step-2]);
            step++;
          } else {
            step = 2; // reset for loop
            return [0, 1, null, null, null];
          }
          return next;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container dp-visualizer" style={{ overflowX: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', minWidth: '300px' }}>
        {grid.map((val, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>i={idx}</span>
            <div className={`array-cell ${activeIndex === idx ? 'active' : ''} ${deps.includes(idx) ? 'in-range' : ''}`} style={{ width: '60px', height: '60px', fontSize: typeof val === 'string' ? '12px' : '24px' }}>
              {val !== null ? val : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
