#!/usr/bin/env tsx

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
} from 'fs';
import { join, resolve, parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

/**
 * Converts kebab-case filename to PascalCase component name with Icon suffix
 * app-discover -> AppDiscoverIcon
 */
function getComponentName(filename: string): string {
  const baseName = parse(filename).name;
  const pascalCase = baseName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return `${pascalCase}Icon`;
}

/**
 * Converts SVG content to React component code
 */
function svgToReact(svgContent: string, componentName: string): string {
  // Remove comments and XML declaration
  let cleanedSvg = svgContent
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\?xml[^>]*\?>/g, '')
    .trim();

  // Convert class to className
  cleanedSvg = cleanedSvg.replace(/class=/g, 'className=');

  // Extract the inner content of the SVG
  const svgMatch = cleanedSvg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!svgMatch) {
    throw new Error(`Invalid SVG content for ${componentName}`);
  }

  // Extract viewBox from the original SVG
  const viewBoxMatch = cleanedSvg.match(/viewBox="([^"]*)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Clean up the inner content and properly indent it
  const innerContent = svgMatch[1]
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => `        ${line}`)
    .join('\n');

  return `/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { BaseIcon, type IconProps } from '../base-icon';

/**
 * ${componentName} - Custom SVG icon component
 * Generated from SVG file
 */
export const ${componentName} = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <BaseIcon ref={ref} viewBox="${viewBox}" {...props}>
${innerContent}
      </BaseIcon>
    );
  }
);

${componentName}.displayName = '${componentName}';
`;
}

/**
 * Generates the custom icons barrel export
 */
function generateCustomBarrel(
  components: Array<{ filename: string; componentName: string }>
): string {
  const exports = components
    .map(({ filename, componentName }) => {
      const moduleName = parse(filename).name;
      return `export { ${componentName} } from './${moduleName}';`;
    })
    .join('\n');

  return `/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Auto-generated exports for custom icons
${exports}
`;
}

/**
 * Main generation function
 */
function generateIcons() {
  console.log('🎨 Generating custom icons...');

  const iconsSourceDir = join(
    projectRoot,
    'src/components/custom/icons/custom'
  );
  // Generate directly to the final location in src
  const iconsOutputDir = iconsSourceDir;

  // Ensure output directory exists
  mkdirSync(iconsOutputDir, { recursive: true });

  // Check if source directory exists
  if (!existsSync(iconsSourceDir)) {
    console.log('📂 No custom icons directory found, skipping generation');
    return;
  }

  // Read all SVG files
  const svgFiles = readdirSync(iconsSourceDir).filter((file) =>
    file.endsWith('.svg')
  );

  if (svgFiles.length === 0) {
    console.log('📂 No SVG files found in custom icons directory');
    return;
  }

  const components: Array<{ filename: string; componentName: string }> = [];

  // Process each SVG file
  for (const svgFile of svgFiles) {
    const svgPath = join(iconsSourceDir, svgFile);
    const componentName = getComponentName(svgFile);
    const outputName = `${parse(svgFile).name}.tsx`;
    const outputPath = join(iconsOutputDir, outputName);

    try {
      console.log(`🔄 Processing ${svgFile} -> ${componentName}`);

      const svgContent = readFileSync(svgPath, 'utf-8');
      const componentCode = svgToReact(svgContent, componentName);

      writeFileSync(outputPath, componentCode, 'utf-8');

      components.push({ filename: svgFile, componentName });
    } catch (error) {
      console.error(`❌ Error processing ${svgFile}:`, error);
      process.exit(1);
    }
  }

  // Generate barrel export file
  const barrelContent = generateCustomBarrel(components);
  const barrelPath = join(iconsOutputDir, 'index.ts');
  writeFileSync(barrelPath, barrelContent, 'utf-8');

  console.log(`✅ Generated ${components.length} custom icon components`);
  console.log(`📁 Output directory: ${iconsOutputDir}`);

  // List generated components
  components.forEach(({ componentName }) => {
    console.log(`   - ${componentName}`);
  });
}

// Run the generation
if (require.main === module) {
  generateIcons();
}
