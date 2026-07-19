const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Setup Service Account
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ ERROR: serviceAccountKey.json not found in the root directory.");
  console.error("Please generate one from Firebase Console and place it at the root.");
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function run() {
  const args = process.argv.slice(2);
  const mode = args[0]; // --dry-run, --migrate, or --verify

  if (!["--dry-run", "--migrate", "--verify"].includes(mode)) {
    console.error("❌ Invalid mode. Please specify --dry-run, --migrate, or --verify");
    process.exit(1);
  }

  console.log(`\n🚀 Starting PII Migration Script in Mode: ${mode}`);
  const startTime = Date.now();

  let totalDocs = 0;
  let migrated = 0;
  let skipped = 0;
  let failed = 0;
  let remainingLegacy = 0;

  try {
    const progressSnapshot = await db.collection('user_progress').get();
    totalDocs = progressSnapshot.size;
    console.log(`Found ${totalDocs} documents in user_progress.\n`);

    // In migrate mode, we use batches of up to 500 operations
    let batch = db.batch();
    let batchCount = 0;
    let totalBatches = 0;

    for (const doc of progressSnapshot.docs) {
      const data = doc.data();
      const uid = doc.id;

      const hasLegacyRoadmap = data.roadmap !== undefined && data.roadmap !== null;

      if (mode === "--verify") {
        if (hasLegacyRoadmap) {
          console.log(`⚠️ Legacy record found: user_progress/${uid}`);
          remainingLegacy++;
        } else {
          skipped++;
        }
        continue;
      }

      if (!hasLegacyRoadmap) {
        skipped++;
        continue;
      }

      // We have a legacy record that needs migration
      remainingLegacy++;
      const roadmapData = data.roadmap;
      
      if (mode === "--dry-run") {
        console.log(`[DRY-RUN] Will migrate PII for user: ${uid}`);
        migrated++;
        continue;
      }

      // --migrate Mode
      if (mode === "--migrate") {
        try {
          const profileRef = db.collection('user_profiles').doc(uid);
          const progressRef = db.collection('user_progress').doc(uid);

          // 1. Merge into user_profiles (avoid overwriting existing new data)
          batch.set(profileRef, roadmapData, { merge: true });
          
          // 2. Ensure username is safely preserved on the root of user_progress
          let progressUpdate = {};
          if (!data.username && roadmapData.username) {
             progressUpdate.username = roadmapData.username;
          }
          
          // 3. Remove roadmap from user_progress
          progressUpdate.roadmap = admin.firestore.FieldValue.delete();
          
          batch.update(progressRef, progressUpdate);
          
          migrated++;
          batchCount += 2; // Two operations: set and update

          // Commit batch if it reaches limit (500 max ops per batch)
          if (batchCount >= 400) {
            await batch.commit();
            totalBatches++;
            console.log(`... Committed batch #${totalBatches}`);
            batch = db.batch();
            batchCount = 0;
          }
        } catch (err) {
          console.error(`❌ Failed to prep migration for user ${uid}:`, err);
          failed++;
        }
      }
    }

    // Commit any remaining operations
    if (mode === "--migrate" && batchCount > 0) {
      await batch.commit();
      totalBatches++;
      console.log(`... Committed final batch #${totalBatches}`);
    }

  } catch (error) {
    console.error("❌ Fatal error reading database:", error);
  }

  const executionTime = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`\n======================================`);
  console.log(`📊 MIGRATION REPORT`);
  console.log(`======================================`);
  console.log(`Total Documents Scanned : ${totalDocs}`);
  console.log(`Mode Executed           : ${mode}`);
  console.log(`--------------------------------------`);
  if (mode === "--verify") {
    console.log(`Clean Documents (Skipped): ${skipped}`);
    console.log(`Remaining Legacy Records: ${remainingLegacy}`);
  } else {
    console.log(`Legacy Records Found    : ${remainingLegacy}`);
    console.log(`Migrated / Scheduled    : ${migrated}`);
    console.log(`Skipped (Already Clean) : ${skipped}`);
    console.log(`Failed                  : ${failed}`);
  }
  console.log(`--------------------------------------`);
  console.log(`Total Execution Time    : ${executionTime} seconds`);
  console.log(`======================================\n`);
  
  if (failed > 0) {
    process.exit(1);
  } else if (mode === "--verify" && remainingLegacy > 0) {
    console.log("❌ VERIFICATION FAILED: There are still legacy records in the database.");
    process.exit(1);
  } else if (mode === "--verify" && remainingLegacy === 0) {
    console.log("✅ VERIFICATION SUCCESS: Zero legacy roadmap fields remain in user_progress.");
    process.exit(0);
  }
}

run();
