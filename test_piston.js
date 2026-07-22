const fetch = require('node-fetch');

async function getRuntimes() {
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/runtimes');
    const runtimes = await res.json();
    const python = runtimes.find(r => r.language === 'python');
    const java = runtimes.find(r => r.language === 'java');
    const cpp = runtimes.find(r => r.language === 'c++');
    const js = runtimes.find(r => r.language === 'javascript');
    console.log('Python:', python);
    console.log('Java:', java);
    console.log('C++:', cpp);
    console.log('JavaScript:', js);
  } catch(err) {
    console.error(err);
  }
}
getRuntimes();
