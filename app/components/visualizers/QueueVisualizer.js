"use client";

import React, { useEffect, useState } from "react";

export default function QueueVisualizer({ state }) {
  // state: "enqueue", "dequeue"
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    let interval;
    if (state === "enqueue") {
      setQueue([]);
      let items = ["Q1", "Q2", "Q3"];
      let idx = 0;
      interval = setInterval(() => {
        if (idx < items.length) {
          setQueue(prev => [...prev, items[idx]]);
          idx++;
        }
      }, 1000);
    } else if (state === "dequeue") {
      setQueue(["Q1", "Q2", "Q3", "Q4"]);
      let count = 4;
      interval = setInterval(() => {
        if (count > 0) {
          setQueue(prev => prev.slice(1));
          count--;
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container queue-visualizer">
      <div className="queue-row">
        <div className="queue-label">Front</div>
        <div className="queue-tube">
          {queue.map((item, idx) => (
            <div key={item + idx} className="queue-item animate-in">
              {item}
            </div>
          ))}
        </div>
        <div className="queue-label">Back</div>
      </div>
    </div>
  );
}
