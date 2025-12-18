#!/usr/bin/env tsx

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

/**
 * Script to fix shadcn UI components by:
 * 1. Prefixing CSS variables with --oui-
 * 2. Updating imports from @/components/ui/Component to @/components for extended components
 */

// Components that have custom versions in src/components/custom/
const COMPONENTS_WITH_CUSTOM_VERSIONS = [
  'avatar',
  'breadcrumb',
  'button',
  'button-group',
  'checkbox',
  'context-menu',
  'pagination',
  'progress',
  'radio-group',
  'select',
  'switch',
  'tabs',
  // Note: 'combobox' is only in custom, no UI equivalent
];

// CSS variables that should be prefixed (common shadcn variables)
const CSS_VARIABLES_TO_PREFIX = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
  'radius',
  'sidebar',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
];

function prefixCSSVariables(content: string): string {
  let updated = content;

  // Fix CSS variables in style objects: "--variable": value
  CSS_VARIABLES_TO_PREFIX.forEach((variable) => {
    // Match "--variable" in style objects (quoted)
    const quotedRegex = new RegExp(`"--${variable}"`, 'g');
    updated = updated.replace(quotedRegex, `"--oui-${variable}"`);

    // Match --variable in CSS/style strings (unquoted)
    const unquotedRegex = new RegExp(`--${variable}(?!-)`, 'g');
    updated = updated.replace(unquotedRegex, `--oui-${variable}`);
  });

  return updated;
}

function updateImports(content: string): string {
  let updated = content;

  // Find all imports from @/components/ui/ComponentName
  const importRegex =
    /import\s+{([^}]+)}\s+from\s+["']@\/components\/ui\/([^"']+)["']/g;

  let match;
  const importsToUpdate: Array<{
    fullMatch: string;
    importList: string;
    componentName: string;
  }> = [];

  while ((match = importRegex.exec(content)) !== null) {
    const [fullMatch, importList, componentPath] = match;
    const componentName = componentPath.replace(/\.tsx?$/, '');

    // Check if this component has a custom version
    if (COMPONENTS_WITH_CUSTOM_VERSIONS.includes(componentName)) {
      importsToUpdate.push({
        fullMatch,
        importList: importList.trim(),
        componentName,
      });
    }
  }

  // Update the imports
  importsToUpdate.forEach(({ fullMatch, importList }) => {
    const newImport = `import { ${importList} } from "@/components"`;
    updated = updated.replace(fullMatch, newImport);
  });

  return updated;
}

function processFile(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf-8');
    let updated = content;

    // Apply CSS variable prefixing
    updated = prefixCSSVariables(updated);

    // Apply import updates
    updated = updateImports(updated);

    // Only write if content changed
    if (updated !== content) {
      writeFileSync(filePath, updated, 'utf-8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
    return false;
  }
}

async function main() {
  console.log('🔧 Fixing shadcn UI components...');
  console.log();

  // Find all TypeScript/TSX files in the ui directory
  const uiFiles = await glob('src/components/ui/**/*.{ts,tsx}', {
    ignore: ['**/*.d.ts'],
  });

  let processedCount = 0;
  let updatedCount = 0;

  for (const filePath of uiFiles) {
    processedCount++;
    const wasUpdated = processFile(filePath);
    if (wasUpdated) {
      updatedCount++;
    }
  }

  console.log();
  console.log('📊 Summary:');
  console.log(`   • Processed: ${processedCount} files`);
  console.log(`   • Updated: ${updatedCount} files`);

  if (updatedCount > 0) {
    console.log();
    console.log('🎉 Shadcn component fixes applied successfully!');
    console.log();
    console.log('📋 Changes made:');
    console.log('   • Prefixed CSS variables with --oui-');
    console.log(
      '   • Updated imports for extended components to use @/components'
    );
    console.log();
    console.log('⚠️  Please review the changes and test your components!');
  } else {
    console.log();
    console.log(
      '✨ No changes needed - all shadcn components are already properly configured!'
    );
  }
}

// Self-executing function
if (require.main === module) {
  main().catch(console.error);
}

export { prefixCSSVariables, updateImports };
