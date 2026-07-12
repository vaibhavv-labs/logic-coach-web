"use client";

import React, { useEffect, useState } from "react";

export default function TrieVisualizer({ state }) {
  // states: "insert", "search"
  const [activeNodes, setActiveNodes] = useState([]);
  
  // Hardcoded Trie: Root -> C -> A -> T
  //                     -> D -> O -> G
  const trieNodes = {
    0: "ROOT",
    1: "C",
    2: "A",
    3: "T",
    4: "D",
    5: "O",
    6: "G"
  };
  
  useEffect(() => {
    let interval;
    if (state === "insert" || state === "search") {
      const sequence = state === "insert" ? [0, 4, 5, 6] : [0, 1, 2, 3]; // insert DOG, search CAT
      let i = 0;
      interval = setInterval(() => {
        setActiveNodes(prev => {
          if (prev.length === sequence.length) return [sequence[0]];
          return [...prev, sequence[i]];
        });
        i = (i + 1) % sequence.length;
      }, 1000);
    } else {
      setActiveNodes([]);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="visualizer-container tree-visualizer">
      <div className="tree-level">
        <div className={`tree-node ${activeNodes.includes(0) ? "active" : ""}`} style={{ width: 'auto', padding: '0 12px' }}>{trieNodes[0]}</div>
      </div>
      <div className="tree-level" style={{ gap: '64px' }}>
        <div className={`tree-node ${activeNodes.includes(1) ? "active" : ""}`}>{trieNodes[1]}</div>
        <div className={`tree-node ${activeNodes.includes(4) ? "active" : ""}`}>{trieNodes[4]}</div>
      </div>
      <div className="tree-level" style={{ gap: '64px' }}>
        <div className={`tree-node ${activeNodes.includes(2) ? "active" : ""}`}>{trieNodes[2]}</div>
        <div className={`tree-node ${activeNodes.includes(5) ? "active" : ""}`}>{trieNodes[5]}</div>
      </div>
      <div className="tree-level" style={{ gap: '64px' }}>
        <div className={`tree-node ${activeNodes.includes(3) ? "active" : ""}`}>{trieNodes[3]}</div>
        <div className={`tree-node ${activeNodes.includes(6) ? "active" : ""}`}>{trieNodes[6]}</div>
      </div>
    </div>
  );
}
