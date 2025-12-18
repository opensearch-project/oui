/**
 * Generates a reusable warning banner for work-in-progress components
 * @param componentDescription - Brief description of what the component does
 * @returns HTML string for the warning banner
 */
export function createWorkInProgressWarning(componentDescription: string): string {
  return `
<div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
    <span style="font-size: 20px;">⚠️</span>
    <strong style="color: #92400e; font-size: 16px;">Work in Progress</strong>
  </div>
  <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
    This component is currently a preliminary implementation. The design and API may change significantly once the corresponding Figma designs are finalized. Please use with caution in production environments.
  </p>
</div>

${componentDescription}
  `.trim();
}

/**
 * Creates a docs parameter object with the work-in-progress warning
 * @param componentDescription - Brief description of what the component does
 * @returns Storybook docs parameter object
 */
export function createDocsWithWarning(componentDescription: string) {
  return {
    docs: {
      description: {
        component: createWorkInProgressWarning(componentDescription),
      },
    },
  };
}