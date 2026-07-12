"use client";

import React, { useEffect, useState } from "react";

export default function HashtableVisualizer({ state }) {
  // states: "hash", "insert", "collision"
  const [activeBucket, setActiveBucket] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  
  // Array of buckets (Linked Lists)
  const buckets = [
    [15],           // index 0
    [],             // index 1
    [42, 12, 72],   // index 2 (Collision!)
    [],             // index 3
    [9],            // index 4
  ];
  
  useEffect(() => {
    let interval;
    if (state === "hash") {
      setActiveBucket(2);
      setActiveNode(null);
    } else if (state === "collision") {
      setActiveBucket(2);
      const sequence = [0, 1, 2];
      let i = 0;
      interval = setInterval(() => {
        setActiveNode(sequence[i]);
        i = (i + 1) % sequence.length;
      }, 1000);
    } else if (state === "insert") {
      setActiveBucket(4);
      setActiveNode(0);
    } else {
      setActiveBucket(null);
      setActiveNode(null);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
      {buckets.map((chain, bIdx) => (
        <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Bucket Index */}
          <div className={`array-cell ${activeBucket === bIdx && activeNode === null ? "active" : ""}`} style={{ background: 'var(--bg-secondary)', border: '2px solid var(--border)', fontWeight: 'bold' }}>
            {bIdx}
          </div>
          
          {chain.length > 0 && <span style={{ color: 'var(--text-muted)' }}>→</span>}
          
          {/* Linked List Chain */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {chain.map((val, nIdx) => (
              <React.Fragment key={nIdx}>
                <div className={`linked-node ${activeBucket === bIdx && activeNode === nIdx ? "active" : ""}`}>
                  <div className="node-val">{val}</div>
                  <div className="node-next"></div>
                </div>
                {nIdx < chain.length - 1 && <div className="pointer-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
