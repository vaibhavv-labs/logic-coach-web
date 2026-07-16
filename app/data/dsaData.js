export const DSA_TOPICS = [
  {
    id: "arrays",
    title: "1. Arrays",
    description: "Memory, traversal, multidimensional",
    icon: "📦",
    teachingSteps: [
      { 
        id: "step1", 
        text: "What is an array?", 
        visualType: "array", 
        visualState: "empty",
        explanation: "An **Array** is one of the most basic and important data structures. It is used to store a collection of elements (like numbers, strings, or objects) in a contiguous block of memory. \n\nThink of an array like a row of mailboxes: each mailbox has a specific number (an **index**) and can hold exactly one item. Arrays are incredibly useful when you need to keep track of a list of related items.",
        codeSnippets: {
          "Python": "# Python lists act as dynamic arrays\nmy_array = [7, 12, 9, 4, 11]\nprint(\"Length:\", len(my_array))",
          "C++": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int myArray[5] = {7, 12, 9, 4, 11};\n    cout << \"First element: \" << myArray[0];\n}",
          "Java": "public class Main {\n    public static void main(String[] args) {\n        int[] myArray = {7, 12, 9, 4, 11};\n        System.out.println(\"Length: \" + myArray.length);\n    }\n}",
          "JavaScript": "let myArray = [7, 12, 9, 4, 11];\nconsole.log(\"Length:\", myArray.length);"
        }
      },
      { 
        id: "step2", 
        text: "How is it stored in memory?", 
        visualType: "array", 
        visualState: "memory",
        explanation: "In computer memory, an array is stored in a **contiguous (continuous) block**. This means all the elements sit right next to each other in RAM. \n\nBecause of this structure, the computer knows exactly where every item is if it knows the starting location and the size of one item. This allows for extremely fast lookups. However, because the size is often fixed when the array is created, it can be difficult to resize it later without copying all the data to a new, larger block of memory.",
        codeSnippets: {
          "Python": "# Memory blocks are handled by Python\narr = [10, 20, 30]\n# elements are stored continuously",
          "C++": "int arr[3] = {10, 20, 30};\ncout << &arr[0] << endl; // e.g. 0x7ffe0001\ncout << &arr[1] << endl; // e.g. 0x7ffe0005 (4 bytes later)",
          "Java": "// Java manages memory, but arrays are contiguous objects\nint[] arr = new int[]{10, 20, 30};",
          "JavaScript": "// JS arrays are dynamic and memory is managed by the engine\nlet arr = [10, 20, 30];"
        }
      },
      { 
        id: "step3", 
        text: "How to access an element by index?", 
        visualType: "array", 
        visualState: "access",
        explanation: "Every element in an array has a numbered position called an **index**. In almost all modern programming languages, arrays are **zero-indexed**. This means the very first element is at index `0`.\n\nAccessing an item takes **O(1)** time, meaning it is instantly fast regardless of how big the array is!",
        codeSnippets: {
          "Python": "my_array = [7, 12, 9, 4, 11]\nfirst_element = my_array[0]\nprint(first_element)",
          "C++": "int myArray[] = {7, 12, 9, 4, 11};\nint firstElement = myArray[0];\ncout << firstElement;",
          "Java": "int[] myArray = {7, 12, 9, 4, 11};\nint firstElement = myArray[0];\nSystem.out.println(firstElement);",
          "JavaScript": "let myArray = [7, 12, 9, 4, 11];\nlet firstElement = myArray[0];\nconsole.log(firstElement);"
        }
      },
      { 
        id: "step4", 
        text: "How to traverse it?", 
        visualType: "array", 
        visualState: "traverse",
        explanation: "**Traversal** means visiting every single element in the array one by one, usually from the beginning to the end. \n\nWe typically use a **loop** (like a `for` loop) to traverse arrays.",
        codeSnippets: {
          "Python": "my_array = [7, 12, 9, 4, 11]\nfor num in my_array:\n    print(num)",
          "C++": "int myArray[] = {7, 12, 9, 4, 11};\nfor(int i = 0; i < 5; i++) {\n    cout << myArray[i] << \"\\n\";\n}",
          "Java": "int[] myArray = {7, 12, 9, 4, 11};\nfor(int num : myArray) {\n    System.out.println(num);\n}",
          "JavaScript": "let myArray = [7, 12, 9, 4, 11];\nfor(let num of myArray) {\n    console.log(num);\n}"
        }
      },
      { id: "step5", text: "Multidimensional Arrays", visualType: "array", visualState: "matrix" },
      { id: "step6", text: "Pass-by-Value vs Pass-by-Reference", visualType: "array", visualState: "memory" },
      { id: "step7", text: "Dynamic Memory Allocation", visualType: "array", visualState: "memory" }
    ]
  },
  {
    id: "functions",
    title: "2. Functions & Pointers",
    description: "Memory addressing, pointers",
    icon: "🎯",
    teachingSteps: [
      { id: "step1", text: "Pointers with Functions (Pass by Reference)", visualType: "array", visualState: "memory" }
    ]
  },
  {
    id: "math",
    title: "3. Math for DSA",
    description: "Bitwise, primes, Euclidean GCD",
    icon: "🧮",
    teachingSteps: [
      { id: "step1", text: "Bitwise Operators", visualType: "text", visualState: "math" },
      { id: "step2", text: "Bit Manipulation", visualType: "text", visualState: "math" },
      { id: "step3", text: "Prime Number Algorithms", visualType: "text", visualState: "math" },
      { id: "step4", text: "Square Root Algorithms", visualType: "text", visualState: "math" },
      { id: "step5", text: "HCF/LCM", visualType: "text", visualState: "math" },
      { id: "step6", text: "Euclidean Algorithm", visualType: "text", visualState: "math" }
    ]
  },
  {
    id: "matrices",
    title: "4. Matrices",
    description: "2D Arrays, traversal",
    icon: "🔲",
    teachingSteps: [
      { id: "step1", text: "What is a 2D Matrix?", visualType: "array", visualState: "matrix" },
      { id: "step2", text: "Matrix Traversal (Row vs Column Major)", visualType: "array", visualState: "matrix" }
    ]
  },
  {
    id: "strings",
    title: "5. Strings",
    description: "Manipulation, patterns",
    icon: "🔤",
    teachingSteps: [
      { id: "step1", text: "Strings as character arrays", visualType: "string", visualState: "string" },
      { id: "step2", text: "String manipulation (concatenation)", visualType: "string", visualState: "concat" },
      { id: "step3", text: "Substring and patterns", visualType: "string", visualState: "substring" }
    ]
  },
  {
    id: "complexity",
    title: "6. Time & Space Complexity",
    description: "Big O, Omega, Theta analysis",
    icon: "⏱️",
    teachingSteps: [
      { id: "step1", text: "Asymptotic Notation (Big O, Omega, Theta)", visualType: "text", visualState: "time" },
      { id: "step2", text: "Time Complexity Calculation", visualType: "text", visualState: "time" },
      { id: "step3", text: "Best, Worst, and Average Case", visualType: "text", visualState: "time" }
    ]
  },
  {
    id: "searching",
    title: "7. Searching",
    description: "Linear, binary, ternary",
    icon: "🔍",
    teachingSteps: [
      { id: "step1", text: "Linear Search", visualType: "search", visualState: "linear" },
      { id: "step2", text: "Binary Search", visualType: "search", visualState: "binary" },
      { id: "step3", text: "Ternary Search", visualType: "search", visualState: "binary" }
    ]
  },
  {
    id: "sorting",
    title: "8. Sorting",
    description: "Bubble, selection, insertion, merge, quick",
    icon: "📶",
    teachingSteps: [
      { id: "step1", text: "Bubble Sort", visualType: "sorting", visualState: "bubble" },
      { id: "step2", text: "Selection Sort", visualType: "sorting", visualState: "selection" },
      { id: "step3", text: "Insertion Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step4", text: "Merge Sort", visualType: "sorting", visualState: "merge" },
      { id: "step5", text: "Quick Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step6", text: "Counting Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step7", text: "Radix Sort", visualType: "sorting", visualState: "unsorted" },
      { id: "step8", text: "Bucket Sort", visualType: "sorting", visualState: "unsorted" }
    ]
  },
  {
    id: "recursion",
    title: "9. Recursion",
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
    title: "10. Linked List",
    description: "Singly, doubly, circular",
    icon: "🔗",
    teachingSteps: [
      { 
        id: "step1", 
        text: "Nodes and Pointers", 
        visualType: "linkedlist", 
        visualState: "node",
        explanation: "Unlike arrays, Linked Lists do NOT store elements in contiguous memory. Instead, each element is a **Node**. \n\nA Node contains two things:\n1. **Data** (the actual value)\n2. **Pointer/Reference** (the memory address of the NEXT node in the list).",
        codeSnippets: {
          "Python": "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None",
          "C++": "struct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};",
          "Java": "class Node {\n    int data;\n    Node next;\n    public Node(int data) {\n        this.data = data;\n        this.next = null;\n    }\n}",
          "JavaScript": "class Node {\n    constructor(data) {\n        this.data = data;\n        this.next = null;\n    }\n}"
        }
      },
      { 
        id: "step2", 
        text: "Connecting Nodes (Singly)", 
        visualType: "linkedlist", 
        visualState: "singly",
        explanation: "To build a Linked List, we link nodes together by assigning the `next` pointer of one node to point to another node. The first node is called the **Head**.",
        codeSnippets: {
          "Python": "head = Node(10)\nsecond = Node(20)\nhead.next = second  # 10 -> 20",
          "C++": "Node* head = new Node(10);\nNode* second = new Node(20);\nhead->next = second; // 10 -> 20",
          "Java": "Node head = new Node(10);\nNode second = new Node(20);\nhead.next = second; // 10 -> 20",
          "JavaScript": "let head = new Node(10);\nlet second = new Node(20);\nhead.next = second; // 10 -> 20"
        }
      },
      { id: "step3", text: "Insertion/Deletion/Traversal", visualType: "linkedlist", visualState: "singly" },
      { id: "step4", text: "Searching", visualType: "linkedlist", visualState: "singly" },
      { id: "step5", text: "Doubly Linked List", visualType: "linkedlist", visualState: "singly" },
      { id: "step6", text: "Circular Linked List", visualType: "linkedlist", visualState: "singly" }
    ]
  },
  {
    id: "stack",
    title: "11. Stack",
    description: "LIFO, Push/Pop",
    icon: "🥞",
    teachingSteps: [
      { id: "step1", text: "Push/Pop (LIFO)", visualType: "stack", visualState: "push" },
      { id: "step2", text: "Stack using Array", visualType: "stack", visualState: "pop" },
      { id: "step3", text: "Stack using Linked List", visualType: "stack", visualState: "pop" }
    ]
  },
  {
    id: "queue",
    title: "12. Queue",
    description: "FIFO, Enqueue/Dequeue",
    icon: "🚶",
    teachingSteps: [
      { id: "step1", text: "Enqueue/Dequeue (FIFO)", visualType: "queue", visualState: "enqueue" },
      { id: "step2", text: "Queue using Array/Linked List", visualType: "queue", visualState: "dequeue" },
      { id: "step3", text: "Stack using Queue", visualType: "queue", visualState: "dequeue" },
      { id: "step4", text: "Circular Queue", visualType: "queue", visualState: "enqueue" },
      { id: "step5", text: "Priority Queue", visualType: "queue", visualState: "enqueue" },
      { id: "step6", text: "Deque", visualType: "queue", visualState: "enqueue" }
    ]
  },
  {
    id: "trees",
    title: "13. Trees",
    description: "Binary trees, traversals",
    icon: "🌳",
    teachingSteps: [
      { id: "step1", text: "Binary Tree (Root, Leaves)", visualType: "tree", visualState: "binary" },
      { id: "step2", text: "Traversal (Inorder/Preorder/Postorder)", visualType: "tree", visualState: "traverse" },
      { id: "step3", text: "Types of Binary Tree", visualType: "tree", visualState: "basic" }
    ]
  },
  {
    id: "bst",
    title: "14. Binary Search Tree",
    description: "BST, AVL, RB Tree",
    icon: "🌲",
    teachingSteps: [
      { id: "step1", text: "Search/Insert/Delete", visualType: "tree", visualState: "bst" },
      { id: "step2", text: "AVL Tree", visualType: "tree", visualState: "bst" },
      { id: "step3", text: "RB Tree", visualType: "tree", visualState: "bst" },
      { id: "step4", text: "B-Tree", visualType: "tree", visualState: "basic" },
      { id: "step5", text: "Splay Tree", visualType: "tree", visualState: "bst" },
      { id: "step6", text: "Huffman Coding", visualType: "tree", visualState: "binary" }
    ]
  },
  {
    id: "heaps",
    title: "15. Heaps",
    description: "Binary heaps, heapsort",
    icon: "⛰️",
    teachingSteps: [
      { id: "step1", text: "Binary Heap (Insert/Delete/Heapify)", visualType: "heap", visualState: "insert" },
      { id: "step2", text: "Heapsort", visualType: "heap", visualState: "heapify" }
    ]
  },
  {
    id: "maps",
    title: "16. Maps and Hashtables",
    description: "Key-value pairs, collisions",
    icon: "🗂️",
    teachingSteps: [
      { id: "step1", text: "Maps and Hashtables", visualType: "hashtable", visualState: "hash" }
    ]
  },
  {
    id: "graphs",
    title: "17. Graphs",
    description: "BFS, DFS, shortest path",
    icon: "🕸️",
    teachingSteps: [
      { id: "step1", text: "Adjacency List/Matrix", visualType: "graph", visualState: "basic" },
      { id: "step2", text: "BFS", visualType: "graph", visualState: "bfs" },
      { id: "step3", text: "DFS", visualType: "graph", visualState: "dfs" },
      { id: "step4", text: "Topological Sort", visualType: "graph", visualState: "directed" },
      { id: "step5", text: "Prim's", visualType: "graph", visualState: "bfs" },
      { id: "step6", text: "Kruskal's", visualType: "graph", visualState: "bfs" },
      { id: "step7", text: "Dijkstra's", visualType: "graph", visualState: "bfs" }
    ]
  },
  {
    id: "tries",
    title: "18. Tries",
    description: "Prefix trees, compressed tries",
    icon: "⛺",
    teachingSteps: [
      { id: "step1", text: "Standard Trie", visualType: "trie", visualState: "search" },
      { id: "step2", text: "Compressed Trie", visualType: "trie", visualState: "search" },
      { id: "step3", text: "Suffix Trie", visualType: "trie", visualState: "search" }
    ]
  },
  {
    id: "dp",
    title: "19. Dynamic Programming",
    description: "Memoization, tabulation",
    icon: "🧠",
    teachingSteps: [
      { id: "step1", text: "Dynamic Programming", visualType: "dp", visualState: "memo" }
    ]
  },
  {
    id: "greedy",
    title: "20. Greedy Algorithms",
    description: "Local optimal choices",
    icon: "🤑",
    teachingSteps: [
      { id: "step1", text: "Greedy Algorithms", visualType: "text", visualState: "text" }
    ]
  },
  {
    id: "backtracking",
    title: "21. Backtracking Algorithms",
    description: "Exploring paths, reverting",
    icon: "🔙",
    teachingSteps: [
      { id: "step1", text: "Backtracking Algorithms", visualType: "recursion", visualState: "build" }
    ]
  },
  {
    id: "disjointset",
    title: "22. Disjoint Set",
    description: "Union-Find, path compression",
    icon: "🔗",
    teachingSteps: [
      { id: "step1", text: "Disjoint Set", visualType: "text", visualState: "text" }
    ]
  }
];
