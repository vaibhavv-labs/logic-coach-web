async function verify() {
  console.log("--- Starting RC-1 API Verification ---");

  // 1. Test GET /api/health
  try {
    const res = await fetch("http://localhost:3001/api/health");
    if (res.status === 200) {
      console.log("✅ GET /api/health returned 200 OK");
    } else {
      console.log(`❌ GET /api/health failed with status: ${res.status}`);
    }
  } catch (e) {
    console.log("❌ Failed to reach /api/health", e.message);
  }

  // 2. Test POST /api/chat as Guest
  try {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] })
    });
    
    // We expect 403 Forbidden or 401 Unauthorized because there is no Firebase token provided
    if (res.status === 401 || res.status === 403) {
      console.log(`✅ POST /api/chat correctly rejected unauthorized Guest with status: ${res.status}`);
    } else {
      console.log(`❌ POST /api/chat failed to reject Guest. Returned status: ${res.status}`);
    }
  } catch (e) {
    console.log("❌ Failed to reach /api/chat", e.message);
  }
}

verify();
