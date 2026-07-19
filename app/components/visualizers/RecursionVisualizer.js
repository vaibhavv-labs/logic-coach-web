"use client";

import React, { useEffect, useState } from "react";

export default function RecursionVisualizer({ state }) {
  // state: "call", "build", "base", "collapse"
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    let interval;
    if (state === "call") {
      setFrames(["fib(4)"]);
    } else if (state === "build") {
      setFrames(["fib(4)"]);
      let items = ["fib(4)", "fib(3)", "fib(2)", "fib(1)"];
      let idx = 1;
      interval = setInterval(() => {
        if (idx < items.length) {
          setFrames(prev => [...prev, items[idx]]);
          idx++;
        }
      }, 1000);
    } else if (state === "base") {
      setFrames(["fib(4)", "fib(3)", "fib(2)", "fib(1) -> 1 (BASE CASE)"]);
    } else if (state === "collapse") {
      setFrames(["fib(4)", "fib(3)", "fib(2)", "fib(1) -> 1"]);
      let count = 4;
      interval = setInterval(() => {
        if (count > 0) {
          setFrames(prev => prev.slice(0, -1));
          count--;
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container stack-visualizer" style={{ overflowX: 'auto', padding: '10px' }}>
      <div className="stack-container" style={{ width: '200px' }}>
        {frames.map((frame, idx) => (
          <div key={idx} className="stack-item animate-in" style={{ background: state === 'base' && idx === frames.length-1 ? 'var(--success)' : 'var(--accent)' }}>
            {frame}
          </div>
        ))}
      </div>
      <div className="stack-base" style={{ width: '200px' }}></div>
    </div>
  );
}
