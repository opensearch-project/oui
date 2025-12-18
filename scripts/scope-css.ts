#!/usr/bin/env npx tsx

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Creates a scoped CSS file with OUI1 reset unsets and Tailwind reset CSS wrapped in @scope(.oui2)
 * while keeping the rest of the CSS unscoped
 */
function scopeCSS(): void {
  const cssPath = path.join(__dirname, '../dist/style.css');
  const resetPath = path.join(__dirname, '../src/styles/unset-oui1.css');
  const scopedPath = path.join(__dirname, '../dist/style.scoped.css');

  if (!fs.existsSync(cssPath)) {
    console.error('❌ CSS file not found at:', cssPath);
    process.exit(1);
  }

  if (!fs.existsSync(resetPath)) {
    console.error('❌ Unset CSS file not found at:', resetPath);
    process.exit(1);
  }

  const css = fs.readFileSync(cssPath, 'utf8');
  const resetCSS = fs.readFileSync(resetPath, 'utf8');

  // Find the first @layer base section (Tailwind reset CSS)
  const layerBaseRegex = /@layer base \{([\s\S]*?)\n\}/;
  const layerBaseMatch = css.match(layerBaseRegex);

  if (!layerBaseMatch) {
    console.error('❌ Could not find @layer base section in CSS');
    process.exit(1);
  }

  const tailwindResetCSS = layerBaseMatch[0];

  // Extract HTML reset styles from the Tailwind reset
  const htmlResetRegex = /html,\s*:host\s*\{([^}]+)\}/;
  const htmlResetMatch = tailwindResetCSS.match(htmlResetRegex);

  let htmlResetStyles = '';
  if (htmlResetMatch) {
    htmlResetStyles = htmlResetMatch[1].trim();
  }

  // Remove the first @layer base section from the original CSS
  const cssWithoutFirstLayerBase = css.replace(layerBaseRegex, '');

  // Create scoped CSS
  const scopedCSS = `/* OUI2 Library - Scoped CSS */
/* Uses CSS @scope to limit reset styles from .oui2 to .oui2-end */

@scope (.oui2) to (.oui2-end) {
  /* Include OUI1 reset unsets to prevent conflicts */
${resetCSS.replace(/^/gm, '  ')}

  /* Tailwind Reset CSS */
  ${tailwindResetCSS.replace(/^/gm, '  ')}
  
  /* Apply HTML reset styles to .oui2 root container */
  @layer base {
    :scope {
      ${htmlResetStyles ? htmlResetStyles.replace(/^/gm, '    ') : '    /* No HTML reset styles found */'}
      font-size: 16px; /* to override OUI */
    }
  }
}
      
/* Unscoped OUI2 Component Styles */
${cssWithoutFirstLayerBase}`;

  fs.writeFileSync(scopedPath, scopedCSS);
  console.log('✅ Scoped CSS created at:', scopedPath);
  console.log(
    '🔧 Usage: Wrap your OUI2 components in <div className="oui2">...</div>'
  );
  console.log(
    '🔚 Optional: Use <div className="oui2-end"></div> to limit scope'
  );
  console.log(
    '📖 CSS @scope limits reset styles from .oui2 to .oui2-end boundaries'
  );
}

if (require.main === module) {
  scopeCSS();
}

export { scopeCSS };
