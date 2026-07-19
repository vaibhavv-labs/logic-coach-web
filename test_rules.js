const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const fs = require('fs');

async function runTests() {
  const projectId = `logic-coach-test-${Date.now()}`;
  const testEnv = await initializeTestEnvironment({
    projectId: projectId,
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    },
  });

  console.log("Environment initialized. Running tests...");

  // Setup contexts
  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.com' });
  const bob = testEnv.authenticatedContext('bob', { email: 'bob@example.com' });
  const unauth = testEnv.unauthenticatedContext();

  let passed = 0;
  let failed = 0;

  async function test(name, promise, shouldSucceed) {
    try {
      if (shouldSucceed) {
        await assertSucceeds(promise);
      } else {
        await assertFails(promise);
      }
      console.log(`✅ Passed: ${name}`);
      passed++;
    } catch (e) {
      console.error(`❌ Failed: ${name}\n   Error: ${e.message}`);
      failed++;
    }
  }

  // (a) A logged-in user CANNOT write to another user's progress document
  await test(
    "(a) Alice cannot write to Bob's progress document",
    alice.firestore().collection('user_progress').doc('bob').set({ streak: 10 }),
    false
  );

  // (b) A logged-in user CAN write to their own document
  await test(
    "(b) Alice can write to her own progress document",
    alice.firestore().collection('user_progress').doc('alice').set({ streak: 10 }),
    true
  );

  // (c) An unauthenticated user CAN read user_progress and problems, but CANNOT write anywhere
  await test(
    "(c) Unauth user can read user_progress",
    unauth.firestore().collection('user_progress').doc('alice').get(),
    true
  );
  await test(
    "(c) Unauth user can read problems",
    unauth.firestore().collection('problems').doc('prob1').get(),
    true
  );
  await test(
    "(c) Unauth user cannot write to user_progress",
    unauth.firestore().collection('user_progress').doc('anon').set({ test: 1 }),
    false
  );
  await test(
    "(c) Unauth user cannot write to problems",
    unauth.firestore().collection('problems').doc('prob2').set({ test: 1 }),
    false
  );

  // (d) A custom_problems submission over 3000 characters is correctly rejected
  const longString = 'a'.repeat(3001);
  await test(
    "(d) Alice cannot submit custom problem > 3000 chars",
    alice.firestore().collection('custom_problems').add({
      uid: 'alice',
      description: longString
    }),
    false
  );

  const goodString = 'a'.repeat(2999);
  await test(
    "(d) Alice CAN submit custom problem < 3000 chars",
    alice.firestore().collection('custom_problems').add({
      uid: 'alice',
      description: goodString
    }),
    true
  );

  // (e) A custom_problems submission missing the correct uid field is correctly rejected
  await test(
    "(e) Alice cannot submit custom problem with wrong UID",
    alice.firestore().collection('custom_problems').add({
      uid: 'bob',
      description: 'valid description'
    }),
    false
  );
  
  await test(
    "(e) Alice cannot submit custom problem missing UID completely",
    alice.firestore().collection('custom_problems').add({
      description: 'valid description'
    }),
    false
  );

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);

  await testEnv.cleanup();
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error("Test execution failed:", e);
  process.exit(1);
});
