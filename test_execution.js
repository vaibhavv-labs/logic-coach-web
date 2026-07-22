const fetch = require('node-fetch');

async function testExecute(language, code) {
  try {
    console.log(`Testing ${language}...`);
    const res = await fetch('http://localhost:3000/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code, stdin: '' })
    });
    const data = await res.json();
    console.log(`Result for ${language}:`, data);
    return data;
  } catch (err) {
    console.error(`Error for ${language}:`, err);
  }
}

(async () => {
  await testExecute('python', "print('Hello Python')");
  await testExecute('java', `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
  }`);
  await testExecute('c++', `#include <iostream>
using namespace std;
int main() {
    cout << "Hello C++";
    return 0;
}`);
})();
