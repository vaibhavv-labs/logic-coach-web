export const DSA_TOPICS = [
  {
    id: "arrays",
    title: "Arrays & Basics",
    description: "Traversal, searching, basic operations",
    icon: "📦",
    teachingSteps: [
      { 
        id: "step1", 
        text: "What is an array?", 
        visualType: "array", 
        visualState: "empty",
        codeLanguage: "Python",
        codeSnippet: "# Creating an array (list) in Python\nmy_array = [7, 12, 9, 4, 11]\nprint(\"Array created! Length:\", len(my_array))",
        explanation: "An **Array** is one of the most basic and important data structures. It is used to store a collection of elements (like numbers, strings, or objects) in a contiguous block of memory. \n\nThink of an array like a row of mailboxes: each mailbox has a specific number (an **index**) and can hold exactly one item. Arrays are incredibly useful when you need to keep track of a list of related items, such as the scores of players in a game or a list of temperatures for the week."
      },
      { 
        id: "step2", 
        text: "How is it stored in memory?", 
        visualType: "array", 
        visualState: "memory",
        explanation: "In computer memory, an array is stored in a **contiguous (continuous) block**. This means all the elements sit right next to each other in RAM. \n\nBecause of this structure, the computer knows exactly where every item is if it knows the starting location and the size of one item. This allows for extremely fast lookups. However, because the size is often fixed when the array is created, it can be difficult to resize it later without copying all the data to a new, larger block of memory."
      },
      { 
        id: "step3", 
        text: "How to access an element by index?", 
        visualType: "array", 
        visualState: "access",
        codeLanguage: "Python",
        codeSnippet: "my_array = [7, 12, 9, 4, 11]\n\n# Accessing the first element (0-indexed)\nfirst_element = my_array[0]\nprint(\"First element:\", first_element) # Output: 7\n\n# Accessing the last element\nlast_element = my_array[4]\nprint(\"Last element:\", last_element) # Output: 11",
        explanation: "Every element in an array has a numbered position called an **index**. In almost all modern programming languages (including Python, Java, C++, and JavaScript), arrays are **zero-indexed**. This means the very first element is at index `0`, the second is at index `1`, and so on.\n\nTo read or change an item, you just use square brackets with the index number, like `my_array[0]`. This operation takes **O(1)** time, meaning it is instantly fast regardless of how big the array is!"
      },
      { 
        id: "step4", 
        text: "How to traverse it?", 
        visualType: "array", 
        visualState: "traverse",
        codeLanguage: "Python",
        codeSnippet: "my_array = [7, 12, 9, 4, 11]\n\n# Traversing using a for loop\nfor element in my_array:\n    print(element)\n\n# Finding the lowest value\nlowest = my_array[0]\nfor num in my_array:\n    if num < lowest:\n        lowest = num\nprint(\"Lowest value:\", lowest)",
        explanation: "**Traversal** means visiting every single element in the array one by one, usually from the beginning to the end. \n\nWe typically use a **loop** (like a `for` loop) to traverse arrays. This is useful when you need to perform an action on every item—such as printing them to the screen, adding them all together to find a sum, or searching for a specific value like the lowest or highest number."
      },
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
