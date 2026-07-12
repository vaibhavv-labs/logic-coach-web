"use client";

import React, { useEffect, useState } from "react";

export default function LinkedListVisualizer({ state }) {
  // state: "node", "singly", "traverse", "doubly"
  const [nodes, setNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    let interval;
    if (state === "node") {
      setNodes([{ val: 10 }]);
      setActiveNode(null);
    } else if (state === "singly") {
      setNodes([{ val: 10 }, { val: 20 }, { val: 30 }]);
      setActiveNode(null);
    } else if (state === "traverse") {
      setNodes([{ val: 10 }, { val: 20 }, { val: 30 }, { val: 40 }]);
      setActiveNode(0);
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % 4;
        setActiveNode(idx);
      }, 1000);
    } else if (state === "doubly") {
      setNodes([{ val: 10 }, { val: 20 }, { val: 30 }]);
      setActiveNode(null);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container ll-visualizer">
      <div className="ll-row">
        {nodes.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className={`ll-node ${activeNode === idx ? "active" : ""}`}>
              <div className="ll-val">{node.val}</div>
              <div className="ll-ptr">•</div>
            </div>
            {idx < nodes.length - 1 && (
              <div className={`ll-arrow ${state === "doubly" ? "doubly" : ""}`}>
                {state === "doubly" ? "↔" : "→"}
              </div>
            )}
          </React.Fragment>
        ))}
        {nodes.length > 0 && <div className="ll-null">NULL</div>}
      </div>
    </div>
  );
}
