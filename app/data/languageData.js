export const LANGUAGE_TOPICS = [
  {
    id: "basics",
    title: "Basics & Syntax",
    description: "Variables, Primitives, Data Types",
    icon: "📦",
    teachingSteps: [
      { 
        id: "step1", 
        text: "What is a Variable?", 
        visualType: "text", 
        visualState: "text",
        explanation: "A **variable** is a named location in memory used to store data. Think of it as a labeled box where you can put a value (like a number or text) and retrieve it later using the label.\n\nDepending on the language, variables might be strongly typed (you must declare what type of data they hold) or dynamically typed (the language figures it out).",
        codeSnippets: {
          "Python": "# Python is dynamically typed\nmy_name = \"Alice\"\nage = 25\n\nprint(f\"Hello {my_name}, you are {age}\")",
          "C++": "// C++ is statically typed\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string my_name = \"Alice\";\n    int age = 25;\n    cout << \"Hello \" << my_name << \", you are \" << age;\n    return 0;\n}",
          "Java": "// Java is statically typed\npublic class Main {\n    public static void main(String[] args) {\n        String myName = \"Alice\";\n        int age = 25;\n        System.out.println(\"Hello \" + myName + \", you are \" + age);\n    }\n}",
          "JavaScript": "// JavaScript is dynamically typed\nlet myName = \"Alice\";\nlet age = 25;\n\nconsole.log(`Hello ${myName}, you are ${age}`);"
        }
      },
      { 
        id: "step2", 
        text: "Primitive Data Types", 
        visualType: "text", 
        visualState: "text",
        explanation: "At the core of programming are **primitive data types**—the most basic forms of data built into the language. Common primitives include:\n- **Integers**: Whole numbers (`42`)\n- **Floats/Doubles**: Decimal numbers (`3.14`)\n- **Booleans**: True or False\n- **Characters/Strings**: Text data (`'A'`, `\"Hello\"`)",
        codeSnippets: {
          "Python": "is_active = True\nscore = 100\nprice = 19.99\nletter = 'A'",
          "C++": "bool isActive = true;\nint score = 100;\ndouble price = 19.99;\nchar letter = 'A';",
          "Java": "boolean isActive = true;\nint score = 100;\ndouble price = 19.99;\nchar letter = 'A';",
          "JavaScript": "let isActive = true;\nlet score = 100;\nlet price = 19.99;\n// JS doesn't have a distinct char type, just strings\nlet letter = 'A';"
        }
      },
      {
        id: "step3",
        text: "Type Casting / Conversion",
        visualType: "text",
        visualState: "text",
        explanation: "Sometimes you need to convert data from one type to another—this is called **Type Casting** or Type Conversion. For example, converting a string `\"42\"` into an actual integer `42` so you can do math with it.",
        codeSnippets: {
          "Python": "str_num = \"42\"\nint_num = int(str_num)\nfloat_num = float(int_num)\n\nprint(int_num + 8) # 50",
          "C++": "string strNum = \"42\";\nint intNum = stoi(strNum);\ndouble floatNum = (double)intNum;\n\ncout << (intNum + 8); // 50",
          "Java": "String strNum = \"42\";\nint intNum = Integer.parseInt(strNum);\ndouble floatNum = (double) intNum;\n\nSystem.out.println(intNum + 8); // 50",
          "JavaScript": "let strNum = \"42\";\nlet intNum = parseInt(strNum);\nlet floatNum = parseFloat(strNum);\n\nconsole.log(intNum + 8); // 50"
        }
      },
      {
        id: "step4",
        text: "Input and Output (I/O)",
        visualType: "text",
        visualState: "text",
        explanation: "**I/O** allows your program to interact with the outside world. Output prints data to the screen (like a terminal), while Input asks the user to type something in.",
        codeSnippets: {
          "Python": "name = input(\"Enter your name: \")\nprint(f\"Welcome, {name}!\")",
          "C++": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << \"Enter your name: \";\n    cin >> name;\n    cout << \"Welcome, \" << name << \"!\\n\";\n}",
          "Java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print(\"Enter your name: \");\n        String name = scanner.nextLine();\n        System.out.println(\"Welcome, \" + name + \"!\");\n    }\n}",
          "JavaScript": "// In Node.js (Terminal):\nconst readline = require('readline').createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\nreadline.question('Enter your name: ', name => {\n  console.log(`Welcome, ${name}!`);\n  readline.close();\n});"
        }
      }
    ]
  },
  {
    id: "operators",
    title: "Operators & Expressions",
    description: "Arithmetic, Logical, Bitwise",
    icon: "🧮",
    teachingSteps: [
      {
        id: "step1",
        text: "Arithmetic & Modulo",
        visualType: "text",
        visualState: "math",
        explanation: "Arithmetic operators perform mathematical calculations. The **modulo** operator (`%`) is especially important in programming as it returns the remainder of a division. It is heavily used to check if a number is even/odd or to constrain a value within a range.",
        codeSnippets: {
          "Python": "x = 10\ny = 3\n\nprint(x + y)  # 13\nprint(x % y)  # 1 (remainder)",
          "C++": "int x = 10;\nint y = 3;\n\ncout << (x + y) << endl; // 13\ncout << (x % y) << endl; // 1",
          "Java": "int x = 10;\nint y = 3;\n\nSystem.out.println(x + y); // 13\nSystem.out.println(x % y); // 1",
          "JavaScript": "let x = 10;\nlet y = 3;\n\nconsole.log(x + y); // 13\nconsole.log(x % y); // 1"
        }
      },
      {
        id: "step2",
        text: "Logical & Comparison Operators",
        visualType: "text",
        visualState: "math",
        explanation: "Logical operators evaluate conditions and return boolean values (`true` or `false`). \n- **AND** (`&&` or `and`): True only if BOTH sides are true.\n- **OR** (`||` or `or`): True if AT LEAST ONE side is true.\n- **NOT** (`!` or `not`): Inverts the boolean value.",
        codeSnippets: {
          "Python": "is_weekend = True\nis_raining = False\n\nif is_weekend and not is_raining:\n    print(\"Go outside!\")",
          "C++": "bool isWeekend = true;\nbool isRaining = false;\n\nif (isWeekend && !isRaining) {\n    cout << \"Go outside!\";\n}",
          "Java": "boolean isWeekend = true;\nboolean isRaining = false;\n\nif (isWeekend && !isRaining) {\n    System.out.println(\"Go outside!\");\n}",
          "JavaScript": "let isWeekend = true;\nlet isRaining = false;\n\nif (isWeekend && !isRaining) {\n    console.log(\"Go outside!\");\n}"
        }
      }
    ]
  },
  {
    id: "control_flow",
    title: "Control Flow",
    description: "If/Else, Switch, Match",
    icon: "🔀",
    teachingSteps: [
      {
        id: "step1",
        text: "If, Else If, Else",
        visualType: "text",
        visualState: "text",
        explanation: "Control flow statements allow your code to make decisions. The program checks the `if` condition; if it evaluates to `true`, the code block executes. Otherwise, it moves to the `else if` or `else` block.",
        codeSnippets: {
          "Python": "grade = 85\n\nif grade >= 90:\n    print(\"A\")\nelif grade >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")",
          "C++": "int grade = 85;\n\nif (grade >= 90) {\n    cout << \"A\";\n} else if (grade >= 80) {\n    cout << \"B\";\n} else {\n    cout << \"C\";\n}",
          "Java": "int grade = 85;\n\nif (grade >= 90) {\n    System.out.println(\"A\");\n} else if (grade >= 80) {\n    System.out.println(\"B\");\n} else {\n    System.out.println(\"C\");\n}",
          "JavaScript": "let grade = 85;\n\nif (grade >= 90) {\n    console.log(\"A\");\n} else if (grade >= 80) {\n    console.log(\"B\");\n} else {\n    console.log(\"C\");\n}"
        }
      }
    ]
  },
  {
    id: "loops",
    title: "Loops & Iteration",
    description: "For, While, Iterators",
    icon: "🔄",
    teachingSteps: [
      {
        id: "step1",
        text: "The For Loop",
        visualType: "text",
        visualState: "text",
        explanation: "Loops allow you to run a block of code multiple times. A **for loop** is typically used when you know exactly how many times you want to iterate (e.g., counting from 1 to 10, or iterating over an array).",
        codeSnippets: {
          "Python": "for i in range(1, 6):\n    print(i)  # Prints 1 through 5",
          "C++": "for (int i = 1; i <= 5; i++) {\n    cout << i << endl;\n}",
          "Java": "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}",
          "JavaScript": "for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}"
        }
      },
      {
        id: "step2",
        text: "The While Loop",
        visualType: "text",
        visualState: "text",
        explanation: "A **while loop** runs *as long as* a specified condition is true. It is ideal when you don't know the exact number of iterations in advance, such as waiting for a user to input a valid password.",
        codeSnippets: {
          "Python": "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"Liftoff!\")",
          "C++": "int count = 3;\nwhile (count > 0) {\n    cout << count << endl;\n    count--;\n}\ncout << \"Liftoff!\";",
          "Java": "int count = 3;\nwhile (count > 0) {\n    System.out.println(count);\n    count--;\n}\nSystem.out.println(\"Liftoff!\");",
          "JavaScript": "let count = 3;\nwhile (count > 0) {\n    console.log(count);\n    count--;\n}\nconsole.log(\"Liftoff!\");"
        }
      }
    ]
  },
  {
    id: "functions",
    title: "Functions & Scope",
    description: "Reusability, Returns, Lambdas",
    icon: "🛠️",
    teachingSteps: [
      {
        id: "step1",
        text: "Declaring and Calling Functions",
        visualType: "text",
        visualState: "text",
        explanation: "Functions are reusable blocks of code designed to perform a specific task. By wrapping logic in a function, you can execute it multiple times without copying and pasting code. Functions can accept **parameters** (inputs) and `return` an output.",
        codeSnippets: {
          "Python": "def add(a, b):\n    return a + b\n\nresult = add(5, 7)\nprint(result)",
          "C++": "int add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(5, 7);\n    cout << result;\n    return 0;\n}",
          "Java": "public static int add(int a, int b) {\n    return a + b;\n}\n\npublic static void main(String[] args) {\n    int result = add(5, 7);\n    System.out.println(result);\n}",
          "JavaScript": "function add(a, b) {\n    return a + b;\n}\n\nlet result = add(5, 7);\nconsole.log(result);"
        }
      },
      {
        id: "step2",
        text: "Scope",
        visualType: "text",
        visualState: "text",
        explanation: "**Scope** determines where a variable can be accessed. A variable defined *inside* a function is Local (cannot be seen outside). A variable defined *outside* is Global (can be seen anywhere).",
        codeSnippets: {
          "Python": "global_var = 10\n\ndef my_func():\n    local_var = 5\n    print(global_var + local_var)\n\nmy_func()\n# print(local_var) # ERROR!",
          "C++": "int globalVar = 10;\n\nvoid myFunc() {\n    int localVar = 5;\n    cout << (globalVar + localVar);\n}\n// cout << localVar; // ERROR",
          "Java": "public class Main {\n    static int globalVar = 10;\n    \n    public static void myFunc() {\n        int localVar = 5;\n        System.out.println(globalVar + localVar);\n    }\n}",
          "JavaScript": "let globalVar = 10;\n\nfunction myFunc() {\n    let localVar = 5;\n    console.log(globalVar + localVar);\n}\nmyFunc();\n// console.log(localVar); // ERROR"
        }
      },
      {
        id: "step3",
        text: "Return Values & Multiple Returns",
        visualType: "text",
        visualState: "text",
        explanation: "Functions often compute a result and **return** it to the caller. Some languages (like Python) allow returning multiple values easily as a Tuple. Others require an Array, Object, or passing by reference.",
        codeSnippets: {
          "Python": "def divide(a, b):\n    quotient = a // b\n    remainder = a % b\n    return quotient, remainder\n\nq, r = divide(10, 3)",
          "C++": "#include <tuple>\nusing namespace std;\n\ntuple<int, int> divide(int a, int b) {\n    return make_tuple(a / b, a % b);\n}\n// Use auto [q, r] = divide(10, 3);",
          "Java": "class Result { int q, r; }\nResult divide(int a, int b) {\n    Result res = new Result();\n    res.q = a / b; res.r = a % b;\n    return res;\n}",
          "JavaScript": "function divide(a, b) {\n    return { q: Math.floor(a/b), r: a%b };\n}\nlet { q, r } = divide(10, 3);"
        }
      },
      {
        id: "step4",
        text: "Recursion",
        visualType: "text",
        visualState: "text",
        explanation: "**Recursion** is when a function calls *itself* to solve a smaller piece of the problem. It requires a **Base Case** (when to stop) and a **Recursive Case**. It is extremely important for Data Structures like Trees and Graphs.",
        codeSnippets: {
          "Python": "def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5)) # 120",
          "C++": "int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n// factorial(5) == 120",
          "Java": "public static int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n// factorial(5) == 120",
          "JavaScript": "function factorial(n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nconsole.log(factorial(5)); // 120"
        }
      },
      {
        id: "step5",
        text: "Lambdas & Closures",
        visualType: "text",
        visualState: "text",
        explanation: "**Lambda Functions** (or Anonymous/Arrow Functions) are short, inline functions without a name. A **Closure** happens when a function \"remembers\" the variables from its surrounding scope even after the outer function finishes.",
        codeSnippets: {
          "Python": "# Lambda function\nmultiply = lambda a, b: a * b\nprint(multiply(3, 4)) # 12",
          "C++": "auto multiply = [](int a, int b) { \n    return a * b; \n};\ncout << multiply(3, 4); // 12",
          "Java": "import java.util.function.BiFunction;\n\nBiFunction<Integer, Integer, Integer> multiply = (a, b) -> a * b;\nSystem.out.println(multiply.apply(3, 4));",
          "JavaScript": "// Arrow function with Closure\nconst makeMultiplier = (x) => (y) => x * y;\nconst double = makeMultiplier(2);\nconsole.log(double(5)); // 10"
        }
      }
    ]
  },
  {
    id: "collections",
    title: "Collections & Data Structures",
    description: "Arrays, Sets, Maps, Dictionaries",
    icon: "📚",
    teachingSteps: [
      {
        id: "step1",
        text: "Lists / Dynamic Arrays",
        visualType: "array",
        visualState: "access",
        explanation: "Dynamic arrays (called Lists in Python, ArrayList in Java, Vectors in C++) allow you to store multiple elements and dynamically resize as you add more items.",
        codeSnippets: {
          "Python": "fruits = [\"apple\", \"banana\"]\nfruits.append(\"cherry\")\nprint(fruits[0]) # apple",
          "C++": "#include <vector>\nusing namespace std;\n\nvector<string> fruits = {\"apple\", \"banana\"};\nfruits.push_back(\"cherry\");\ncout << fruits[0];",
          "Java": "import java.util.ArrayList;\n\nArrayList<String> fruits = new ArrayList<>();\nfruits.add(\"apple\");\nfruits.add(\"banana\");\nfruits.add(\"cherry\");\nSystem.out.println(fruits.get(0));",
          "JavaScript": "let fruits = [\"apple\", \"banana\"];\nfruits.push(\"cherry\");\nconsole.log(fruits[0]);"
        }
      },
      {
        id: "step2",
        text: "Hash Maps / Dictionaries",
        visualType: "hashtable",
        visualState: "hash",
        explanation: "A Map (Dictionary in Python, unordered_map in C++) stores data in **Key-Value pairs**. It provides extremely fast O(1) lookups using keys instead of numerical indexes.",
        codeSnippets: {
          "Python": "user = {\"name\": \"Alice\", \"age\": 25}\nprint(user[\"name\"])\nuser[\"city\"] = \"New York\"",
          "C++": "#include <unordered_map>\nusing namespace std;\n\nunordered_map<string, string> user;\nuser[\"name\"] = \"Alice\";\nuser[\"city\"] = \"New York\";\ncout << user[\"name\"];",
          "Java": "import java.util.HashMap;\n\nHashMap<String, String> user = new HashMap<>();\nuser.put(\"name\", \"Alice\");\nuser.put(\"city\", \"New York\");\nSystem.out.println(user.get(\"name\"));",
          "JavaScript": "let user = { name: \"Alice\", age: 25 };\nconsole.log(user.name);\nuser.city = \"New York\";"
        }
      },
      {
        id: "step3",
        text: "Tuples (Immutable Data)",
        visualType: "text",
        visualState: "text",
        explanation: "A **Tuple** is like a List/Array, but it is typically **Immutable** (cannot be changed after creation). They are useful for grouping related data that shouldn't change, like coordinates `(x, y)`.",
        codeSnippets: {
          "Python": "coordinates = (10, 20)\n# coordinates[0] = 15 # ERROR! Tuples are immutable\nprint(coordinates[1])",
          "C++": "#include <tuple>\nusing namespace std;\n\ntuple<int, int> coords = {10, 20};\ncout << get<1>(coords);",
          "Java": "// Java doesn't have built-in Tuples, usually we use Records or small Classes\nrecord Coordinates(int x, int y) {}\nCoordinates coords = new Coordinates(10, 20);\nSystem.out.println(coords.y());",
          "JavaScript": "// JS doesn't have Tuples. We use arrays or Object.freeze()\nconst coords = Object.freeze([10, 20]);\n// coords[0] = 15; // Won't work in strict mode\nconsole.log(coords[1]);"
        }
      },
      {
        id: "step4",
        text: "Sets (Unique Elements)",
        visualType: "text",
        visualState: "text",
        explanation: "A **Set** is an unordered collection of items where **every element must be unique**. If you try to add a duplicate, it simply ignores it. Sets are highly optimized for checking if an item exists in O(1) time.",
        codeSnippets: {
          "Python": "my_set = {1, 2, 3, 3, 3}\nmy_set.add(4)\nprint(my_set) # {1, 2, 3, 4}",
          "C++": "#include <unordered_set>\nusing namespace std;\n\nunordered_set<int> mySet = {1, 2, 3, 3};\nmySet.insert(4);\n// mySet contains 1, 2, 3, 4",
          "Java": "import java.util.HashSet;\n\nHashSet<Integer> mySet = new HashSet<>();\nmySet.add(1);\nmySet.add(2);\nmySet.add(2);\nSystem.out.println(mySet.size()); // 2",
          "JavaScript": "let mySet = new Set([1, 2, 3, 3, 3]);\nmySet.add(4);\nconsole.log(mySet.size); // 4"
        }
      },
      {
        id: "step5",
        text: "Multi-dimensional Arrays",
        visualType: "array",
        visualState: "memory",
        explanation: "A **Multi-dimensional Array** is simply an array of arrays. The most common is a 2D array, which looks exactly like a grid or a matrix with rows and columns.",
        codeSnippets: {
          "Python": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6]\n]\nprint(matrix[1][2]) # Row 1, Col 2 -> prints 6",
          "C++": "int matrix[2][3] = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\ncout << matrix[1][2]; // 6",
          "Java": "int[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\nSystem.out.println(matrix[1][2]); // 6",
          "JavaScript": "let matrix = [\n    [1, 2, 3],\n    [4, 5, 6]\n];\nconsole.log(matrix[1][2]); // 6"
        }
      }
    ]
  },
  {
    id: "oop1",
    title: "OOP Fundamentals",
    description: "Classes, Objects, Constructors",
    icon: "🏗️",
    teachingSteps: [
      {
        id: "step1",
        text: "Classes and Objects",
        visualType: "text",
        visualState: "text",
        explanation: "Object-Oriented Programming (OOP) is a paradigm that organizes code around 'objects' rather than actions. A **Class** is a blueprint (like an architectural drawing), and an **Object** is an actual instance created from that blueprint.",
        codeSnippets: {
          "Python": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    \n    def bark(self):\n        print(f\"{self.name} says Woof!\")\n\nmy_dog = Dog(\"Buddy\")\nmy_dog.bark()",
          "C++": "class Dog {\npublic:\n    string name;\n    Dog(string n) { name = n; }\n    void bark() {\n        cout << name << \" says Woof!\\n\";\n    }\n};\n\nint main() {\n    Dog myDog(\"Buddy\");\n    myDog.bark();\n}",
          "Java": "public class Dog {\n    String name;\n    public Dog(String n) { this.name = n; }\n    public void bark() {\n        System.out.println(name + \" says Woof!\");\n    }\n    public static void main(String[] args) {\n        Dog myDog = new Dog(\"Buddy\");\n        myDog.bark();\n    }\n}",
          "JavaScript": "class Dog {\n    constructor(name) {\n        this.name = name;\n    }\n    bark() {\n        console.log(`${this.name} says Woof!`);\n    }\n}\n\nlet myDog = new Dog(\"Buddy\");\nmyDog.bark();"
        }
      }
    ]
  },
  {
    id: "oop2",
    title: "Advanced OOP",
    description: "Inheritance, Polymorphism",
    icon: "🧬",
    teachingSteps: [
      {
        id: "step1",
        text: "Inheritance",
        visualType: "text",
        visualState: "text",
        explanation: "**Inheritance** allows a new class (Child) to inherit the properties and methods of an existing class (Parent). This promotes code reuse and establishes a hierarchical relationship (e.g. A `Cat` is an `Animal`).",
        codeSnippets: {
          "Python": "class Animal:\n    def speak(self): pass\n\nclass Cat(Animal):\n    def speak(self):\n        print(\"Meow!\")",
          "C++": "class Animal {\npublic:\n    virtual void speak() {}\n};\n\nclass Cat : public Animal {\npublic:\n    void speak() override {\n        cout << \"Meow!\";\n    }\n};",
          "Java": "class Animal {\n    public void speak() {}\n}\nclass Cat extends Animal {\n    @Override\n    public void speak() {\n        System.out.println(\"Meow!\");\n    }\n}",
          "JavaScript": "class Animal {\n    speak() {}\n}\nclass Cat extends Animal {\n    speak() {\n        console.log(\"Meow!\");\n    }\n}"
        }
      }
    ]
  },
  {
    id: "memory",
    title: "Memory & Pointers",
    description: "Stack vs Heap, References",
    icon: "🧠",
    teachingSteps: [
      {
        id: "step1",
        text: "Pointers and References",
        visualType: "text",
        visualState: "text",
        explanation: "Some languages (like C++) allow direct memory manipulation using **Pointers** (variables that store memory addresses). High-level languages (Java, Python, JS) hide pointers, but pass objects by **Reference** (meaning variables point to the object in memory, not a copy).",
        codeSnippets: {
          "Python": "# Python uses references for objects\nlist_a = [1, 2, 3]\nlist_b = list_a  # Both point to same memory!\nlist_b.append(4)\nprint(list_a)    # [1, 2, 3, 4]",
          "C++": "int val = 42;\nint* ptr = &val;  // Pointer holds memory address of val\ncout << ptr;      // Outputs address (e.g. 0x7ffe..)\ncout << *ptr;     // Dereferences pointer to get 42",
          "Java": "// Java passes objects by reference value\nArrayList<Integer> listA = new ArrayList<>();\nArrayList<Integer> listB = listA; // Same reference\nlistB.add(4);\nSystem.out.println(listA.size()); // 1",
          "JavaScript": "// JS objects/arrays are passed by reference\nlet listA = [1, 2, 3];\nlet listB = listA;\nlistB.push(4);\nconsole.log(listA); // [1, 2, 3, 4]"
        }
      }
    ]
  },
  {
    id: "errors",
    title: "Error Handling",
    description: "Try, Catch, Finally",
    icon: "⚠️",
    teachingSteps: [
      {
        id: "step1",
        text: "Try / Catch Blocks",
        visualType: "text",
        visualState: "text",
        explanation: "When code executes, unexpected errors (exceptions) can occur (e.g., dividing by zero, reading a missing file). A **try-catch** block catches these exceptions so the program doesn't abruptly crash, allowing you to handle the error gracefully.",
        codeSnippets: {
          "Python": "try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(\"Cannot divide by zero!\")\nfinally:\n    print(\"Execution finished.\")",
          "C++": "try {\n    throw runtime_error(\"Custom error\");\n} catch (const exception& e) {\n    cout << \"Caught: \" << e.what();\n}",
          "Java": "try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero!\");\n} finally {\n    System.out.println(\"Execution finished.\");\n}",
          "JavaScript": "try {\n    let result = 10 / 0;\n    if (result === Infinity) throw new Error(\"Division by zero\");\n} catch (error) {\n    console.error(error.message);\n} finally {\n    console.log(\"Execution finished.\");\n}"
        }
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Concepts",
    description: "Threads, Concurrency",
    icon: "🚀",
    teachingSteps: [
      {
        id: "step1",
        text: "Concurrency & Asynchrony",
        visualType: "text",
        visualState: "text",
        explanation: "**Concurrency** allows a program to deal with multiple tasks at once. Depending on the language, this is achieved through Multi-threading (Java/C++), Async/Await (JavaScript/Python), or Goroutines (Go). It's crucial for performance in modern applications (like fetching data from APIs without freezing the UI).",
        codeSnippets: {
          "Python": "import asyncio\n\nasync def fetch_data():\n    await asyncio.sleep(1)\n    return \"Data loaded\"\n\nasync def main():\n    print(await fetch_data())",
          "C++": "#include <thread>\n\nvoid doWork() {\n    cout << \"Working in thread\\n\";\n}\n\nint main() {\n    thread t(doWork);\n    t.join(); // Wait for thread to finish\n}",
          "Java": "Thread t = new Thread(() -> {\n    System.out.println(\"Working in thread\");\n});\nt.start();",
          "JavaScript": "async function fetchData() {\n    let response = await fetch('/api/data');\n    let data = await response.json();\n    console.log(data);\n}"
        }
      }
    ]
  }
];
