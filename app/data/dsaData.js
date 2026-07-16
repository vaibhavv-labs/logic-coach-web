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
      { 
        id: "step5", 
        text: "Multidimensional Arrays", 
        visualType: "array", 
        visualState: "matrix",
        explanation: "A **Multidimensional Array** is an array of arrays. The most common type is a 2D array, which is used to represent matrices, grids, or boards (like a Chess board). \n\nIn memory, it is often stored as a single contiguous block (row-major order), but accessed using two indices: `array[row][column]`.",
        codeSnippets: {
          "Python": "grid = [\n  [1, 2, 3],\n  [4, 5, 6]\n]\nprint(grid[0][2]) # Prints 3",
          "C++": "int grid[2][3] = {\n  {1, 2, 3},\n  {4, 5, 6}\n};\ncout << grid[0][2]; // 3",
          "Java": "int[][] grid = {\n  {1, 2, 3},\n  {4, 5, 6}\n};\nSystem.out.println(grid[0][2]);",
          "JavaScript": "let grid = [\n  [1, 2, 3],\n  [4, 5, 6]\n];\nconsole.log(grid[0][2]);"
        }
      },
      { 
        id: "step6", 
        text: "Pass-by-Value vs Pass-by-Reference", 
        visualType: "array", 
        visualState: "memory",
        explanation: "When you pass a variable to a function, **Pass-by-Value** means you pass a copy. Changing it inside the function doesn't change the original. \n\nArrays, however, are usually **Passed-by-Reference** (or memory address). This means if you change an array inside a function, the original array outside the function is also changed! (Python and JS handle this by passing the 'reference to the object').",
        codeSnippets: {
          "Python": "def modify(arr):\n    arr[0] = 99\n\nnums = [1, 2, 3]\nmodify(nums)\nprint(nums) # [99, 2, 3]",
          "C++": "void modify(int arr[]) {\n    arr[0] = 99;\n}\n// nums[0] will become 99",
          "Java": "void modify(int[] arr) {\n    arr[0] = 99;\n}\n// arr[0] becomes 99 globally",
          "JavaScript": "function modify(arr) {\n    arr[0] = 99;\n}\nlet nums = [1, 2, 3];\nmodify(nums);\nconsole.log(nums); // [99, 2, 3]"
        }
      },
      { 
        id: "step7", 
        text: "Dynamic Memory Allocation", 
        visualType: "array", 
        visualState: "memory",
        explanation: "Standard arrays have a fixed size. If you don't know the size in advance, you need **Dynamic Allocation**.\n\nIn C++, you manually allocate memory on the Heap using `new`. In languages like Python, Java, and JS, \"Arrays\" (Lists/ArrayLists) are dynamic by default—they automatically resize themselves in the background when they get full.",
        codeSnippets: {
          "Python": "# Python lists are dynamic by default\narr = []\narr.append(5)\narr.append(10)",
          "C++": "// C++ requires manual allocation or std::vector\nint* arr = new int[5]; // Allocate\ndelete[] arr; // MUST free memory!\n// Better: vector<int> arr;",
          "Java": "// Java uses ArrayList for dynamic sizing\nArrayList<Integer> arr = new ArrayList<>();\narr.add(5);",
          "JavaScript": "// JS arrays are dynamically sized\nlet arr = [];\narr.push(5);"
        }
      }
    ]
  },
  {
    id: "functions",
    title: "2. Functions & Pointers",
    description: "Memory addressing, pointers",
    icon: "🎯",
    teachingSteps: [
      { 
        id: "step1", 
        text: "Pointers with Functions (Pass by Reference)", 
        visualType: "array", 
        visualState: "memory",
        explanation: "A **Pointer** is a variable that stores the memory address of another variable. By passing a pointer to a function, the function can directly modify the original variable.\n\nC++ gives you direct control over pointers (`*`) and addresses (`&`). Java, Python, and JavaScript hide pointers from you, but they still use them under the hood to pass Objects by reference.",
        codeSnippets: {
          "Python": "# Python doesn't have explicit pointers.\n# Objects are passed by reference.\ndef modify(val_list):\n    val_list[0] = 100",
          "C++": "void addOne(int* ptr) {\n    (*ptr)++; // Dereference and add 1\n}\nint main() {\n    int x = 5;\n    addOne(&x); // Pass address\n    // x is now 6\n}",
          "Java": "// Java passes primitives by value, objects by reference.\n// No explicit pointers allowed.",
          "JavaScript": "// JS passes primitives by value, objects by reference.\n// No explicit pointers."
        }
      }
    ]
  },
  {
    id: "math",
    title: "3. Math for DSA",
    description: "Bitwise, primes, Euclidean GCD",
    icon: "🧮",
    teachingSteps: [
      { 
        id: "step1", 
        text: "Bitwise Operators", 
        visualType: "text", 
        visualState: "math",
        explanation: "At the hardware level, numbers are stored in Binary (0s and 1s). **Bitwise Operators** let you manipulate these bits directly. They are extremely fast.\n\n- `&` (AND): 1 if both are 1\n- `|` (OR): 1 if either is 1\n- `^` (XOR): 1 if they are different\n- `~` (NOT): flips bits\n- `<<` (Left Shift): multiply by 2\n- `>>` (Right Shift): divide by 2",
        codeSnippets: {
          "Python": "a = 5 # 0101\nb = 3 # 0011\nprint(a & b)  # 0001 (1)\nprint(a << 1) # 1010 (10)",
          "C++": "int a = 5, b = 3;\ncout << (a & b) << endl;  // 1\ncout << (a << 1); // 10",
          "Java": "int a = 5, b = 3;\nSystem.out.println(a & b); // 1\nSystem.out.println(a << 1); // 10",
          "JavaScript": "let a = 5, b = 3;\nconsole.log(a & b); // 1\nconsole.log(a << 1); // 10"
        }
      },
      { 
        id: "step2", 
        text: "Bit Manipulation", 
        visualType: "text", 
        visualState: "math",
        explanation: "Bit manipulation is a technique to solve algorithmic problems efficiently. \n\nFor example, to check if a number is Even or Odd, you can do `num & 1`. If the result is 1, it's odd. If 0, it's even. This is faster than using the modulo `%` operator.",
        codeSnippets: {
          "Python": "def is_odd(n):\n    return (n & 1) == 1",
          "C++": "bool isOdd(int n) {\n    return (n & 1) == 1;\n}",
          "Java": "boolean isOdd(int n) {\n    return (n & 1) == 1;\n}",
          "JavaScript": "function isOdd(n) {\n    return (n & 1) === 1;\n}"
        }
      },
      { 
        id: "step3", 
        text: "Prime Number Algorithms", 
        visualType: "text", 
        visualState: "math",
        explanation: "A Prime Number is only divisible by 1 and itself.\nThe naive way to check if `N` is prime is to loop from 2 to N-1. However, we only need to loop up to `sqrt(N)`. \n\nTo find ALL primes up to N quickly, we use the **Sieve of Eratosthenes** algorithm (O(N log log N)).",
        codeSnippets: {
          "Python": "def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True",
          "C++": "bool isPrime(int n) {\n    if(n < 2) return false;\n    for(int i = 2; i * i <= n; i++)\n        if(n % i == 0) return false;\n    return true;\n}",
          "Java": "boolean isPrime(int n) {\n    if(n < 2) return false;\n    for(int i = 2; i * i <= n; i++)\n        if(n % i == 0) return false;\n    return true;\n}",
          "JavaScript": "function isPrime(n) {\n    if (n < 2) return false;\n    for(let i = 2; i * i <= n; i++)\n        if (n % i === 0) return false;\n    return true;\n}"
        }
      },
      { 
        id: "step4", 
        text: "Square Root Algorithms", 
        visualType: "text", 
        visualState: "math",
        explanation: "While languages have built-in `sqrt()` functions, DSA problems often ask you to compute the integer square root of `X` without using them. \n\nThe optimal way is **Binary Search** from 1 to X. Find mid, if `mid * mid == X`, you found it! Time complexity: O(log X).",
        codeSnippets: {
          "Python": "def my_sqrt(x):\n    l, r, ans = 1, x, 0\n    while l <= r:\n        mid = (l + r) // 2\n        if mid * mid <= x:\n            ans = mid\n            l = mid + 1\n        else:\n            r = mid - 1\n    return ans",
          "C++": "int mySqrt(int x) {\n    long l = 1, r = x, ans = 0;\n    while (l <= r) {\n        long mid = l + (r - l) / 2;\n        if (mid * mid <= x) { ans = mid; l = mid + 1; }\n        else { r = mid - 1; }\n    }\n    return ans;\n}",
          "Java": "int mySqrt(int x) {\n    long l = 1, r = x, ans = 0;\n    while (l <= r) {\n        long mid = l + (r - l) / 2;\n        if (mid * mid <= x) { ans = mid; l = mid + 1; }\n        else { r = mid - 1; }\n    }\n    return (int)ans;\n}",
          "JavaScript": "function mySqrt(x) {\n    let l = 1, r = x, ans = 0;\n    while (l <= r) {\n        let mid = Math.floor(l + (r - l) / 2);\n        if (mid * mid <= x) { ans = mid; l = mid + 1; }\n        else { r = mid - 1; }\n    }\n    return ans;\n}"
        }
      },
      { 
        id: "step5", 
        text: "HCF/LCM", 
        visualType: "text", 
        visualState: "math",
        explanation: "Highest Common Factor (HCF) or Greatest Common Divisor (GCD) is the largest number that divides both A and B. \n\nLowest Common Multiple (LCM) is the smallest number that is a multiple of both A and B. The relationship is: `LCM(A, B) = (A * B) / GCD(A, B)`.",
        codeSnippets: {
          "Python": "# Using Python's built-in math module\nimport math\ngcd = math.gcd(10, 15) # 5\nlcm = (10 * 15) // gcd # 30",
          "C++": "#include <numeric>\nusing namespace std;\n// C++17 has std::gcd and std::lcm\nint g = std::gcd(10, 15); // 5\nint l = std::lcm(10, 15); // 30",
          "Java": "// Java lacks a built-in LCM, we write our own GCD\nint lcm = (10 * 15) / gcd(10, 15);",
          "JavaScript": "// JS lacks built-in GCD/LCM\nlet lcm = (10 * 15) / gcd(10, 15);"
        }
      },
      { 
        id: "step6", 
        text: "Euclidean Algorithm", 
        visualType: "text", 
        visualState: "math",
        explanation: "The **Euclidean Algorithm** is the most efficient way to compute the GCD of two numbers. It relies on the principle that the GCD of A and B is the same as the GCD of B and (A modulo B). \n\nIt runs in O(log(min(a, b))) time and is elegantly implemented using Recursion.",
        codeSnippets: {
          "Python": "def gcd(a, b):\n    if b == 0: return a\n    return gcd(b, a % b)",
          "C++": "int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}",
          "Java": "int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}",
          "JavaScript": "function gcd(a, b) {\n    if (b === 0) return a;\n    return gcd(b, a % b);\n}"
        }
      }
    ]
  },
  {
    id: "matrices",
    title: "4. Matrices",
    description: "2D Arrays, traversal",
    icon: "🔲",
    teachingSteps: [
      { 
        id: "step1", 
        text: "What is a 2D Matrix?", 
        visualType: "array", 
        visualState: "matrix",
        explanation: "A **Matrix** is a 2-Dimensional array structured in Rows and Columns. If you have an `M x N` matrix, it has `M` rows (going down) and `N` columns (going across).\n\nIn memory, it's essentially an Array of Arrays. You access elements using two indices: `matrix[row][col]`.",
        codeSnippets: {
          "Python": "matrix = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n]\nrows = len(matrix)\ncols = len(matrix[0])",
          "C++": "int matrix[3][3] = {\n  {1, 2, 3},\n  {4, 5, 6},\n  {7, 8, 9}\n};\nint rows = 3;\nint cols = 3;",
          "Java": "int[][] matrix = {\n  {1, 2, 3},\n  {4, 5, 6},\n  {7, 8, 9}\n};\nint rows = matrix.length;\nint cols = matrix[0].length;",
          "JavaScript": "let matrix = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\nlet rows = matrix.length;\nlet cols = matrix[0].length;"
        }
      },
      { 
        id: "step2", 
        text: "Matrix Traversal (Row vs Column Major)", 
        visualType: "array", 
        visualState: "matrix",
        explanation: "To process a matrix, we use a **Nested Loop**. \n\n**Row-Major** traversal reads row by row (left to right, top to bottom). **Column-Major** traversal reads column by column (top to bottom, left to right). Because of how arrays are stored contiguously in memory, Row-Major is significantly faster due to CPU caching.",
        codeSnippets: {
          "Python": "# Row-Major Traversal\nfor r in range(len(matrix)):\n    for c in range(len(matrix[0])):\n        print(matrix[r][c])",
          "C++": "// Row-Major Traversal\nfor(int r = 0; r < rows; r++) {\n    for(int c = 0; c < cols; c++) {\n        cout << matrix[r][c];\n    }\n}",
          "Java": "// Row-Major Traversal\nfor(int r = 0; r < matrix.length; r++) {\n    for(int c = 0; c < matrix[0].length; c++) {\n        System.out.println(matrix[r][c]);\n    }\n}",
          "JavaScript": "// Row-Major Traversal\nfor(let r = 0; r < matrix.length; r++) {\n    for(let c = 0; c < matrix[0].length; c++) {\n        console.log(matrix[r][c]);\n    }\n}"
        }
      }
    ]
  },
  {
    id: "strings",
    title: "5. Strings",
    description: "Manipulation, patterns",
    icon: "🔤",
    teachingSteps: [
      { 
        id: "step1", 
        text: "Strings as character arrays", 
        visualType: "string", 
        visualState: "string",
        explanation: "Under the hood, a **String** is essentially an Array of Characters. \n\nIn C++, strings are mutable (you can change individual characters). However, in Java, Python, and JavaScript, strings are **Immutable**. This means once a string is created in memory, it cannot be changed. If you try to modify it, the language actually destroys the old string and creates a completely new one!",
        codeSnippets: {
          "Python": "s = \"hello\"\n# s[0] = 'H'  <-- ERROR, Immutable\ns = \"H\" + s[1:] # Creates a new string",
          "C++": "#include <string>\nusing namespace std;\nstring s = \"hello\";\ns[0] = 'H'; // Perfectly fine, Mutable!",
          "Java": "String s = \"hello\";\n// s.charAt(0) = 'H'; <-- ERROR, Immutable\ns = \"H\" + s.substring(1);",
          "JavaScript": "let s = \"hello\";\ns[0] = 'H'; // Ignored, Immutable\ns = \"H\" + s.substring(1);"
        }
      },
      { 
        id: "step2", 
        text: "String manipulation (concatenation)", 
        visualType: "string", 
        visualState: "concat",
        explanation: "**Concatenation** is joining two strings together. Because strings are immutable in most languages, repeatedly concatenating inside a loop is very slow (O(N²) time complexity).\n\nTo build strings dynamically in a loop, you should use specialized objects like `StringBuilder` (Java), an array of characters (JS/Python), and join them at the end.",
        codeSnippets: {
          "Python": "# Bad: s += \"a\" (in a loop)\n# Good: \nchars = [\"a\", \"b\", \"c\"]\nmerged = \"\".join(chars)",
          "C++": "// C++ strings are mutable, so += is fast!\nstring s = \"\";\ns += \"a\";",
          "Java": "// Use StringBuilder!\nStringBuilder sb = new StringBuilder();\nsb.append(\"a\");\nsb.append(\"b\");\nString res = sb.toString();",
          "JavaScript": "// Modern JS engines optimize += well,\n// but arrays are also used:\nlet arr = [\"a\", \"b\"];\nlet s = arr.join(\"\");"
        }
      },
      { 
        id: "step3", 
        text: "Substring and patterns", 
        visualType: "string", 
        visualState: "substring",
        explanation: "A **Substring** is a contiguous sequence of characters within a string. Often, problems ask you to find if a Pattern exists inside a Text.\n\nThe naive way to search is to check every starting character (O(N*M) time). Advanced algorithms like **KMP** (Knuth-Morris-Pratt) can do it in O(N+M) time.",
        codeSnippets: {
          "Python": "text = \"hello world\"\nprint(\"world\" in text) # True\nprint(text.find(\"world\")) # Returns index 6",
          "C++": "string text = \"hello world\";\nsize_t pos = text.find(\"world\");\nif (pos != string::npos) cout << \"Found at \" << pos;",
          "Java": "String text = \"hello world\";\nSystem.out.println(text.contains(\"world\"));\nint index = text.indexOf(\"world\"); // 6",
          "JavaScript": "let text = \"hello world\";\nconsole.log(text.includes(\"world\")); // true\nconsole.log(text.indexOf(\"world\")); // 6"
        }
      }
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
