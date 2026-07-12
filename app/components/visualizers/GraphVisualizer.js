"use client";

import React, { useEffect, useState } from "react";

export default function GraphVisualizer({ state }) {
  // state: "basic", "directed", "bfs", "dfs"
  const [activeNodes, setActiveNodes] = useState([]);

  useEffect(() => {
    let interval;
    if (state === "bfs") {
      const order = [[1], [2, 3], [4, 5, 6]];
      let step = 0;
      interval = setInterval(() => {
        setActiveNodes(order[step % order.length]);
        step++;
      }, 1000);
    } else if (state === "dfs") {
      const order = [[1], [2], [4], [5], [3], [6]];
      let step = 0;
      interval = setInterval(() => {
        setActiveNodes(order[step % order.length]);
        step++;
      }, 800);
    } else {
      setActiveNodes([]);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container graph-visualizer">
      <svg viewBox="0 0 200 150" className="graph-svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>
        {/* Edges */}
        <line x1="100" y1="30" x2="50" y2="80" stroke="#475569" strokeWidth="2" markerEnd={state === "directed" ? "url(#arrow)" : ""} />
        <line x1="100" y1="30" x2="150" y2="80" stroke="#475569" strokeWidth="2" markerEnd={state === "directed" ? "url(#arrow)" : ""} />
        <line x1="50" y1="80" x2="30" y2="130" stroke="#475569" strokeWidth="2" markerEnd={state === "directed" ? "url(#arrow)" : ""} />
        <line x1="50" y1="80" x2="80" y2="130" stroke="#475569" strokeWidth="2" markerEnd={state === "directed" ? "url(#arrow)" : ""} />
        <line x1="150" y1="80" x2="170" y2="130" stroke="#475569" strokeWidth="2" markerEnd={state === "directed" ? "url(#arrow)" : ""} />

        {/* Nodes */}
        <circle cx="100" cy="30" r="15" className={`graph-node ${activeNodes.includes(1) ? "active" : ""}`} />
        <text x="100" y="35" textAnchor="middle" fill="white" fontSize="10">1</text>
        
        <circle cx="50" cy="80" r="15" className={`graph-node ${activeNodes.includes(2) ? "active" : ""}`} />
        <text x="50" y="85" textAnchor="middle" fill="white" fontSize="10">2</text>
        
        <circle cx="150" cy="80" r="15" className={`graph-node ${activeNodes.includes(3) ? "active" : ""}`} />
        <text x="150" y="85" textAnchor="middle" fill="white" fontSize="10">3</text>

        <circle cx="30" cy="130" r="15" className={`graph-node ${activeNodes.includes(4) ? "active" : ""}`} />
        <text x="30" y="135" textAnchor="middle" fill="white" fontSize="10">4</text>

        <circle cx="80" cy="130" r="15" className={`graph-node ${activeNodes.includes(5) ? "active" : ""}`} />
        <text x="80" y="135" textAnchor="middle" fill="white" fontSize="10">5</text>

        <circle cx="170" cy="130" r="15" className={`graph-node ${activeNodes.includes(6) ? "active" : ""}`} />
        <text x="170" y="135" textAnchor="middle" fill="white" fontSize="10">6</text>
      </svg>
    </div>
  );
}
