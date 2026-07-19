const fs = require('fs');
const file = 'app/globals.css';
let content = fs.readFileSync(file, 'utf8');

// 1. Add --error to light mode
content = content.replace(
  '  --success-hover: #059669;\r\n  \r\n  --border-light:',
  '  --success-hover: #059669;\r\n  \r\n  --error: #ef4444;\r\n  --error-light: rgba(239, 68, 68, 0.1);\r\n  \r\n  --border-light:'
);

// 2. Add --error to dark mode
content = content.replace(
  '  --success-hover: #6ee7b7;\r\n  \r\n  --border-light:',
  '  --success-hover: #6ee7b7;\r\n  \r\n  --error: #f87171;\r\n  --error-light: rgba(248, 113, 113, 0.15);\r\n  \r\n  --border-light:'
);

// 3. Fix min-height: 100vh -> 100dvh in landing-layout
content = content.replace(
  '  min-height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: var(--bg-base);',
  '  min-height: 100vh;\r\n  min-height: 100dvh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: var(--bg-base);'
);

// 4. Fix height in app-layout
content = content.replace(
  '  display: flex;\r\n  height: calc(100vh - 61px);\r\n  overflow: hidden;',
  '  display: flex;\r\n  height: calc(100vh - 61px);\r\n  height: calc(100dvh - 61px);\r\n  overflow: hidden;'
);

// 5. Fix min-height in practice-layout
content = content.replace(
  '.practice-layout {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: 100vh;\r\n  background: var(--bg-base);\r\n}',
  '.practice-layout {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: 100vh;\r\n  min-height: 100dvh;\r\n  background: var(--bg-base);\r\n}'
);

// 6. Fix height in onboarding-container
content = content.replace(
  '.onboarding-container {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--bg-base);',
  '.onboarding-container {\r\n  display: flex;\r\n  height: 100vh;\r\n  height: 100dvh;\r\n  background: var(--bg-base);'
);

// 7. Fix height in not-found-layout
content = content.replace(
  '.not-found-layout {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100vh;\r\n  background: var(--bg-base);\r\n}',
  '.not-found-layout {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100vh;\r\n  height: 100dvh;\r\n  background: var(--bg-base);\r\n}'
);

// 8. Add safe area inset to mobile chat-bottom
content = content.replace(
  '  .chat-header { flex-wrap: wrap; gap: 12px; }\r\n  .chat-bottom { padding: 12px; }\r\n  .pro-timeline-item { width: 100%; }',
  '  .chat-header { flex-wrap: wrap; gap: 12px; }\r\n  .chat-bottom { padding: 12px; padding-bottom: max(12px, env(safe-area-inset-bottom)); }\r\n  .pro-timeline-item { width: 100%; }'
);

// 9. Add safe area inset to desktop chat-bottom (for completeness on ultrawide ipads)
content = content.replace(
  '  background: var(--bg-surface);\r\n  border-top: 1px solid var(--border-light);\r\n  padding: 16px 24px 24px;\r\n  display: flex;',
  '  background: var(--bg-surface);\r\n  border-top: 1px solid var(--border-light);\r\n  padding: 16px 24px max(24px, env(safe-area-inset-bottom));\r\n  display: flex;'
);

fs.writeFileSync(file, content);
console.log("Done fixing globals.css");
