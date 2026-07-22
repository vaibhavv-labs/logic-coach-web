const fetch = require('node-fetch');

async function testGodbolt() {
  const compiler = "java2100";
  const code = `class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java Fixed!");
    }
  }`;
  
  try {
    const res = await fetch(`https://godbolt.org/api/compiler/${compiler}/compile`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        source: code,
        lang: "java",
        options: {
            userArguments: "",
            executeParameters: { args: "", stdin: "" },
            compilerOptions: { executorRequest: true }
        },
        allowStoreCodeDebug: true
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(err) {
    console.error(err);
  }
}
testGodbolt();
