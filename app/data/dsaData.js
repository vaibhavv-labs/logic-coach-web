export const DSA_TOPICS = [
  {
    id: "arrays",
    title: "1. Arrays",
    description: "Memory, traversal, multidimensional",
    icon: "📦",
    teachingSteps: [
      { 
        id: "dsa_arrays_step1", 
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
        id: "dsa_arrays_step2", 
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
        id: "dsa_arrays_step3", 
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
        id: "dsa_arrays_step4", 
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
        id: "dsa_arrays_step5", 
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
        id: "dsa_arrays_step6", 
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
        id: "dsa_arrays_step7", 
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
        id: "dsa_functions_step1", 
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
        id: "dsa_math_step1", 
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
        id: "dsa_math_step2", 
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
        id: "dsa_math_step3", 
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
        id: "dsa_math_step4", 
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
        id: "dsa_math_step5", 
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
        id: "dsa_math_step6", 
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
        id: "dsa_matrices_step1", 
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
        id: "dsa_matrices_step2", 
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
        id: "dsa_strings_step1", 
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
        id: "dsa_strings_step2", 
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
        id: "dsa_strings_step3", 
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
      { 
        id: "dsa_complexity_step1", 
        text: "Asymptotic Notation (Big O, Omega, Theta)", 
        visualType: "text", 
        visualState: "time",
        explanation: "Asymptotic Notation is how we describe the performance of an algorithm as the input size (`N`) grows to infinity.\n\n- **Big O (O)**: The Upper Bound (Worst-case scenario).\n- **Omega (Ω)**: The Lower Bound (Best-case scenario).\n- **Theta (Θ)**: The Tight Bound (Average-case, when upper and lower are the same).\n\nIn interviews, we almost exclusively talk about **Big O** (the worst-case).",
        codeSnippets: {
          "Python": "# O(1) - Constant Time (Instant)\nprint(arr[0])",
          "C++": "// O(N) - Linear Time (Proportional to N)\nfor(int i = 0; i < n; i++) cout << arr[i];",
          "Java": "// O(N^2) - Quadratic Time (Slow for large N)\nfor(int i=0; i<n; i++)\n  for(int j=0; j<n; j++)",
          "JavaScript": "// O(log N) - Logarithmic (Fast, like Binary Search)\nwhile(n > 1) n = Math.floor(n/2);"
        }
      },
      { 
        id: "dsa_complexity_step2", 
        text: "Time Complexity Calculation", 
        visualType: "text", 
        visualState: "time",
        explanation: "To calculate Big O, follow these rules:\n1. **Drop Constants**: O(2N) becomes O(N).\n2. **Drop Non-Dominant Terms**: O(N² + N) becomes O(N²).\n3. **Loops**: A simple loop is O(N). Nested loops are O(N * M).\n4. **Halving**: If an algorithm cuts the input in half every step, it is O(log N).",
        codeSnippets: {
          "Python": "# O(N) + O(N) = O(2N) => O(N)\nfor x in arr: pass\nfor y in arr: pass",
          "C++": "// O(N) * O(N) = O(N^2)\nfor(int i=0; i<n; i++) {\n    for(int j=0; j<n; j++) { }\n}",
          "Java": "// O(1) Space Complexity (No extra memory used)\nint sum = 0;\nfor(int num : arr) sum += num;",
          "JavaScript": "// O(N) Space Complexity (Creating a new array)\nlet newArr = [];\nfor(let i=0; i<n; i++) newArr.push(i);"
        }
      },
      { 
        id: "dsa_complexity_step3", 
        text: "Best, Worst, and Average Case", 
        visualType: "text", 
        visualState: "time",
        explanation: "Algorithms perform differently based on the input. Consider searching for a name in a phonebook.\n\n- **Best Case (Ω)**: The name is on the very first page. O(1).\n- **Worst Case (O)**: The name is on the very last page, or not in the book at all. O(N).\n- **Average Case (Θ)**: The name is somewhere in the middle. O(N/2), which drops to O(N).",
        codeSnippets: {
          "Python": "def find_target(arr, target):\n    for i, val in enumerate(arr):\n        if val == target: return i # Best case: i=0\n    return -1 # Worst case: end of loop",
          "C++": "int find(vector<int>& arr, int target) {\n    for(int i=0; i<arr.size(); i++)\n        if(arr[i] == target) return i;\n    return -1;\n}",
          "Java": "int find(int[] arr, int target) {\n    for(int i=0; i<arr.length; i++)\n        if(arr[i] == target) return i;\n    return -1;\n}",
          "JavaScript": "function find(arr, target) {\n    for(let i=0; i<arr.length; i++)\n        if(arr[i] === target) return i;\n    return -1;\n}"
        }
      }
    ]
  },
  {
    id: "searching",
    title: "7. Searching",
    description: "Linear, binary, ternary",
    icon: "🔍",
    teachingSteps: [
      { 
        id: "dsa_searching_step1", 
        text: "Linear Search", 
        visualType: "search", 
        visualState: "linear",
        explanation: "Linear Search checks every single element in a data structure one by one until the target is found. \n\nIt works on unsorted arrays, but it is slow for large datasets. **Time Complexity: O(N)**.",
        codeSnippets: {
          "Python": "def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1",
          "C++": "int linearSearch(vector<int>& arr, int target) {\n    for(int i=0; i<arr.size(); i++)\n        if(arr[i] == target) return i;\n    return -1;\n}",
          "Java": "int linearSearch(int[] arr, int target) {\n    for(int i=0; i<arr.length; i++)\n        if(arr[i] == target) return i;\n    return -1;\n}",
          "JavaScript": "function linearSearch(arr, target) {\n    for(let i=0; i<arr.length; i++)\n        if(arr[i] === target) return i;\n    return -1;\n}"
        }
      },
      { 
        id: "dsa_searching_step2", 
        text: "Binary Search", 
        visualType: "search", 
        visualState: "binary",
        explanation: "Binary Search is a massive optimization over Linear Search, but **it requires the array to be sorted first**.\n\nIt works by checking the middle element. If the target is smaller, it discards the right half. If larger, it discards the left half. It cuts the search space in half every time. **Time Complexity: O(log N)**.",
        codeSnippets: {
          "Python": "def binary_search(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1",
          "C++": "int binarySearch(vector<int>& arr, int target) {\n    int l = 0, r = arr.size() - 1;\n    while(l <= r) {\n        int mid = l + (r - l) / 2;\n        if(arr[mid] == target) return mid;\n        else if(arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}",
          "Java": "int binarySearch(int[] arr, int target) {\n    int l = 0, r = arr.length - 1;\n    while(l <= r) {\n        int mid = l + (r - l) / 2;\n        if(arr[mid] == target) return mid;\n        else if(arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}",
          "JavaScript": "function binarySearch(arr, target) {\n    let l = 0, r = arr.length - 1;\n    while(l <= r) {\n        let mid = Math.floor(l + (r - l) / 2);\n        if(arr[mid] === target) return mid;\n        else if(arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}"
        }
      },
      { 
        id: "dsa_searching_step3", 
        text: "Ternary Search", 
        visualType: "search", 
        visualState: "binary",
        explanation: "Ternary Search is similar to Binary Search, but instead of dividing the array into 2 halves, it divides the array into **3 segments** using two midpoints.\n\nWhile it sounds faster, in practice Binary Search is usually preferred because Ternary Search requires more comparisons per step. **Time Complexity: O(log3 N)**.",
        codeSnippets: {
          "Python": "def ternary_search(l, r, target, arr):\n    while r >= l:\n        mid1 = l + (r - l) // 3\n        mid2 = r - (r - l) // 3\n        if arr[mid1] == target: return mid1\n        if arr[mid2] == target: return mid2\n        if target < arr[mid1]: r = mid1 - 1\n        elif target > arr[mid2]: l = mid2 + 1\n        else: l = mid1 + 1; r = mid2 - 1\n    return -1",
          "C++": "// Standard ternary search logic\n// (Conceptually identical to Python implementation)",
          "Java": "// Standard ternary search logic\n// (Conceptually identical to Python implementation)",
          "JavaScript": "// Standard ternary search logic\n// (Conceptually identical to Python implementation)"
        }
      }
    ]
  },
  {
    id: "sorting",
    title: "8. Sorting",
    description: "Bubble, selection, insertion, merge, quick",
    icon: "📶",
    teachingSteps: [
      { 
        id: "dsa_sorting_step1", 
        text: "Bubble Sort", 
        visualType: "sorting", 
        visualState: "bubble",
        explanation: "**Bubble Sort** repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements \"bubble\" to the top. **Time Complexity: O(N²)**.",
        codeSnippets: {
          "Python": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]",
          "C++": "void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1])\n                swap(arr[j], arr[j+1]);\n}",
          "Java": "void bubbleSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n}",
          "JavaScript": "function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n-1; i++)\n        for (let j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1])\n                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n}"
        }
      },
      { 
        id: "dsa_sorting_step2", 
        text: "Selection Sort", 
        visualType: "sorting", 
        visualState: "selection",
        explanation: "**Selection Sort** divides the array into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted part and puts it at the beginning. **Time Complexity: O(N²)**.",
        codeSnippets: {
          "Python": "def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]",
          "C++": "void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min_idx = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        swap(arr[min_idx], arr[i]);\n    }\n}",
          "Java": "void selectionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n-1; i++) {\n        int min_idx = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min_idx]) min_idx = j;\n        int temp = arr[min_idx];\n        arr[min_idx] = arr[i];\n        arr[i] = temp;\n    }\n}",
          "JavaScript": "function selectionSort(arr) {\n    for (let i = 0; i < arr.length-1; i++) {\n        let min_idx = i;\n        for (let j = i+1; j < arr.length; j++)\n            if (arr[j] < arr[min_idx]) min_idx = j;\n        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];\n    }\n}"
        }
      },
      { 
        id: "dsa_sorting_step3", 
        text: "Insertion Sort", 
        visualType: "sorting", 
        visualState: "unsorted",
        explanation: "**Insertion Sort** builds the final sorted array one item at a time. It takes an element and inserts it into its correct position in the already-sorted part. Excellent for nearly sorted arrays. **Time Complexity: O(N²)**.",
        codeSnippets: {
          "Python": "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key",
          "C++": "void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}",
          "Java": "void insertionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 1; i < n; ++i) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}",
          "JavaScript": "function insertionSort(arr) {\n    for (let i = 1; i < arr.length; i++) {\n        let key = arr[i];\n        let j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}"
        }
      },
      { 
        id: "dsa_sorting_step4", 
        text: "Merge Sort", 
        visualType: "sorting", 
        visualState: "merge",
        explanation: "**Merge Sort** is a Divide and Conquer algorithm. It divides the array in half, recursively sorts both halves, and then merges the two sorted halves back together. **Time Complexity: O(N log N)**.",
        codeSnippets: {
          "Python": "def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        # (Merge logic omitted for brevity)",
          "C++": "// Divide and conquer recursively.\n// Needs a helper 'merge' function to combine halves.",
          "Java": "// Divide and conquer recursively.\n// Needs a helper 'merge' function to combine halves.",
          "JavaScript": "// Divide and conquer recursively.\n// Needs a helper 'merge' function to combine halves."
        }
      },
      { 
        id: "dsa_sorting_step5", 
        text: "Quick Sort", 
        visualType: "sorting", 
        visualState: "unsorted",
        explanation: "**Quick Sort** picks an element as a 'pivot' and partitions the given array around the picked pivot (putting smaller elements before it, and larger elements after). **Average Time: O(N log N)**.",
        codeSnippets: {
          "Python": "def quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)",
          "C++": "// Quick sort logic using a partition function",
          "Java": "// Quick sort logic using a partition function",
          "JavaScript": "// Quick sort logic using a partition function"
        }
      },
      { 
        id: "dsa_sorting_step6", 
        text: "Counting Sort", 
        visualType: "sorting", 
        visualState: "unsorted",
        explanation: "**Counting Sort** is a non-comparison sorting algorithm. It works by counting the number of objects having distinct key values (using an extra array). It's incredibly fast (O(N+K)) but only works well for small integer ranges.",
        codeSnippets: {
          "Python": "# Counting Sort logic: count frequencies, then reconstruct array.",
          "C++": "// Counting Sort logic: count frequencies, then reconstruct array.",
          "Java": "// Counting Sort logic: count frequencies, then reconstruct array.",
          "JavaScript": "// Counting Sort logic: count frequencies, then reconstruct array."
        }
      },
      { 
        id: "dsa_sorting_step7", 
        text: "Radix Sort", 
        visualType: "sorting", 
        visualState: "unsorted",
        explanation: "**Radix Sort** processes the numbers digit by digit, starting from the least significant digit to the most significant digit (usually using Counting Sort as a subroutine). **Time Complexity: O(d * (N + K))**.",
        codeSnippets: {
          "Python": "# Radix Sort logic: sort by each digit (ones, tens, hundreds).",
          "C++": "// Radix Sort logic: sort by each digit (ones, tens, hundreds).",
          "Java": "// Radix Sort logic: sort by each digit (ones, tens, hundreds).",
          "JavaScript": "// Radix Sort logic: sort by each digit (ones, tens, hundreds)."
        }
      },
      { 
        id: "dsa_sorting_step8", 
        text: "Bucket Sort", 
        visualType: "sorting", 
        visualState: "unsorted",
        explanation: "**Bucket Sort** divides the input into several 'buckets'. Each bucket is then sorted individually (often using insertion sort). Useful for floating-point numbers distributed uniformly.",
        codeSnippets: {
          "Python": "# Bucket Sort logic: scatter to buckets, sort buckets, gather.",
          "C++": "// Bucket Sort logic: scatter to buckets, sort buckets, gather.",
          "Java": "// Bucket Sort logic: scatter to buckets, sort buckets, gather.",
          "JavaScript": "// Bucket Sort logic: scatter to buckets, sort buckets, gather."
        }
      }
    ]
  },
  {
    id: "recursion",
    title: "9. Recursion",
    description: "Base case, recursive thinking",
    icon: "🔄",
    teachingSteps: [
      { 
        id: "dsa_recursion_step1", 
        text: "What is a function calling itself?", 
        visualType: "recursion", 
        visualState: "call",
        explanation: "**Recursion** is a technique where a function calls itself to solve smaller sub-problems of the original problem.\n\nIt is heavily used in Trees, Graphs, and Divide-and-Conquer algorithms. Think of it like a set of Russian Nesting Dolls.",
        codeSnippets: {
          "Python": "def factorial(n):\n    # base case later\n    return n * factorial(n - 1)",
          "C++": "int factorial(int n) {\n    // base case later\n    return n * factorial(n - 1);\n}",
          "Java": "int factorial(int n) {\n    // base case later\n    return n * factorial(n - 1);\n}",
          "JavaScript": "function factorial(n) {\n    // base case later\n    return n * factorial(n - 1);\n}"
        }
      },
      { 
        id: "dsa_recursion_step2", 
        text: "The Call Stack building up", 
        visualType: "recursion", 
        visualState: "build",
        explanation: "Every time a function calls itself, the computer pauses the current function and creates a new \"frame\" on the **Call Stack** in memory. \n\nIf you call `factorial(3)`, it pauses and calls `factorial(2)`, which pauses and calls `factorial(1)`.",
        codeSnippets: {
          "Python": "# The memory stack grows:\n# factorial(3)\n#   factorial(2)\n#     factorial(1)",
          "C++": "// The memory stack grows:\n// factorial(3)\n//   factorial(2)\n//     factorial(1)",
          "Java": "// The memory stack grows:\n// factorial(3)\n//   factorial(2)\n//     factorial(1)",
          "JavaScript": "// The memory stack grows:\n// factorial(3)\n//   factorial(2)\n//     factorial(1)"
        }
      },
      { 
        id: "dsa_recursion_step3", 
        text: "The Base Case (When to stop)", 
        visualType: "recursion", 
        visualState: "base",
        explanation: "If a recursion never stops, it causes a **Stack Overflow** error (running out of memory). \n\nTo prevent this, we must have a **Base Case**—a condition where the function returns a value WITHOUT calling itself again.",
        codeSnippets: {
          "Python": "def factorial(n):\n    if n == 1: return 1 # BASE CASE\n    return n * factorial(n - 1)",
          "C++": "int factorial(int n) {\n    if (n == 1) return 1; // BASE CASE\n    return n * factorial(n - 1);\n}",
          "Java": "int factorial(int n) {\n    if (n == 1) return 1; // BASE CASE\n    return n * factorial(n - 1);\n}",
          "JavaScript": "function factorial(n) {\n    if (n === 1) return 1; // BASE CASE\n    return n * factorial(n - 1);\n}"
        }
      },
      { 
        id: "dsa_recursion_step4", 
        text: "The Call Stack collapsing", 
        visualType: "recursion", 
        visualState: "collapse",
        explanation: "Once the Base Case is hit, the function returns a value to the previous frame. The stack begins to collapse as each paused function resumes, calculates its final value, and returns it to the frame below it.",
        codeSnippets: {
          "Python": "# factorial(1) returns 1\n# factorial(2) returns 2 * 1 = 2\n# factorial(3) returns 3 * 2 = 6",
          "C++": "// factorial(1) returns 1\n// factorial(2) returns 2 * 1 = 2\n// factorial(3) returns 3 * 2 = 6",
          "Java": "// factorial(1) returns 1\n// factorial(2) returns 2 * 1 = 2\n// factorial(3) returns 3 * 2 = 6",
          "JavaScript": "// factorial(1) returns 1\n// factorial(2) returns 2 * 1 = 2\n// factorial(3) returns 3 * 2 = 6"
        }
      }
    ]
  },
  {
    id: "linkedlists",
    title: "10. Linked List",
    description: "Singly, doubly, circular",
    icon: "🔗",
    teachingSteps: [
      { 
        id: "dsa_linkedlists_step1", 
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
        id: "dsa_linkedlists_step2", 
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
      { 
        id: "dsa_linkedlists_step3", 
        text: "Insertion/Deletion/Traversal", 
        visualType: "linkedlist", 
        visualState: "singly",
        explanation: "To traverse, we use a temporary pointer that moves to `.next` until it hits `null`.\n\nTo insert or delete, we must carefully update pointers so we don't break the chain. If we want to insert Node C between A and B, we make C point to B, and A point to C.",
        codeSnippets: {
          "Python": "# Traversal\ntemp = head\nwhile temp:\n    print(temp.data)\n    temp = temp.next",
          "C++": "// Traversal\nNode* temp = head;\nwhile (temp != nullptr) {\n    cout << temp->data << \" \";\n    temp = temp->next;\n}",
          "Java": "// Traversal\nNode temp = head;\nwhile (temp != null) {\n    System.out.println(temp.data);\n    temp = temp.next;\n}",
          "JavaScript": "// Traversal\nlet temp = head;\nwhile (temp !== null) {\n    console.log(temp.data);\n    temp = temp.next;\n}"
        }
      },
      { 
        id: "dsa_linkedlists_step4", 
        text: "Searching", 
        visualType: "linkedlist", 
        visualState: "singly",
        explanation: "Searching a Linked List requires a **Linear Search (O(N))**. We start at the head and traverse node by node until we find the target value. We cannot use Binary Search because we cannot randomly access the middle element.",
        codeSnippets: {
          "Python": "def search(head, target):\n    curr = head\n    while curr:\n        if curr.data == target: return True\n        curr = curr.next\n    return False",
          "C++": "bool search(Node* head, int target) {\n    Node* curr = head;\n    while(curr != nullptr) {\n        if(curr->data == target) return true;\n        curr = curr->next;\n    }\n    return false;\n}",
          "Java": "boolean search(Node head, int target) {\n    Node curr = head;\n    while(curr != null) {\n        if(curr.data == target) return true;\n        curr = curr.next;\n    }\n    return false;\n}",
          "JavaScript": "function search(head, target) {\n    let curr = head;\n    while(curr !== null) {\n        if(curr.data === target) return true;\n        curr = curr.next;\n    }\n    return false;\n}"
        }
      },
      { 
        id: "dsa_linkedlists_step5", 
        text: "Doubly Linked List", 
        visualType: "linkedlist", 
        visualState: "singly",
        explanation: "A **Doubly Linked List** gives each Node an extra pointer: `prev`. \n\nThis allows us to traverse the list backwards as well as forwards. The tradeoff is that it uses more memory for the extra pointer.",
        codeSnippets: {
          "Python": "class DNode:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n        self.prev = None",
          "C++": "struct DNode {\n    int data;\n    DNode* next;\n    DNode* prev;\n    DNode(int val) : data(val), next(nullptr), prev(nullptr) {}\n};",
          "Java": "class DNode {\n    int data;\n    DNode next, prev;\n    public DNode(int data) {\n        this.data = data;\n        this.next = this.prev = null;\n    }\n}",
          "JavaScript": "class DNode {\n    constructor(data) {\n        this.data = data;\n        this.next = null;\n        this.prev = null;\n    }\n}"
        }
      },
      { 
        id: "dsa_linkedlists_step6", 
        text: "Circular Linked List", 
        visualType: "linkedlist", 
        visualState: "singly",
        explanation: "In a **Circular Linked List**, the last node's `next` pointer does NOT point to `null`. Instead, it points back to the `head`.\n\nThis is useful for applications that need to continually loop through items, like a turn-based multiplayer game.",
        codeSnippets: {
          "Python": "# To make circular:\n# tail.next = head",
          "C++": "// To make circular:\n// tail->next = head;",
          "Java": "// To make circular:\n// tail.next = head;",
          "JavaScript": "// To make circular:\n// tail.next = head;"
        }
      }
    ]
  },
  {
    id: "stack",
    title: "11. Stack",
    description: "LIFO, Push/Pop",
    icon: "🥞",
    teachingSteps: [
      { 
        id: "dsa_stack_step1", 
        text: "Push/Pop (LIFO)", 
        visualType: "stack", 
        visualState: "push",
        explanation: "A **Stack** follows the **LIFO (Last In, First Out)** principle. Imagine a stack of plates: the last plate you put on top is the first one you take off.\n\n- **Push**: Add an element to the top.\n- **Pop**: Remove the top element.\n- **Peek/Top**: Look at the top element without removing it.",
        codeSnippets: {
          "Python": "stack = []\nstack.append(1) # Push\nstack.append(2)\ntop = stack.pop() # Pop (returns 2)",
          "C++": "#include <stack>\nstack<int> s;\ns.push(1); // Push\ns.push(2);\nint top = s.top(); // Peek\ns.pop(); // Pop",
          "Java": "Stack<Integer> stack = new Stack<>();\nstack.push(1);\nstack.push(2);\nint top = stack.pop();",
          "JavaScript": "let stack = [];\nstack.push(1); // Push\nstack.push(2);\nlet top = stack.pop(); // Pop (returns 2)"
        }
      },
      { 
        id: "dsa_stack_step2", 
        text: "Stack using Array", 
        visualType: "stack", 
        visualState: "pop",
        explanation: "Under the hood, we can build a Stack using a standard Array. We keep a `top` pointer (index) to know where to insert or delete. **Time Complexity: O(1)** for Push/Pop.",
        codeSnippets: {
          "Python": "class ArrayStack:\n    def __init__(self):\n        self.arr = []\n    def push(self, val):\n        self.arr.append(val)\n    def pop(self):\n        if not self.arr: return None\n        return self.arr.pop()",
          "C++": "class ArrayStack {\n    int arr[100];\n    int top = -1;\npublic:\n    void push(int x) { arr[++top] = x; }\n    int pop() { return top >= 0 ? arr[top--] : -1; }\n};",
          "Java": "class ArrayStack {\n    int[] arr = new int[100];\n    int top = -1;\n    void push(int x) { arr[++top] = x; }\n    int pop() { return top >= 0 ? arr[top--] : -1; }\n}",
          "JavaScript": "class ArrayStack {\n    constructor() { this.arr = []; }\n    push(val) { this.arr.push(val); }\n    pop() { return this.arr.pop(); }\n}"
        }
      },
      { 
        id: "dsa_stack_step3", 
        text: "Stack using Linked List", 
        visualType: "stack", 
        visualState: "pop",
        explanation: "Alternatively, we can build a Stack using a Linked List. We always insert new nodes at the `head` (Push) and remove from the `head` (Pop). This prevents the need for dynamic array resizing.",
        codeSnippets: {
          "Python": "class Node:\n    def __init__(self, data): self.data, self.next = data, None\nclass ListStack:\n    def __init__(self): self.head = None\n    def push(self, data):\n        node = Node(data)\n        node.next = self.head\n        self.head = node",
          "C++": "struct Node { int data; Node* next; };\nclass ListStack {\n    Node* head = nullptr;\npublic:\n    void push(int val) {\n        Node* n = new Node{val, head};\n        head = n;\n    }\n};",
          "Java": "class Node { int data; Node next; Node(int d){ data=d; } }\nclass ListStack {\n    Node head;\n    void push(int val) {\n        Node n = new Node(val);\n        n.next = head;\n        head = n;\n    }\n}",
          "JavaScript": "class Node { constructor(d) { this.data=d; this.next=null; } }\nclass ListStack {\n    constructor() { this.head = null; }\n    push(val) {\n        let n = new Node(val);\n        n.next = this.head;\n        this.head = n;\n    }\n}"
        }
      }
    ]
  },
  {
    id: "queue",
    title: "12. Queue",
    description: "FIFO, Enqueue/Dequeue",
    icon: "🚶",
    teachingSteps: [
      { 
        id: "dsa_queue_step1", 
        text: "Enqueue/Dequeue (FIFO)", 
        visualType: "queue", 
        visualState: "enqueue",
        explanation: "A **Queue** follows the **FIFO (First In, First Out)** principle. Think of a line at a grocery store: the first person to join the line is the first to be served.\n\n- **Enqueue**: Add to the back of the line.\n- **Dequeue**: Remove from the front of the line.",
        codeSnippets: {
          "Python": "from collections import deque\nq = deque()\nq.append(1) # Enqueue\nq.append(2)\nfront = q.popleft() # Dequeue (returns 1)",
          "C++": "#include <queue>\nqueue<int> q;\nq.push(1); // Enqueue\nq.push(2);\nint front = q.front(); q.pop(); // Dequeue",
          "Java": "Queue<Integer> q = new LinkedList<>();\nq.offer(1); // Enqueue\nq.offer(2);\nint front = q.poll(); // Dequeue",
          "JavaScript": "let q = [];\nq.push(1); // Enqueue\nq.push(2);\nlet front = q.shift(); // Dequeue (returns 1)"
        }
      },
      { 
        id: "dsa_queue_step2", 
        text: "Queue using Array/Linked List", 
        visualType: "queue", 
        visualState: "dequeue",
        explanation: "Implementing a Queue with an Array can be slow (O(N) for dequeue) because you have to shift all elements over. \n\nImplementing with a Linked List gives O(1) Enqueue and Dequeue, by keeping track of a `head` and a `tail` pointer.",
        codeSnippets: {
          "Python": "class Node:\n    def __init__(self, d): self.d, self.next = d, None\nclass ListQueue:\n    def __init__(self): self.head = self.tail = None\n    def enqueue(self, val):\n        n = Node(val)\n        if not self.tail: self.head = self.tail = n\n        else: self.tail.next = n; self.tail = n",
          "C++": "// Maintain head for dequeue, tail for enqueue.\n// O(1) time complexity.",
          "Java": "// Maintain head for dequeue, tail for enqueue.\n// O(1) time complexity.",
          "JavaScript": "// Maintain head for dequeue, tail for enqueue.\n// O(1) time complexity."
        }
      },
      { 
        id: "dsa_queue_step3", 
        text: "Stack using Queue", 
        visualType: "queue", 
        visualState: "dequeue",
        explanation: "A classic interview question: Implement a Stack using 2 Queues.\n\nSince Queues are FIFO, to get LIFO behavior, we can push a new element to an empty `Queue2`, then dequeue everything from `Queue1` into `Queue2`, and swap their names.",
        codeSnippets: {
          "Python": "class StackViaQueue:\n    def __init__(self):\n        self.q1 = deque()\n        self.q2 = deque()\n    def push(self, val):\n        self.q2.append(val)\n        while self.q1: self.q2.append(self.q1.popleft())\n        self.q1, self.q2 = self.q2, self.q1",
          "C++": "// C++: Push to q2, transfer q1 to q2, swap q1 & q2.",
          "Java": "// Java: Push to q2, transfer q1 to q2, swap q1 & q2.",
          "JavaScript": "// JS: Push to q2, transfer q1 to q2, swap q1 & q2."
        }
      },
      { 
        id: "dsa_queue_step4", 
        text: "Circular Queue", 
        visualType: "queue", 
        visualState: "enqueue",
        explanation: "A **Circular Queue** avoids memory waste in an array-based queue. When the `tail` pointer reaches the end of the array, it wraps back around to index 0 using the modulo operator `(tail + 1) % capacity`.",
        codeSnippets: {
          "Python": "def enqueue(self, val):\n    if self.is_full(): return False\n    self.tail = (self.tail + 1) % self.capacity\n    self.arr[self.tail] = val\n    self.size += 1",
          "C++": "void enqueue(int val) {\n    tail = (tail + 1) % capacity;\n    arr[tail] = val;\n}",
          "Java": "void enqueue(int val) {\n    tail = (tail + 1) % capacity;\n    arr[tail] = val;\n}",
          "JavaScript": "enqueue(val) {\n    this.tail = (this.tail + 1) % this.capacity;\n    this.arr[this.tail] = val;\n}"
        }
      },
      { 
        id: "dsa_queue_step5", 
        text: "Priority Queue", 
        visualType: "queue", 
        visualState: "enqueue",
        explanation: "A **Priority Queue** doesn't follow strict FIFO. Instead, each element has a 'priority', and elements with the highest priority are dequeued first. Under the hood, these are usually implemented as Heaps (which we will cover soon).",
        codeSnippets: {
          "Python": "import heapq\npq = []\nheapq.heappush(pq, (1, 'task1')) # (priority, item)\nheapq.heappop(pq) # returns (1, 'task1')",
          "C++": "#include <queue>\npriority_queue<int> pq;\npq.push(10);\npq.push(20);\nint top = pq.top(); // 20",
          "Java": "PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());\npq.add(10);\npq.add(20);\nint top = pq.poll(); // 20",
          "JavaScript": "// JS does not have a built-in Priority Queue.\n// You must implement it manually or use an npm package."
        }
      },
      { 
        id: "dsa_queue_step6", 
        text: "Deque", 
        visualType: "queue", 
        visualState: "enqueue",
        explanation: "A **Deque (Double Ended Queue)** allows insertion and deletion at BOTH ends (front and back) in O(1) time. It is essentially a combination of a Stack and a Queue.",
        codeSnippets: {
          "Python": "from collections import deque\nd = deque()\nd.append(1) # Add to back\nd.appendleft(2) # Add to front\nd.pop() # Remove from back\nd.popleft() # Remove from front",
          "C++": "#include <deque>\ndeque<int> d;\nd.push_back(1);\nd.push_front(2);\nd.pop_back();\nd.pop_front();",
          "Java": "Deque<Integer> d = new ArrayDeque<>();\nd.addLast(1);\nd.addFirst(2);\nd.removeLast();\nd.removeFirst();",
          "JavaScript": "// JS Arrays can act as Deques, though unshift/shift are O(N).\nd.push(1); // back\nd.unshift(2); // front\nd.pop(); // back\nd.shift(); // front"
        }
      }
    ]
  },
  {
    id: "maps",
    title: "13. Hash Table",
    description: "Key-value pairs, collisions",
    icon: "🗂️",
    teachingSteps: [
      { 
        id: "dsa_maps_step1", 
        text: "What is a Hash Table?", 
        visualType: "hashtable", 
        visualState: "hash",
        explanation: "A **Hash Table** stores data in **Key-Value pairs**. Its biggest advantage is that it can look up, insert, and delete data in **O(1) constant time**.\n\nImagine an encyclopedia where you don't have to turn pages; you just think of a word, and it instantly opens to the exact page.",
        codeSnippets: {
          "Python": "hash_map = {}\nhash_map[\"Alice\"] = 25 # Insert\nprint(hash_map[\"Alice\"]) # Lookup (O(1))",
          "C++": "#include <unordered_map>\nunordered_map<string, int> umap;\numap[\"Alice\"] = 25; // Insert\ncout << umap[\"Alice\"]; // Lookup",
          "Java": "HashMap<String, Integer> map = new HashMap<>();\nmap.put(\"Alice\", 25); // Insert\nint age = map.get(\"Alice\"); // Lookup",
          "JavaScript": "let map = new Map();\nmap.set(\"Alice\", 25); // Insert\nconsole.log(map.get(\"Alice\")); // Lookup"
        }
      },
      { 
        id: "dsa_maps_step2", 
        text: "Hash Functions", 
        visualType: "hashtable", 
        visualState: "hash",
        explanation: "How does it achieve O(1) time? Using a **Hash Function**. \n\nThe hash function takes the Key (e.g., \"Alice\"), scrambles it mathematically, and spits out an integer index (e.g., 4). The Value is then stored at index 4 in an underlying array.",
        codeSnippets: {
          "Python": "index = hash(\"Alice\") % array_size",
          "C++": "size_t index = hash<string>{}(\"Alice\") % array_size;",
          "Java": "int index = Math.abs(\"Alice\".hashCode()) % array_size;",
          "JavaScript": "// Simple custom hash function\nlet hash = 0;\nfor (let i = 0; i < str.length; i++) {\n    hash = (hash << 5) - hash + str.charCodeAt(i);\n}"
        }
      },
      { 
        id: "dsa_maps_step3", 
        text: "Collision Handling", 
        visualType: "hashtable", 
        visualState: "hash",
        explanation: "Sometimes the Hash Function assigns two different keys to the SAME index. This is a **Collision**.\n\n- **Chaining**: The array stores Linked Lists instead of single values. Colliding items are chained together.\n- **Open Addressing**: If the index is full, we probe (search) for the next empty slot in the array.",
        codeSnippets: {
          "Python": "# Python dicts use Open Addressing (specifically, randomized probing)",
          "C++": "// std::unordered_map uses Chaining (linked lists in buckets)",
          "Java": "// HashMap uses Chaining. (In Java 8+, it upgrades to Trees if chains get too long)",
          "JavaScript": "// JS Maps handle collisions internally, usually via Chaining or Hash Trees"
        }
      },
      { 
        id: "dsa_maps_step4", 
        text: "Sets vs Maps", 
        visualType: "hashtable", 
        visualState: "hash",
        explanation: "A **Set** is just a Hash Table that only stores Keys (no Values). It is used to quickly check if an item exists or to remove duplicates in O(1) time.",
        codeSnippets: {
          "Python": "my_set = set([1, 2, 2, 3]) # {1, 2, 3}\nprint(2 in my_set) # True, O(1)",
          "C++": "#include <unordered_set>\nunordered_set<int> uset = {1, 2, 2, 3};\nbool exists = uset.count(2);",
          "Java": "HashSet<Integer> set = new HashSet<>(Arrays.asList(1, 2, 2, 3));\nbool exists = set.contains(2);",
          "JavaScript": "let set = new Set([1, 2, 2, 3]);\nlet exists = set.has(2);"
        }
      }
    ]
  },
  {
    id: "trees",
    title: "14. Trees",
    description: "Binary trees, BST, traversals",
    icon: "🌳",
    teachingSteps: [
      { 
        id: "dsa_trees_step1", 
        text: "Binary Tree", 
        visualType: "tree", 
        visualState: "binary",
        explanation: "A **Tree** is a hierarchical data structure. A **Binary Tree** restricts each node to have at most 2 children (`left` and `right`).\n\nThe topmost node is the **Root**. Nodes with no children are **Leaves**.",
        codeSnippets: {
          "Python": "class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None",
          "C++": "struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};",
          "Java": "class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int x) { val = x; }\n}",
          "JavaScript": "class TreeNode {\n    constructor(val) {\n        this.val = val;\n        this.left = this.right = null;\n    }\n}"
        }
      },
      { 
        id: "dsa_trees_step2", 
        text: "Binary Search Tree (BST)", 
        visualType: "tree", 
        visualState: "bst",
        explanation: "A **Binary Search Tree (BST)** adds a strict rule: \n- Everything in the **left subtree** is SMALLER than the root.\n- Everything in the **right subtree** is LARGER than the root.\n\nThis makes searching extremely fast: **O(log N)**.",
        codeSnippets: {
          "Python": "def search_bst(root, target):\n    if not root: return False\n    if root.val == target: return True\n    elif target < root.val: return search_bst(root.left, target)\n    else: return search_bst(root.right, target)",
          "C++": "bool searchBST(TreeNode* root, int target) {\n    if(!root) return false;\n    if(root->val == target) return true;\n    if(target < root->val) return searchBST(root->left, target);\n    return searchBST(root->right, target);\n}",
          "Java": "boolean searchBST(TreeNode root, int target) {\n    if(root == null) return false;\n    if(root.val == target) return true;\n    if(target < root.val) return searchBST(root.left, target);\n    return searchBST(root.right, target);\n}",
          "JavaScript": "function searchBST(root, target) {\n    if(!root) return false;\n    if(root.val === target) return true;\n    if(target < root.val) return searchBST(root.left, target);\n    return searchBST(root.right, target);\n}"
        }
      },
      { 
        id: "dsa_trees_step3", 
        text: "Tree Traversals", 
        visualType: "tree", 
        visualState: "traverse",
        explanation: "We use Recursion to traverse trees.\n\n- **Preorder**: Root, Left, Right\n- **Inorder**: Left, Root, Right (This prints a BST in sorted order!)\n- **Postorder**: Left, Right, Root",
        codeSnippets: {
          "Python": "def inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.val)\n        inorder(root.right)",
          "C++": "void inorder(TreeNode* root) {\n    if(root) {\n        inorder(root->left);\n        cout << root->val << \" \";\n        inorder(root->right);\n    }\n}",
          "Java": "void inorder(TreeNode root) {\n    if(root != null) {\n        inorder(root.left);\n        System.out.println(root.val);\n        inorder(root.right);\n    }\n}",
          "JavaScript": "function inorder(root) {\n    if(root) {\n        inorder(root.left);\n        console.log(root.val);\n        inorder(root.right);\n    }\n}"
        }
      },
      { 
        id: "dsa_trees_step4", 
        text: "Balanced Trees", 
        visualType: "tree", 
        visualState: "basic",
        explanation: "If you insert sorted data into a BST (1, 2, 3, 4), it becomes a straight line (a Linked List!). The search time degrades to O(N).\n\n**Balanced Trees** (like AVL Trees or Red-Black Trees) automatically rotate their nodes during insertion to guarantee the tree remains short and wide, maintaining O(log N) speed.",
        codeSnippets: {
          "Python": "# Trees like AVL or Red-Black automatically re-balance.",
          "C++": "// std::map and std::set are implemented as Red-Black Trees.",
          "Java": "// TreeMap and TreeSet are implemented as Red-Black Trees.",
          "JavaScript": "// Balanced tree logic involves complex Left/Right Rotations."
        }
      }
    ]
  },
  {
    id: "heaps",
    title: "15. Heaps",
    description: "Priority queue, heapsort",
    icon: "⛰️",
    teachingSteps: [
      { 
        id: "dsa_heaps_step1", 
        text: "Min-Heap vs Max-Heap", 
        visualType: "heap", 
        visualState: "insert",
        explanation: "A **Heap** is a complete binary tree used to quickly find the minimum or maximum element.\n\n- **Min-Heap**: The root is the SMALLEST element. Every parent is smaller than its children.\n- **Max-Heap**: The root is the LARGEST element. Every parent is larger than its children.\n\nHeaps are the underlying structure for Priority Queues.",
        codeSnippets: {
          "Python": "import heapq\nmin_heap = []\nheapq.heappush(min_heap, 5)\nheapq.heappush(min_heap, 1)\nprint(min_heap[0]) # 1 (Root is smallest)",
          "C++": "#include <queue>\npriority_queue<int, vector<int>, greater<int>> minHeap;\nminHeap.push(5); minHeap.push(1);\ncout << minHeap.top(); // 1",
          "Java": "PriorityQueue<Integer> minHeap = new PriorityQueue<>();\nminHeap.add(5); minHeap.add(1);\nSystem.out.println(minHeap.peek()); // 1",
          "JavaScript": "// JS lacks a built-in heap. Usually implemented with arrays."
        }
      },
      { 
        id: "dsa_heaps_step2", 
        text: "Insertion and Deletion", 
        visualType: "heap", 
        visualState: "heapify",
        explanation: "Because a Heap must remain a complete tree, we insert elements at the very bottom right, then **Bubble Up** (swap with parent) until the heap property is restored. **O(log N)**.\n\nWhen we delete the root, we swap it with the bottom right element, remove it, and then **Bubble Down** (swap with smallest/largest child). **O(log N)**.",
        codeSnippets: {
          "Python": "# Bubble Up (simplified concept)\n# while arr[i] < arr[parent(i)]:\n#     swap(arr[i], arr[parent(i)])",
          "C++": "// Bubble Down (simplified concept)\n// while arr[i] > arr[min_child(i)]:\n//     swap(arr[i], arr[min_child(i)])",
          "Java": "// The standard library PriorityQueue handles Bubble Up/Down automatically.",
          "JavaScript": "// Bubble Up / Bubble Down logic requires manual implementation in JS."
        }
      },
      { 
        id: "dsa_heaps_step3", 
        text: "Heap Sort", 
        visualType: "heap", 
        visualState: "heapify",
        explanation: "**Heap Sort** is a highly efficient sorting algorithm (O(N log N) time, O(1) space). \n\nWe convert an array into a Max-Heap (called Heapifying). Then we repeatedly pop the root (the largest element) and move it to the end of the array, shrinking the heap size each time.",
        codeSnippets: {
          "Python": "def heapify(arr, n, i):\n    largest = i\n    l = 2 * i + 1\n    r = 2 * i + 2\n    # (Compare and swap logic)\n# heap sort builds heap, then extracts elements.",
          "C++": "// std::make_heap and std::sort_heap do this automatically in C++.",
          "Java": "// Heap Sort requires manual array manipulation in Java unless using PriorityQueue.",
          "JavaScript": "// Heap Sort requires manual array manipulation."
        }
      }
    ]
  },
  {
    id: "graphs",
    title: "16. Graphs",
    description: "BFS, DFS, shortest path",
    icon: "🕸️",
    teachingSteps: [
      { 
        id: "dsa_graphs_step1", 
        text: "Adjacency List/Matrix", 
        visualType: "graph", 
        visualState: "basic",
        explanation: "A **Graph** is a collection of Nodes (Vertices) and Edges connecting them. \n\n- **Adjacency Matrix**: A 2D array where `matrix[i][j] = 1` if an edge exists. O(V²) space.\n- **Adjacency List**: An array/map of lists, where `adj[i]` contains all neighbors of node `i`. O(V + E) space. (Most common).",
        codeSnippets: {
          "Python": "adj_list = {0: [1, 2], 1: [0], 2: [0]}",
          "C++": "vector<vector<int>> adj = {{1, 2}, {0}, {0}};",
          "Java": "Map<Integer, List<Integer>> adj = new HashMap<>();",
          "JavaScript": "let adjList = {0: [1, 2], 1: [0], 2: [0]};"
        }
      },
      { 
        id: "dsa_graphs_step2", 
        text: "BFS (Breadth-First Search)", 
        visualType: "graph", 
        visualState: "bfs",
        explanation: "**BFS** explores the graph level by level, radiating outward. \n\nIt uses a **Queue**. We mark nodes as 'visited' so we don't process them twice. BFS is perfect for finding the **Shortest Path** on an unweighted graph.",
        codeSnippets: {
          "Python": "def bfs(graph, start):\n    visited, queue = set([start]), [start]\n    while queue:\n        node = queue.pop(0)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)",
          "C++": "// C++ BFS using std::queue",
          "Java": "// Java BFS using Queue and HashSet",
          "JavaScript": "// JS BFS using array push/shift and Set"
        }
      },
      { 
        id: "dsa_graphs_step3", 
        text: "DFS (Depth-First Search)", 
        visualType: "graph", 
        visualState: "dfs",
        explanation: "**DFS** goes as deep as possible down one path before backtracking. \n\nIt uses a **Stack** (usually the implicit Call Stack via recursion). DFS is great for finding connected components, detecting cycles, or solving mazes.",
        codeSnippets: {
          "Python": "def dfs(graph, node, visited):\n    if node not in visited:\n        print(node)\n        visited.add(node)\n        for neighbor in graph[node]:\n            dfs(graph, neighbor, visited)",
          "C++": "// C++ DFS using recursion",
          "Java": "// Java DFS using recursion",
          "JavaScript": "// JS DFS using recursion"
        }
      },
      { 
        id: "dsa_graphs_step4", 
        text: "Topological Sort", 
        visualType: "graph", 
        visualState: "directed",
        explanation: "**Topological Sort** orders the nodes of a Directed Acyclic Graph (DAG) such that for every directed edge `U -> V`, node `U` comes before `V`.\n\nUsed heavily in task scheduling (e.g., Course Prerequisites, Build Systems). Uses a modified DFS or Kahn's Algorithm.",
        codeSnippets: {
          "Python": "# Topological Sort implementation omitted for brevity",
          "C++": "// Topological Sort implementation omitted for brevity",
          "Java": "// Topological Sort implementation omitted for brevity",
          "JavaScript": "// Topological Sort implementation omitted for brevity"
        }
      },
      { 
        id: "dsa_graphs_step5", 
        text: "Shortest Path & MST", 
        visualType: "graph", 
        visualState: "bfs",
        explanation: "- **Dijkstra's Algorithm**: Finds the shortest path in a weighted graph using a Priority Queue.\n- **Prim's & Kruskal's**: Find the Minimum Spanning Tree (MST)—the cheapest way to connect all nodes without cycles.",
        codeSnippets: {
          "Python": "# Dijkstra/MST implementations omitted for brevity",
          "C++": "// Dijkstra/MST implementations omitted for brevity",
          "Java": "// Dijkstra/MST implementations omitted for brevity",
          "JavaScript": "// Dijkstra/MST implementations omitted for brevity"
        }
      }
    ]
  },
  {
    id: "tries",
    title: "17. Tries",
    description: "Prefix trees, compressed tries",
    icon: "⛺",
    teachingSteps: [
      { 
        id: "dsa_tries_step1", 
        text: "Standard Trie", 
        visualType: "trie", 
        visualState: "search",
        explanation: "A **Trie** (Prefix Tree) is a tree-like data structure used to store strings. Each node represents a single character.\n\nIt is extremely fast (O(L) where L is the string length) for prefix matching, making it the perfect structure for **Autocomplete** and **Spell Checkers**.",
        codeSnippets: {
          "Python": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_word = False",
          "C++": "struct TrieNode {\n    unordered_map<char, TrieNode*> children;\n    bool isWord = false;\n};",
          "Java": "class TrieNode {\n    Map<Character, TrieNode> children = new HashMap<>();\n    boolean isWord = false;\n}",
          "JavaScript": "class TrieNode {\n    constructor() {\n        this.children = {};\n        this.isWord = false;\n    }\n}"
        }
      },
      { 
        id: "dsa_tries_step2", 
        text: "Compressed Trie / Suffix Trie", 
        visualType: "trie", 
        visualState: "search",
        explanation: "- **Compressed Trie (Radix Tree)**: Groups single-child chains into a single node to save memory.\n- **Suffix Trie**: Contains all suffixes of a string, used in complex substring matching algorithms (e.g., DNA sequencing).",
        codeSnippets: {
          "Python": "# Standard insert/search logic usually sufficient for interviews",
          "C++": "// Standard insert/search logic usually sufficient for interviews",
          "Java": "// Standard insert/search logic usually sufficient for interviews",
          "JavaScript": "// Standard insert/search logic usually sufficient for interviews"
        }
      }
    ]
  },
  {
    id: "dp",
    title: "18. Dynamic Programming",
    description: "Memoization, tabulation",
    icon: "🧠",
    teachingSteps: [
      { 
        id: "dsa_dp_step1", 
        text: "Memoization (Top-Down)", 
        visualType: "dp", 
        visualState: "memo",
        explanation: "Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems.\n\n**Memoization** uses recursion. If we calculate `fib(4)`, we save the result in a cache (Hash Map). The next time we need `fib(4)`, we instantly return the cached value instead of recomputing it.",
        codeSnippets: {
          "Python": "memo = {}\ndef fib(n):\n    if n <= 1: return n\n    if n not in memo:\n        memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]",
          "C++": "// C++: Use an unordered_map or array for the memo cache",
          "Java": "// Java: Use a HashMap or array for the memo cache",
          "JavaScript": "// JS: Use a Map or object for the memo cache"
        }
      },
      { 
        id: "dsa_dp_step2", 
        text: "Tabulation (Bottom-Up)", 
        visualType: "dp", 
        visualState: "memo",
        explanation: "**Tabulation** avoids recursion entirely. It builds a table (array) starting from the smallest subproblems (`fib(0)` and `fib(1)`) and uses a loop to build up to the final answer.\n\nTabulation is usually more memory-efficient because it doesn't build a massive Call Stack.",
        codeSnippets: {
          "Python": "def fib(n):\n    if n <= 1: return n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]",
          "C++": "// C++: Create a vector or array of size n+1",
          "Java": "// Java: Create an int[] array of size n+1",
          "JavaScript": "// JS: Create an array of size n+1"
        }
      },
      { 
        id: "dsa_dp_step3", 
        text: "Classic DP Problems", 
        visualType: "dp", 
        visualState: "memo",
        explanation: "DP is famously difficult to master. Start by recognizing these classic patterns:\n\n1. **1D Array**: Climbing Stairs, Fibonacci.\n2. **2D Grid**: Unique Paths, Minimum Path Sum.\n3. **String/Sequence**: Longest Common Subsequence, Edit Distance.\n4. **0/1 Knapsack**: Choosing items to maximize value without exceeding capacity.",
        codeSnippets: {
          "Python": "# Master the patterns, not the individual problems.",
          "C++": "// Master the patterns, not the individual problems.",
          "Java": "// Master the patterns, not the individual problems.",
          "JavaScript": "// Master the patterns, not the individual problems."
        }
      }
    ]
  },
  {
    id: "greedy",
    title: "19. Greedy Algorithms",
    description: "Local optimal choices",
    icon: "🤑",
    teachingSteps: [
      { 
        id: "dsa_greedy_step1", 
        text: "Local Optimal Choices", 
        visualType: "text", 
        visualState: "text",
        explanation: "A **Greedy Algorithm** builds a solution piece by piece, always choosing the next piece that offers the most immediate benefit (the \"local optimum\").\n\nIt does not reconsider past choices. It assumes that making the best local choice will lead to the best global solution. \n\n*Example*: Giving change for $0.90 using the fewest coins. A greedy algorithm takes the largest coin possible first ($0.25 x 3), then the next ($0.10 x 1), then ($0.05 x 1).",
        codeSnippets: {
          "Python": "def give_change(amount):\n    coins = [25, 10, 5, 1]\n    count = 0\n    for c in coins:\n        count += amount // c\n        amount %= c\n    return count",
          "C++": "// C++ greedy logic",
          "Java": "// Java greedy logic",
          "JavaScript": "// JS greedy logic"
        }
      }
    ]
  },
  {
    id: "backtracking",
    title: "20. Backtracking Algorithms",
    description: "Exploring paths, reverting",
    icon: "🔙",
    teachingSteps: [
      { 
        id: "dsa_backtracking_step1", 
        text: "Exploring Paths & Reverting", 
        visualType: "recursion", 
        visualState: "build",
        explanation: "**Backtracking** is a refined brute force approach. It explores a potential path to a solution. \n\nIf it realizes the current path is a dead end (or violates constraints), it **cancels** the last move and steps back to try a different path.\n\n*Examples*: Solving a Sudoku puzzle, generating permutations, or the N-Queens problem.",
        codeSnippets: {
          "Python": "def solve(state):\n    if is_solution(state): return True\n    for choice in get_choices():\n        make(choice)\n        if solve(state): return True\n        unmake(choice) # BACKTRACK\n    return False",
          "C++": "// Make choice -> Recurse -> Unmake choice",
          "Java": "// Make choice -> Recurse -> Unmake choice",
          "JavaScript": "// Make choice -> Recurse -> Unmake choice"
        }
      }
    ]
  },
  {
    id: "disjointset",
    title: "21. Disjoint Set",
    description: "Union-Find, path compression",
    icon: "🔗",
    teachingSteps: [
      { 
        id: "dsa_disjointset_step1", 
        text: "Union-Find & Path Compression", 
        visualType: "text", 
        visualState: "text",
        explanation: "A **Disjoint Set (Union-Find)** keeps track of elements partitioned into non-overlapping subsets. It is heavily used in graph algorithms like Kruskal's MST.\n\n- **Find**: Determine which subset an element is in.\n- **Union**: Merge two subsets.\n- **Path Compression**: Flattens the structure when 'Find' is called, making future operations nearly **O(1)**.",
        codeSnippets: {
          "Python": "class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n    def find(self, i):\n        if self.parent[i] == i: return i\n        self.parent[i] = self.find(self.parent[i]) # Path compression\n        return self.parent[i]",
          "C++": "// C++ Union-Find with Path Compression",
          "Java": "// Java Union-Find with Path Compression",
          "JavaScript": "// JS Union-Find with Path Compression"
        }
      }
    ]
  },
  {
    id: "advancedpatterns",
    title: "22. Advanced Patterns",
    description: "Sliding Window & Two Pointers",
    icon: "🪟",
    teachingSteps: [
      { 
        id: "dsa_advancedpatterns_step1", 
        text: "Sliding Window", 
        visualType: "text", 
        visualState: "text",
        explanation: "The **Sliding Window** pattern is used to perform operations on a specific window size of a given array or string.\n\nInstead of recalculating the sum of a sub-array `[a, b, c]` from scratch, you subtract the element that leaves the window and add the element that enters it. Transforms O(N²) into O(N).",
        codeSnippets: {
          "Python": "# Max Sum Subarray of Size K\nwindow_sum = sum(arr[:k])\nmax_sum = window_sum\nfor i in range(len(arr) - k):\n    window_sum = window_sum - arr[i] + arr[i+k]\n    max_sum = max(max_sum, window_sum)",
          "C++": "// C++ Sliding Window",
          "Java": "// Java Sliding Window",
          "JavaScript": "// JS Sliding Window"
        }
      },
      { 
        id: "dsa_advancedpatterns_step2", 
        text: "Two Pointers", 
        visualType: "text", 
        visualState: "text",
        explanation: "The **Two Pointers** pattern uses two indices to iterate through a data structure.\n\n- **Opposite Ends**: One pointer at the start, one at the end (e.g., reversing an array, checking palindromes).\n- **Fast & Slow**: One pointer moves twice as fast as the other (e.g., detecting cycles in a Linked List).",
        codeSnippets: {
          "Python": "# Reverse an array in-place\nl, r = 0, len(arr) - 1\nwhile l < r:\n    arr[l], arr[r] = arr[r], arr[l]\n    l += 1; r -= 1",
          "C++": "// C++ Two Pointers",
          "Java": "// Java Two Pointers",
          "JavaScript": "// JS Two Pointers"
        }
      }
    ]
  }
];
