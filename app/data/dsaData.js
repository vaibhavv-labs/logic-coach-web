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
      { id: "step4", text: "How to traverse it?", visualType: "array", visualState: "traverse" }
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
      { id: "step4", text: "Doubly Linked Lists", visualType: "linkedlist", visualState: "doubly" }
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
      { id: "step4", text: "Queue Dequeue operation", visualType: "queue", visualState: "dequeue" }
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
      { id: "step4", text: "Tree Traversals (In-order, Pre-order)", visualType: "tree", visualState: "traverse" }
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
      { id: "step4", text: "Merge Sort (Divide and conquer)", visualType: "sorting", visualState: "merge" }
    ]
  },
  {
    id: "searching",
    title: "Searching Algorithms",
    description: "Linear, binary",
    icon: "🔍",
    teachingSteps: [
      { id: "step1", text: "Linear Search (Checking one by one)", visualType: "search", visualState: "linear" },
      { id: "step2", text: "Binary Search (Divide in half)", visualType: "search", visualState: "binary" }
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
      { id: "step4", text: "Depth-First Search (DFS)", visualType: "graph", visualState: "dfs" }
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
  }
];
