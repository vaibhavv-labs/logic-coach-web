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
      },
      {
        id: "step2",
        text: "Encapsulation & Access Modifiers",
        visualType: "text",
        visualState: "text",
        explanation: "**Encapsulation** is the practice of hiding the internal state of an object and requiring all interaction to be performed through an object's methods. We use access modifiers (`public`, `private`, `protected`) to control visibility.",
        codeSnippets: {
          "Python": "class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance # Private variable\n    \n    def get_balance(self):\n        return self.__balance",
          "C++": "class BankAccount {\nprivate:\n    double balance;\npublic:\n    BankAccount(double b) : balance(b) {}\n    double getBalance() { return balance; }\n};",
          "Java": "public class BankAccount {\n    private double balance;\n    public BankAccount(double balance) {\n        this.balance = balance;\n    }\n    public double getBalance() { return balance; }\n}",
          "JavaScript": "class BankAccount {\n    #balance; // Private field\n    constructor(balance) {\n        this.#balance = balance;\n    }\n    getBalance() { return this.#balance; }\n}"
        }
      },
      {
        id: "step3",
        text: "Method Overloading",
        visualType: "text",
        visualState: "text",
        explanation: "**Method Overloading** allows a class to have multiple methods with the exact same name, as long as their parameters (type or number) are different. *Note: Python and JS do not support strict native overloading.*",
        codeSnippets: {
          "Python": "# Python doesn't support true overloading.\n# We use default arguments instead.\ndef add(a, b, c=0):\n    return a + b + c",
          "C++": "class Math {\npublic:\n    int add(int a, int b) { return a + b; }\n    int add(int a, int b, int c) { return a + b + c; }\n};",
          "Java": "public class Math {\n    public int add(int a, int b) { return a + b; }\n    public int add(int a, int b, int c) { return a + b + c; }\n}",
          "JavaScript": "// JS doesn't support overloading.\n// We use the arguments object or rest parameters.\nfunction add(...args) {\n    return args.reduce((sum, val) => sum + val, 0);\n}"
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
      },
      {
        id: "step2",
        text: "Polymorphism",
        visualType: "text",
        visualState: "text",
        explanation: "**Polymorphism** means \"many forms\". It allows objects of different classes to be treated as objects of a common parent class. A function taking an `Animal` can accept a `Dog` or a `Cat`, and call their specific `speak()` method.",
        codeSnippets: {
          "Python": "def make_sound(animal):\n    animal.speak()\n\nmake_sound(Cat()) # Calls Cat's speak()",
          "C++": "void makeSound(Animal* animal) {\n    animal->speak();\n}\n// makeSound(new Cat());",
          "Java": "public static void makeSound(Animal animal) {\n    animal.speak();\n}\n// makeSound(new Cat());",
          "JavaScript": "function makeSound(animal) {\n    animal.speak();\n}\nmakeSound(new Cat());"
        }
      },
      {
        id: "step3",
        text: "Abstraction & Interfaces",
        visualType: "text",
        visualState: "text",
        explanation: "**Abstraction** hides complex implementation details and only exposes the necessary features. An **Interface** (or Abstract Class) defines a strict contract: \"Any class that implements this must have these specific methods.\"",
        codeSnippets: {
          "Python": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass",
          "C++": "class Shape {\npublic:\n    // Pure virtual function = Interface\n    virtual double area() = 0;\n};",
          "Java": "interface Shape {\n    double area();\n}\n\nclass Circle implements Shape {\n    public double area() { return 3.14; }\n}",
          "JavaScript": "// JS has no native Interfaces.\n// We emulate them by throwing errors in base classes.\nclass Shape {\n    area() { throw new Error(\"Must implement area()\"); }\n}"
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
      },
      {
        id: "step2",
        text: "Stack vs Heap",
        visualType: "text",
        visualState: "text",
        explanation: "Memory is divided into **Stack** (fast, auto-managed, stores primitive types and function calls) and **Heap** (slower, dynamic, stores large objects/classes). When you create a large Object, the object lives on the Heap, while a reference to it lives on the Stack.",
        codeSnippets: {
          "Python": "# Python manages this automatically.\nx = 10 # Usually on the stack\nmy_list = [1, 2, 3] # Lives on the heap, reference on stack",
          "C++": "int stackVar = 10; // Stack\nint* heapVar = new int(20); // Allocated on Heap\n// Must manually delete!\ndelete heapVar;",
          "Java": "int stackVar = 10; // Primitive on Stack\nMyObject obj = new MyObject(); // Object on Heap, reference on Stack",
          "JavaScript": "let stackVar = 10; // Stack\nlet obj = { name: \"Heap\" }; // Object on Heap"
        }
      },
      {
        id: "step3",
        text: "Garbage Collection",
        visualType: "text",
        visualState: "text",
        explanation: "**Garbage Collection** (GC) is an automatic memory management feature. The GC periodically looks for objects on the Heap that are no longer referenced by any part of your code and deletes them to free up memory. C++ does *not* have this, requiring manual deletion.",
        codeSnippets: {
          "Python": "import gc\n# Python uses reference counting and a cycle-detecting GC\nx = [1, 2, 3]\nx = None # The list [1,2,3] is now eligible for Garbage Collection",
          "C++": "// C++ has NO Garbage Collector!\nint* ptr = new int(5);\n// If you forget this, you get a memory leak!\ndelete ptr; ",
          "Java": "// Java automatically garbage collects objects with no references\nMyObject obj = new MyObject();\nobj = null; // Object is now eligible for GC\nSystem.gc(); // You can suggest GC, but can't force it",
          "JavaScript": "// JS automatically garbage collects\nlet obj = { data: \"temp\" };\nobj = null; // Object memory will be freed automatically"
        }
      }
    ]
  },
  {
    id: "files",
    title: "File Handling",
    description: "Read, Write, JSON/CSV",
    icon: "📄",
    teachingSteps: [
      {
        id: "step1",
        text: "Reading and Writing Files",
        visualType: "text",
        visualState: "text",
        explanation: "Programs often need to save data persistently. **File Handling** involves opening a file, reading its contents or writing new data, and safely closing it so other programs can access it.",
        codeSnippets: {
          "Python": "# Write to file\nwith open('data.txt', 'w') as f:\n    f.write('Hello World')\n\n# Read from file\nwith open('data.txt', 'r') as f:\n    print(f.read())",
          "C++": "#include <fstream>\nusing namespace std;\n\n// Write\nofstream out(\"data.txt\");\nout << \"Hello World\";\nout.close();\n\n// Read\nifstream in(\"data.txt\");\nstring line;\ngetline(in, line);",
          "Java": "import java.nio.file.*;\n\n// Write\nFiles.writeString(Paths.get(\"data.txt\"), \"Hello World\");\n\n// Read\nString content = Files.readString(Paths.get(\"data.txt\"));\nSystem.out.println(content);",
          "JavaScript": "const fs = require('fs');\n\n// Write\nfs.writeFileSync('data.txt', 'Hello World');\n\n// Read\nconst content = fs.readFileSync('data.txt', 'utf8');\nconsole.log(content);"
        }
      },
      {
        id: "step2",
        text: "Handling JSON",
        visualType: "text",
        visualState: "text",
        explanation: "**JSON** (JavaScript Object Notation) is the standard format for exchanging data across the internet. Almost all modern languages have built-in or standard libraries to parse a JSON string into a usable Object or Map.",
        codeSnippets: {
          "Python": "import json\n\ndata = '{\"name\": \"Alice\", \"age\": 25}'\nparsed = json.loads(data)\nprint(parsed['name']) # Alice",
          "C++": "// C++ requires an external library like nlohmann/json for JSON.\n#include <nlohmann/json.hpp>\nusing json = nlohmann::json;\n\nauto j = json::parse(\"{\\\"name\\\": \\\"Alice\\\"}\");\ncout << j[\"name\"];",
          "Java": "// Java typically uses libraries like Jackson or Gson\n// With Jackson:\nObjectMapper mapper = new ObjectMapper();\nJsonNode root = mapper.readTree(\"{\\\"name\\\": \\\"Alice\\\"}\");\nSystem.out.println(root.get(\"name\").asText());",
          "JavaScript": "let data = '{\"name\": \"Alice\", \"age\": 25}';\nlet parsed = JSON.parse(data);\nconsole.log(parsed.name); // Alice"
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
    id: "modules",
    title: "Modules & Packages",
    description: "Imports, Namespaces, Packages",
    icon: "📦",
    teachingSteps: [
      {
        id: "step1",
        text: "Imports & Exports",
        visualType: "text",
        visualState: "text",
        explanation: "As programs grow, you split them into multiple files called **Modules**. You then `export` functionality from one file and `import` it into another.",
        codeSnippets: {
          "Python": "# In math_utils.py:\n# def add(a, b): return a + b\n\n# In main.py:\nfrom math_utils import add\nprint(add(5, 3))",
          "C++": "// C++ uses header files (.h) and source files (.cpp).\n// In math_utils.h:\n// int add(int a, int b);\n\n#include \"math_utils.h\"\n// Call add(5, 3);",
          "Java": "// Java uses packages.\npackage com.myapp.math;\npublic class MathUtils { ... }\n\n// In another file:\nimport com.myapp.math.MathUtils;",
          "JavaScript": "// In math.js:\nexport const add = (a, b) => a + b;\n\n// In main.js:\nimport { add } from './math.js';\nconsole.log(add(5, 3));"
        }
      },
      {
        id: "step2",
        text: "Package Managers",
        visualType: "text",
        visualState: "text",
        explanation: "A **Package Manager** allows you to download and use code written by other developers. It handles versions and dependencies automatically.",
        codeSnippets: {
          "Python": "# Python uses PIP\n# Terminal: pip install requests\n\nimport requests\nresponse = requests.get('https://api.github.com')",
          "C++": "// C++ package management is fragmented.\n// Tools like vcpkg or Conan are popular.\n// Terminal: vcpkg install nlohmann-json",
          "Java": "// Java uses Maven or Gradle\n// Maven pom.xml:\n// <dependency>\n//   <groupId>com.google.code.gson</groupId>\n//   <artifactId>gson</artifactId>\n// </dependency>",
          "JavaScript": "// JS uses NPM or Yarn\n// Terminal: npm install axios\n\nconst axios = require('axios');"
        }
      }
    ]
  },
  {
    id: "iterators",
    title: "Iterators & Generators",
    description: "Lazy Evaluation, Yield",
    icon: "🔄",
    teachingSteps: [
      {
        id: "step1",
        text: "Iterables & Iterators",
        visualType: "text",
        visualState: "text",
        explanation: "An **Iterable** is a collection you can loop over (like an Array). An **Iterator** is the object doing the iterating (it remembers the current position).",
        codeSnippets: {
          "Python": "my_list = [1, 2, 3]\nmy_iter = iter(my_list)\nprint(next(my_iter)) # 1\nprint(next(my_iter)) # 2",
          "C++": "#include <vector>\nusing namespace std;\n\nvector<int> vec = {1, 2, 3};\nauto it = vec.begin();\ncout << *it; // 1\nit++;\ncout << *it; // 2",
          "Java": "ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));\nIterator<Integer> it = list.iterator();\nSystem.out.println(it.next()); // 1",
          "JavaScript": "let arr = [1, 2, 3];\nlet it = arr[Symbol.iterator]();\nconsole.log(it.next().value); // 1"
        }
      },
      {
        id: "step2",
        text: "Generators (Yield)",
        visualType: "text",
        visualState: "text",
        explanation: "A **Generator** is a special function that can pause its execution and `yield` a value. When called again, it resumes from where it left off. This is great for **lazy evaluation** (saving memory when generating massive sequences).",
        codeSnippets: {
          "Python": "def count_up_to(max):\n    count = 1\n    while count <= max:\n        yield count\n        count += 1\n\nfor num in count_up_to(3): print(num)",
          "C++": "// C++20 introduced Coroutines for Generators\n// It's quite complex, requiring <coroutine> and custom return types.\n// (Advanced topic)",
          "Java": "// Java doesn't have native yield-based generators.\n// We use Streams to achieve lazy evaluation:\nStream.iterate(1, n -> n + 1).limit(3).forEach(System.out::println);",
          "JavaScript": "function* countUpTo(max) {\n    let count = 1;\n    while (count <= max) yield count++;\n}\nfor (let num of countUpTo(3)) console.log(num);"
        }
      }
    ]
  },
  {
    id: "functional",
    title: "Functional Programming",
    description: "Map, Filter, Reduce",
    icon: "λ",
    teachingSteps: [
      {
        id: "step1",
        text: "Map, Filter, Reduce",
        visualType: "text",
        visualState: "text",
        explanation: "Functional Programming focuses on applying functions to data rather than using loops. **Map** transforms every item, **Filter** removes items, and **Reduce** aggregates items down to a single value.",
        codeSnippets: {
          "Python": "nums = [1, 2, 3, 4]\nsquared = list(map(lambda x: x*x, nums))\nevens = list(filter(lambda x: x%2==0, nums))\n# Reduce requires: from functools import reduce",
          "C++": "#include <algorithm>\n// C++ uses std::transform (Map), std::copy_if (Filter),\n// and std::accumulate (Reduce).",
          "Java": "List<Integer> nums = List.of(1, 2, 3, 4);\nList<Integer> evens = nums.stream()\n    .filter(x -> x % 2 == 0)\n    .collect(Collectors.toList());",
          "JavaScript": "let nums = [1, 2, 3, 4];\nlet squared = nums.map(x => x * x);\nlet evens = nums.filter(x => x % 2 === 0);\nlet sum = nums.reduce((acc, val) => acc + val, 0);"
        }
      },
      {
        id: "step2",
        text: "Pure Functions & Immutability",
        visualType: "text",
        visualState: "text",
        explanation: "A **Pure Function** always produces the same output for the same input and causes NO side-effects (like modifying a global variable). This makes code highly predictable. **Immutability** means data cannot be changed after it is created.",
        codeSnippets: {
          "Python": "# Pure Function\ndef pure_add(a, b):\n    return a + b\n\n# Impure (modifies external state)\ntotal = 0\ndef impure_add(a):\n    global total\n    total += a",
          "C++": "// Use 'const' to enforce immutability\nconst int max_users = 100;\n// max_users = 200; // ERROR",
          "Java": "// Use 'final' to enforce immutability\nfinal int MAX_USERS = 100;\n// MAX_USERS = 200; // ERROR",
          "JavaScript": "// Use 'const' and 'Object.freeze()'\nconst user = Object.freeze({ name: \"Alice\" });\n// user.name = \"Bob\"; // Fails silently or throws in strict mode"
        }
      }
    ]
  },
  {
    id: "stdlib",
    title: "Standard Library Essentials",
    description: "Math, Dates, Regex",
    icon: "🧰",
    teachingSteps: [
      {
        id: "step1",
        text: "Math & Date/Time",
        visualType: "text",
        visualState: "text",
        explanation: "Most languages come with a **Standard Library** that handles common tasks so you don't have to write them from scratch, like complex Math operations (pow, sqrt, max) and Date/Time handling.",
        codeSnippets: {
          "Python": "import math\nfrom datetime import datetime\n\nprint(math.sqrt(16)) # 4.0\nprint(datetime.now())",
          "C++": "#include <cmath>\n#include <chrono>\nusing namespace std;\n\n// cout << sqrt(16); // 4\nauto now = chrono::system_clock::now();",
          "Java": "import java.time.LocalDate;\n\nSystem.out.println(Math.sqrt(16)); // 4.0\nSystem.out.println(LocalDate.now());",
          "JavaScript": "console.log(Math.sqrt(16)); // 4\nconsole.log(new Date());"
        }
      },
      {
        id: "step2",
        text: "Regular Expressions (Regex)",
        visualType: "text",
        visualState: "text",
        explanation: "**Regular Expressions** (Regex) are powerful search patterns used for string matching and manipulation. For example, validating an email address or extracting numbers from a sentence.",
        codeSnippets: {
          "Python": "import re\n\ntext = \"Contact: user@email.com\"\nmatch = re.search(r\"\\w+@\\w+\\.\\w+\", text)\nif match: print(\"Found email!\")",
          "C++": "#include <regex>\nusing namespace std;\n\nstring text = \"Contact: user@email.com\";\nregex email_pattern(R\"(\\w+@\\w+\\.\\w+)\");\nif (regex_search(text, email_pattern)) cout << \"Found!\";",
          "Java": "import java.util.regex.*;\n\nString text = \"Contact: user@email.com\";\nPattern p = Pattern.compile(\"\\\\w+@\\\\w+\\\\.\\\\w+\");\nMatcher m = p.matcher(text);\nif (m.find()) System.out.println(\"Found!\");",
          "JavaScript": "let text = \"Contact: user@email.com\";\nlet regex = /\\w+@\\w+\\.\\w+/;\nif (regex.test(text)) console.log(\"Found email!\");"
        }
      }
    ]
  },
  {
    id: "testing",
    title: "Testing & Debugging",
    description: "Unit Testing, Assertions",
    icon: "🐛",
    teachingSteps: [
      {
        id: "step1",
        text: "Unit Testing & Assertions",
        visualType: "text",
        visualState: "text",
        explanation: "Writing **Unit Tests** ensures that individual functions work correctly. **Assertions** check if a condition is true; if it's false, the program throws an error. Good code is always tested code!",
        codeSnippets: {
          "Python": "def add(a, b): return a + b\n\n# Basic Assertion\nassert add(2, 2) == 4, \"Math is broken!\"\nprint(\"Tests passed.\")",
          "C++": "#include <cassert>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\n\nint main() {\n    assert(add(2, 2) == 4);\n    return 0;\n}",
          "Java": "// Java uses JUnit usually.\n// Native assert (requires -ea flag):\nint add(int a, int b) { return a + b; }\nassert add(2, 2) == 4 : \"Math is broken!\";",
          "JavaScript": "const assert = require('assert');\n\nfunction add(a, b) { return a + b; }\nassert.strictEqual(add(2, 2), 4, \"Math is broken!\");"
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
      },
      {
        id: "step2",
        text: "Decorators & Annotations",
        visualType: "text",
        visualState: "text",
        explanation: "**Decorators** (Python/JS) and **Annotations** (Java) allow you to dynamically alter or attach metadata to functions and classes without modifying their actual code. They are heavily used in modern frameworks.",
        codeSnippets: {
          "Python": "def my_decorator(func):\n    def wrapper():\n        print(\"Before call\")\n        func()\n    return wrapper\n\n@my_decorator\ndef say_hello(): print(\"Hello\")",
          "C++": "// C++ doesn't have native decorators.\n// C++11 introduced Attributes like [[nodiscard]]\n[[nodiscard]] int getCode() { return 42; }",
          "Java": "// Annotations in Java\n@Override\npublic void toString() { }\n// Custom annotations require defining an @interface",
          "JavaScript": "// JS Decorators (often used in TypeScript or Babel)\n// @logger\n// class MyClass {}"
        }
      },
      {
        id: "step3",
        text: "Generics & Templates",
        visualType: "text",
        visualState: "text",
        explanation: "**Generics** (Java/C#) or **Templates** (C++) allow you to write a function or class that can operate on *any* data type, ensuring type safety without code duplication. (Python and JS are dynamically typed, so they don't strictly need them).",
        codeSnippets: {
          "Python": "from typing import TypeVar, List\nT = TypeVar('T')\n\ndef get_first(items: List[T]) -> T:\n    return items[0]",
          "C++": "template <typename T>\nT add(T a, T b) {\n    return a + b;\n}\n// cout << add<int>(5, 3);",
          "Java": "public class Box<T> {\n    private T item;\n    public void set(T t) { item = t; }\n    public T get() { return item; }\n}",
          "JavaScript": "// JS doesn't have Generics natively.\n// TypeScript is used for this:\n// function getFirst<T>(items: T[]): T { return items[0]; }"
        }
      },
      {
        id: "step4",
        text: "Design Patterns",
        visualType: "text",
        visualState: "text",
        explanation: "**Design Patterns** are proven solutions to common architectural problems. Examples include **Singleton** (only one instance exists), **Factory** (creates objects), and **Observer** (pub/sub events).",
        codeSnippets: {
          "Python": "# Singleton Pattern\nclass Database:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance",
          "C++": "// Singleton Pattern\nclass Database {\npublic:\n    static Database& getInstance() {\n        static Database instance;\n        return instance;\n    }\nprivate:\n    Database() {}\n};",
          "Java": "// Singleton Pattern\npublic class Database {\n    private static Database instance;\n    private Database() {}\n    public static Database getInstance() {\n        if (instance == null) instance = new Database();\n        return instance;\n    }\n}",
          "JavaScript": "// Singleton Pattern\nclass Database {\n    constructor() {\n        if (!Database.instance) Database.instance = this;\n        return Database.instance;\n    }\n}"
        }
      }
    ]
  }
];
