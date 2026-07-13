import React from "react";
export const DSA_TOPICS = [
  {
    id: "arrays",
    title: "Arrays & Basics",
    description: "Traversal, searching, basic operations",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 4h4v16h-4z"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is an array?", visualType: "array", visualState: "empty" },
      { id: "step2", text: "How is it stored in memory?", visualType: "array", visualState: "memory" },
      { id: "step3", text: "How to access an element by index?", visualType: "array", visualState: "access" },
      { id: "step4", text: "How to traverse it?", visualType: "array", visualState: "traverse" },
      { id: "step5", text: "Multidimensional Arrays", visualType: "array", visualState: "memory" },
      { id: "step6", text: "Pass-by-Value and Pass-by-Reference", visualType: "text", visualState: "math" },
      { id: "step7", text: "Dynamic Memory Allocation", visualType: "text", visualState: "math" }
    ]
  },
  {
    id: "functions",
    title: "Functions & Pointers",
    description: "Memory addressing, pass-by-reference",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Pointers with Functions (Pass by Reference)", visualType: "array", visualState: "memory" }
    ]
  },
  {
    id: "math",
    title: "Math for DSA",
    description: "Bitwise, primes, Euclidean GCD",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Bitwise Operators & Bit Manipulation", visualType: "text", visualState: "math" },
      { id: "step2", text: "Prime Number Algorithms", visualType: "text", visualState: "math" },
      { id: "step3", text: "Square Root Algorithms", visualType: "text", visualState: "math" },
      { id: "step4", text: "HCF/LCM & Euclidean Algorithm", visualType: "text", visualState: "math" }
    ]
  },
  {
    id: "complexity",
    title: "Time & Space Complexity",
    description: "Big O, Omega, Theta analysis",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Asymptotic Notation (Big O, Omega, Theta)", visualType: "text", visualState: "time" },
      { id: "step2", text: "Time Complexity Calculation", visualType: "text", visualState: "time" },
      { id: "step3", text: "Best, Worst, and Average Case", visualType: "text", visualState: "time" }
    ]
  },
  {
    id: "strings",
    title: "Strings",
    description: "Manipulation, patterns",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><text x="12" y="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="14" fill="currentColor">ab</text></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Strings as character arrays", visualType: "string", visualState: "string" },
      { id: "step2", text: "String manipulation (concatenation)", visualType: "string", visualState: "concat" },
      { id: "step3", text: "Substring and patterns", visualType: "string", visualState: "substring" }
    ]
  },
  {
    id: "recursion",
    title: "Recursion",
    description: "Base case, recursive thinking",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is a function calling itself?", visualType: "recursion", visualState: "call" },
      { id: "step2", text: "The Call Stack building up", visualType: "recursion", visualState: "build" },
      { id: "step3", text: "The Base Case (When to stop)", visualType: "recursion", visualState: "base" },
      { id: "step4", text: "The Call Stack collapsing", visualType: "recursion", visualState: "collapse" }
    ]
  },
  {
    id: "linkedlists",
    title: "Linked Lists",
    description: "Singly, then doubly",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Nodes and Pointers", visualType: "linkedlist", visualState: "node" },
      { id: "step2", text: "Connecting Nodes (Singly)", visualType: "linkedlist", visualState: "singly" },
      { id: "step3", text: "Traversing a Linked List", visualType: "linkedlist", visualState: "traverse" },
      { id: "step4", text: "Doubly Linked Lists", visualType: "linkedlist", visualState: "doubly" },
      { id: "step5", text: "Circular Linked List", visualType: "linkedlist", visualState: "singly" }
    ]
  },
  {
    id: "stacksqueues",
    title: "Stacks & Queues",
    description: "LIFO vs FIFO",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M4 14h16v2H4zM4 10h16v2H4zM4 6h16v2H4z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Stack: Last In, First Out (LIFO)", visualType: "stack", visualState: "push" },
      { id: "step2", text: "Stack Pop operation", visualType: "stack", visualState: "pop" },
      { id: "step3", text: "Queue: First In, First Out (FIFO)", visualType: "queue", visualState: "enqueue" },
      { id: "step4", text: "Queue Dequeue operation", visualType: "queue", visualState: "dequeue" },
      { id: "step5", text: "Stack using Array", visualType: "text", visualState: "math" },
      { id: "step6", text: "Stack using Linked List", visualType: "text", visualState: "math" },
      { id: "step7", text: "Queue using Array", visualType: "text", visualState: "math" },
      { id: "step8", text: "Queue using Linked List", visualType: "text", visualState: "math" },
      { id: "step9", text: "Stack Using Queue", visualType: "text", visualState: "math" },
      { id: "step10", text: "Circular Queue", visualType: "queue", visualState: "enqueue" },
      { id: "step11", text: "Priority Queue", visualType: "text", visualState: "math" },
      { id: "step12", text: "Double Ended Queue", visualType: "queue", visualState: "enqueue" }
    ]
  },
  {
    id: "trees",
    title: "Trees",
    description: "Binary trees, BST, traversals",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="3" fill="currentColor"/><circle cx="6" cy="16" r="3" fill="currentColor"/><circle cx="18" cy="16" r="3" fill="currentColor"/><path d="M12 9v4l-4 3M12 13l4 3" stroke="currentColor" strokeWidth="2" fill="none"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Hierarchical structure (Root, Leaves)", visualType: "tree", visualState: "basic" },
      { id: "step2", text: "Binary Trees", visualType: "tree", visualState: "binary" },
      { id: "step3", text: "Binary Search Tree (BST) property", visualType: "tree", visualState: "bst" },
      { id: "step4", text: "Tree Traversals (In-order, Pre-order)", visualType: "tree", visualState: "traverse" },
      { id: "step5", text: "Inorder Traversal", visualType: "tree", visualState: "traverse" },
      { id: "step6", text: "Preorder Traversal", visualType: "tree", visualState: "traverse" },
      { id: "step7", text: "Postorder Traversal", visualType: "tree", visualState: "traverse" },
      { id: "step8", text: "Types of Binary Tree", visualType: "text", visualState: "math" },
      { id: "step9", text: "AVL Tree", visualType: "tree", visualState: "bst" },
      { id: "step10", text: "RB Tree", visualType: "tree", visualState: "bst" },
      { id: "step11", text: "B-Tree", visualType: "tree", visualState: "basic" },
      { id: "step12", text: "Splay Tree", visualType: "tree", visualState: "bst" },
      { id: "step13", text: "Huffman Coding", visualType: "tree", visualState: "binary" }
    ]
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Bubble, selection, insertion, merge, quick",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M4 20h2V12H4v8zm5 0h2V8H9v12zm5 0h2V4h-2v16zm5 0h2v-8h-2v8z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Why do we need sorting?", visualType: "sorting", visualState: "unsorted" },
      { id: "step2", text: "Bubble Sort (Swapping adjacent)", visualType: "sorting", visualState: "bubble" },
      { id: "step3", text: "Selection Sort (Finding minimum)", visualType: "sorting", visualState: "selection" },
      { id: "step4", text: "Merge Sort (Divide and conquer)", visualType: "sorting", visualState: "merge" },
      { id: "step5", text: "Insertion Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step6", text: "Quick Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step7", text: "Counting Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step8", text: "Radix Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step9", text: "Bucket Sort", visualType: "sorting", visualState: "unsorted" }
    ]
  },
  {
    id: "searching",
    title: "Searching Algorithms",
    description: "Linear, binary",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Linear Search (Checking one by one)", visualType: "search", visualState: "linear" },
      { id: "step2", text: "Binary Search (Divide in half)", visualType: "search", visualState: "binary" },
      { id: "step3", text: "Ternary Search", visualType: "search", visualState: "binary" }
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "BFS, DFS, basic traversal",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="5" cy="7" r="3" fill="currentColor"/><circle cx="19" cy="7" r="3" fill="currentColor"/><circle cx="8" cy="19" r="3" fill="currentColor"/><circle cx="16" cy="19" r="3" fill="currentColor"/><path d="M12 12L5 7M12 12l7-5M12 12l-4 7M12 12l4 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Nodes (Vertices) and Edges", visualType: "graph", visualState: "basic" },
      { id: "step2", text: "Directed vs Undirected", visualType: "graph", visualState: "directed" },
      { id: "step3", text: "Breadth-First Search (BFS)", visualType: "graph", visualState: "bfs" },
      { id: "step4", text: "Depth-First Search (DFS)", visualType: "graph", visualState: "dfs" },
      { id: "step5", text: "Adjacency List", visualType: "graph", visualState: "basic" },
      { id: "step6", text: "Adjacency Matrix", visualType: "graph", visualState: "basic" },
      { id: "step7", text: "Topological Sorting", visualType: "graph", visualState: "directed" },
      { id: "step8", text: "Prim's Algorithm", visualType: "graph", visualState: "bfs" },
      { id: "step9", text: "Kruskal's Algorithm", visualType: "graph", visualState: "bfs" },
      { id: "step10", text: "Dijkstra's Algorithm", visualType: "graph", visualState: "bfs" }
    ]
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    description: "Basic memoization concepts",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M12 3l9 6-9 6-9-6 9-6zm0 15l-9-6v3l9 6 9-6v-3l-9 6z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "Overlapping subproblems (e.g. Fibonacci)", visualType: "dp", visualState: "overlap" },
      { id: "step2", text: "Memoization (Remembering answers)", visualType: "dp", visualState: "memo" }
    ]
  },
  {
    id: "matrices",
    title: "Matrices",
    description: "2D Arrays, traversal, prefix sum",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is a 2D Matrix?", visualType: "array", visualState: "matrix" },
      { id: "step2", text: "Matrix Traversal (Row vs Column Major)", visualType: "array", visualState: "matrix" }
    ]
  },
  {
    id: "heaps",
    title: "Heaps",
    description: "Binary heaps, priority queues",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M12 3l9 18H3z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is a Binary Heap?", visualType: "heap", visualState: "insert" },
      { id: "step2", text: "Insertion (Bubbling Up)", visualType: "heap", visualState: "insert" },
      { id: "step3", text: "Deletion (Extract Min/Max)", visualType: "heap", visualState: "extract" },
      { id: "step4", text: "Heapify (Sinking Down)", visualType: "heap", visualState: "heapify" },
      { id: "step5", text: "Heapsort", visualType: "heap", visualState: "heapify" }
    ]
  },
  {
    id: "maps",
    title: "Maps & Hashtables",
    description: "Key-value pairs, hash functions, collisions",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is a Hash Function?", visualType: "hashtable", visualState: "hash" },
      { id: "step2", text: "Inserting Key-Value Pairs", visualType: "hashtable", visualState: "insert" },
      { id: "step3", text: "Handling Collisions (Separate Chaining)", visualType: "hashtable", visualState: "collision" }
    ]
  },
  {
    id: "tries",
    title: "Tries",
    description: "Prefix trees, string matching",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M12 2L4 12h5v10h6V12h5L12 2z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is a Trie (Prefix Tree)?", visualType: "trie", visualState: "search" },
      { id: "step2", text: "Types of Tries (Standard, Compressed, Suffix)", visualType: "text", visualState: "text" },
      { id: "step3", text: "Insertion Operation", visualType: "trie", visualState: "insert" },
      { id: "step4", text: "Search Operation", visualType: "trie", visualState: "search" }
    ]
  },
  {
    id: "disjointset",
    title: "Disjoint Set (Union-Find)",
    description: "Sets, Unions, Path Compression",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is a Disjoint Set?", visualType: "text", visualState: "text" },
      { id: "step2", text: "Union Operation", visualType: "text", visualState: "text" },
      { id: "step3", text: "Find Operation & Path Compression", visualType: "text", visualState: "text" }
    ]
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    description: "Local optimal choices, Fractional Knapsack",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2H9v-4h4V9H9V7h2V5h2v2h2v4h-4v2h4v4h-2v2z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "The Greedy Choice Property", visualType: "text", visualState: "text" },
      { id: "step2", text: "Fractional Knapsack Problem", visualType: "text", visualState: "text" },
      { id: "step3", text: "Activity Selection Problem", visualType: "text", visualState: "text" }
    ]
  },
  {
    id: "backtracking",
    title: "Backtracking Algorithms",
    description: "Exploring paths, reverting on failure",
    icon: ( <span dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/></svg>' }} /> ),
    teachingSteps: [
      { id: "step1", text: "What is Backtracking?", visualType: "recursion", visualState: "build" },
      { id: "step2", text: "N-Queens Problem", visualType: "recursion", visualState: "collapse" },
      { id: "step3", text: "Sudoku Solver", visualType: "recursion", visualState: "build" }
    ]
  }
];
