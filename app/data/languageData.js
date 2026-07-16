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
