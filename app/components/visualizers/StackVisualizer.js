"use client";

import React, { useEffect, useState } from "react";

export default function StackVisualizer({ state }) {
  // state: "call", "build", "base", "collapse", "push", "pop"
  const [stack, setStack] = useState([]);

  useEffect(() => {
    let interval;
    if (state === "call" || state === "push") {
      setStack(["Item 1"]);
    } else if (state === "build" || state === "base") {
      setStack(["Item 1"]);
      let items = ["Item 1", "Item 2", "Item 3", "Item 4"];
      let idx = 1;
      interval = setInterval(() => {
        if (idx < items.length) {
          setStack(prev => [...prev, items[idx]]);
          idx++;
        }
      }, 1000);
    } else if (state === "collapse" || state === "pop") {
      setStack(["Item 1", "Item 2", "Item 3", "Item 4"]);
      let count = 4;
      interval = setInterval(() => {
        if (count > 0) {
          setStack(prev => prev.slice(0, -1));
          count--;
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container stack-visualizer">
      <div className="stack-container">
        {stack.map((item, idx) => (
          <div key={idx} className="stack-item animate-in">
            {item}
          </div>
        ))}
      </div>
      <div className="stack-base"></div>
    </div>
  );
}
