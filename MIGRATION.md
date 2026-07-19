# Data Migration: Legacy PII to `user_profiles`

This document outlines the procedure to safely migrate legacy personally identifiable information (PII) from the publicly accessible `user_progress` collection to the private `user_profiles` collection.

## 1. Prerequisites

Before running the migration scripts, you must ensure you have full administrative access to your Firebase project.

1. **Service Account Setup**
   - Navigate to your [Firebase Console](https://console.firebase.google.com).
   - Go to **Project Settings** > **Service Accounts**.
   - Click **Generate new private key**.
   - Download the file and save it exactly as `serviceAccountKey.json` in the root of the project directory.

2. **Environment Variables**
   - The script requires `.env.local` to be present in the root directory (though `firebase-admin` relies primarily on the service account key, any other local env logic is supported).

3. **Backup Recommendation**
   - **Crucial:** Always perform a database backup before running a destructive migration. 
   - Go to Google Cloud Platform > Firestore > Import/Export and trigger an export of your database.

---

## 2. Execution Modes

The migration script (`scripts/migrate-pii.js`) supports three execution modes. Always follow this strict sequence:

### Step 1: Dry Run
Analyze the database without making any changes. This will show you exactly how many documents have legacy data and need migration.
```bash
node scripts/migrate-pii.js --dry-run
```

### Step 2: Migrate
Execute the migration. This process uses batched writes (max 500 ops/batch). It will:
- Safely extract the `roadmap` map from `user_progress`.
- Save it to `user_profiles/{uid}` using a non-destructive `merge`.
- Preserve the `username` field at the root of `user_progress` for leaderboard compatibility.
- Use `FieldValue.delete()` to safely strip the legacy `roadmap` from `user_progress`.

```bash
node scripts/migrate-pii.js --migrate
```
*Note: The script is designed to be idempotent. It is safe to re-run multiple times; it will simply skip already migrated records and continue where it left off.*

### Step 3: Verification
Ensure that zero legacy fields remain in the database.
```bash
node scripts/verify-migration.js
```
*(You can also run `node scripts/migrate-pii.js --verify` directly).*

If the verification script exits with `0` (Success), you can confidently declare Blocker #1 resolved.

---

## 3. Rollback Strategy

Because this migration uses `FieldValue.delete()` to strip data from `user_progress`, an automated script cannot magically "undelete" the data without a backup. 
- If you notice issues immediately after migration (e.g., leaderboards failing), you must **restore your database from the backup** created in the prerequisites.
- If no backup was taken, user PII will be successfully secured in `user_profiles`, but restoring the old architecture will require modifying the client application to read solely from `user_profiles` (which we have already done!). Therefore, a structural rollback is likely unnecessary if the client-side code has already been deployed.

---

## 4. Post-Migration Security

Once the migration is complete and verified:
1. **Delete the key**: Remove the `serviceAccountKey.json` file from your local machine.
2. The file is already ignored by `.gitignore`, but deleting it ensures no local malware can harvest your database credentials.
