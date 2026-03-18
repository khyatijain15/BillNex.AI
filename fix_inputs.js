const fs = require('fs');

const path = 'frontend/src/index.css';
let content = fs.readFileSync(path, 'utf8');

const append = `
@layer base {
  input, textarea, select {
    background-color: var(--color-bg-paper) !important;
    border: 1px solid var(--color-border-mid) !important;
    color: var(--color-ink-900) !important;
    border-radius: 6px;
  }
  input:focus, textarea:focus, select:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px var(--color-bg-base), 0 0 0 4px var(--color-accent) !important;
  }
  input::placeholder, textarea::placeholder {
    color: var(--color-ink-200) !important;
  }
  label {
    font-size: 10px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.15em !important;
    color: var(--color-ink-400) !important;
    font-family: var(--font-body) !important;
  }
}
`;

if (!content.includes('input::placeholder')) {
  fs.appendFileSync(path, append);
  console.log("Added generic form resets in index.css");
}
