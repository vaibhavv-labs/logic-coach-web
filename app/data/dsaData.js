export const DSA_TOPICS = [
  {
    id: "arrays",
    title: "Arrays & Basics",
    description: "Traversal, searching, basic operations",
    icon: "📦",
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
    icon: "🎯",
    teachingSteps: [
      { id: "step1", text: "Pointers with Functions (Pass by Reference)", visualType: "array", visualState: "memory" }
    ]
  },
  {
    id: "math",
    title: "Math for DSA",
    description: "Bitwise, primes, Euclidean GCD",
    icon: "🧮",
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
    icon: "⏱️",
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
    icon: "🔤",
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
    icon: "🔄",
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
    icon: "🔗",
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
    icon: "🥞",
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
    icon: "🌳",
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
    icon: "📶",
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
    icon: "🔍",
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
    icon: "🕸️",
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
    icon: "🧠",
    teachingSteps: [
      { id: "step1", text: "Overlapping subproblems (e.g. Fibonacci)", visualType: "dp", visualState: "overlap" },
      { id: "step2", text: "Memoization (Remembering answers)", visualType: "dp", visualState: "memo" }
    ]
  },
  {
    id: "matrices",
    title: "Matrices",
    description: "2D Arrays, traversal, prefix sum",
    icon: "🧮",
    teachingSteps: [
      { id: "step1", text: "What is a 2D Matrix?", visualType: "array", visualState: "matrix" },
      { id: "step2", text: "Matrix Traversal (Row vs Column Major)", visualType: "array", visualState: "matrix" }
    ]
  },
  {
    id: "heaps",
    title: "Heaps",
    description: "Binary heaps, priority queues",
    icon: "⛰️",
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
    icon: "🗂️",
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
    icon: "🌲",
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
    icon: "🔗",
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
    icon: "🤑",
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
    icon: "🔙",
    teachingSteps: [
      { id: "step1", text: "What is Backtracking?", visualType: "recursion", visualState: "build" },
      { id: "step2", text: "N-Queens Problem", visualType: "recursion", visualState: "collapse" },
      { id: "step3", text: "Sudoku Solver", visualType: "recursion", visualState: "build" }
    ]
  }
];
