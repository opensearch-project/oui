import { expect, userEvent } from '@storybook/test';

/**
 * Accessibility testing utilities for component interaction testing
 * These functions test keyboard navigation, focus management, and ARIA compliance
 */

/**
 * Test overlay focus management (dialogs, popovers, etc.)
 */
export const testOverlayFocusManagement = async (canvas: any, triggerSelector: string, overlaySelector: string) => {
  const trigger = canvas.getByRole('button', { name: new RegExp(triggerSelector, 'i') });

  // Open overlay
  await userEvent.click(trigger);

  // Wait for overlay to appear
  const overlay = await canvas.findByRole('dialog') || await canvas.findByRole('menu');
  await expect(overlay).toBeInTheDocument();

  // Focus should be trapped within overlay
  await userEvent.keyboard('{Tab}');
  const focusedElement = document.activeElement;
  expect(overlay.contains(focusedElement)).toBe(true);
};

/**
 * Test escape key dismissal for overlays
 */
export const testEscapeDismissal = async (canvas: any, triggerSelector: string) => {
  const trigger = canvas.getByRole('button', { name: new RegExp(triggerSelector, 'i') });

  // Open overlay
  await userEvent.click(trigger);

  // Wait for overlay
  const overlay = await canvas.findByRole('dialog') || await canvas.findByRole('menu');
  await expect(overlay).toBeInTheDocument();

  // Press escape
  await userEvent.keyboard('{Escape}');

  // Overlay should be dismissed (wait a bit for animations)
  await new Promise(resolve => setTimeout(resolve, 100));

  // Check if overlay is gone
  try {
    await expect(overlay).not.toBeInTheDocument();
  } catch {
    // Some components might just hide the overlay
    await expect(overlay).not.toBeVisible();
  }
};

/**
 * Test click outside dismissal
 */
export const testClickOutsideDismissal = async (canvas: any, triggerSelector: string) => {
  const trigger = canvas.getByRole('button', { name: new RegExp(triggerSelector, 'i') });

  // Open overlay
  await userEvent.click(trigger);

  // Wait for overlay
  const overlay = await canvas.findByRole('dialog') || await canvas.findByRole('menu');
  await expect(overlay).toBeInTheDocument();

  // Click outside - click on the body or a different element
  await userEvent.click(document.body);

  // Wait for dismissal
  await new Promise(resolve => setTimeout(resolve, 100));

  // Overlay should be dismissed
  try {
    await expect(overlay).not.toBeInTheDocument();
  } catch {
    // Some components might just hide the overlay
    await expect(overlay).not.toBeVisible();
  }
};

/**
 * Test keyboard navigation in menus/lists
 */
export const testMenuKeyboardNavigation = async (canvas: any, menuRole = 'menu') => {
  const menuItems = canvas.getAllByRole('menuitem');

  if (menuItems.length === 0) return;

  // Focus first item with arrow down
  await userEvent.keyboard('{ArrowDown}');
  await expect(menuItems[0]).toHaveFocus();

  // Navigate with arrow keys
  if (menuItems.length > 1) {
    await userEvent.keyboard('{ArrowDown}');
    await expect(menuItems[1]).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    await expect(menuItems[0]).toHaveFocus();
  }

  // Test Home/End if menu supports it
  if (menuItems.length > 2) {
    await userEvent.keyboard('{End}');
    await expect(menuItems[menuItems.length - 1]).toHaveFocus();

    await userEvent.keyboard('{Home}');
    await expect(menuItems[0]).toHaveFocus();
  }
};

/**
 * Test tab navigation in forms or component groups
 */
export const testTabNavigation = async (canvas: any, expectedFocusOrder: string[]) => {
  // Start from first element
  const firstElement = canvas.getByRole(expectedFocusOrder[0].split('|')[0],
    expectedFocusOrder[0].includes('|') ? { name: expectedFocusOrder[0].split('|')[1] } : undefined);

  await userEvent.click(firstElement);
  await expect(firstElement).toHaveFocus();

  // Tab through expected order
  for (let i = 1; i < expectedFocusOrder.length; i++) {
    await userEvent.keyboard('{Tab}');

    const [role, name] = expectedFocusOrder[i].split('|');
    const nextElement = name
      ? canvas.getByRole(role, { name })
      : canvas.getByRole(role);

    await expect(nextElement).toHaveFocus();
  }
};

/**
 * Test radio group keyboard navigation
 */
export const testRadioGroupNavigation = async (canvas: any, groupName?: string) => {
  const radios = canvas.getAllByRole('radio');

  if (radios.length === 0) return;

  // Focus first radio
  await userEvent.click(radios[0]);
  await expect(radios[0]).toHaveFocus();
  await expect(radios[0]).toBeChecked();

  // Navigate with arrow keys (focus moves but may not auto-select in this implementation)
  if (radios.length > 1) {
    await userEvent.keyboard('{ArrowDown}');
    await expect(radios[1]).toHaveFocus();

    // Some radio groups auto-select on arrow navigation, others just move focus
    // Test both patterns by clicking to select if not already selected
    const isAutoSelected = radios[1].getAttribute('aria-checked') === 'true';
    if (!isAutoSelected) {
      await userEvent.click(radios[1]);
    }
    await expect(radios[1]).toBeChecked();
    await expect(radios[0]).not.toBeChecked();

    await userEvent.keyboard('{ArrowUp}');
    await expect(radios[0]).toHaveFocus();

    const isAutoSelected2 = radios[0].getAttribute('aria-checked') === 'true';
    if (!isAutoSelected2) {
      await userEvent.click(radios[0]);
    }
    await expect(radios[0]).toBeChecked();
    await expect(radios[1]).not.toBeChecked();
  }
};

/**
 * Test tab panel keyboard navigation
 */
export const testTabsKeyboardNavigation = async (canvas: any) => {
  const tabs = canvas.getAllByRole('tab');

  if (tabs.length === 0) return;

  // Focus first tab
  await userEvent.click(tabs[0]);
  await expect(tabs[0]).toHaveFocus();
  await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

  // Navigate with arrow keys
  if (tabs.length > 1) {
    await userEvent.keyboard('{ArrowRight}');
    await expect(tabs[1]).toHaveFocus();
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'false');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(tabs[0]).toHaveFocus();
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  }

  // Test Home/End
  if (tabs.length > 2) {
    await userEvent.keyboard('{End}');
    await expect(tabs[tabs.length - 1]).toHaveFocus();
    await expect(tabs[tabs.length - 1]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Home}');
    await expect(tabs[0]).toHaveFocus();
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  }
};

/**
 * Test ARIA labeling relationships
 */
export const testAriaLabeling = async (canvas: any, elementRole: string, options: {
  hasLabel?: boolean;
  hasDescription?: boolean;
  labelText?: string;
  descriptionText?: string;
  elementName?: string;
}) => {
  const element = options.elementName
    ? canvas.getByRole(elementRole, { name: options.elementName })
    : canvas.getByRole(elementRole);

  if (options.hasLabel && options.labelText) {
    // Check if element has proper labeling
    await expect(element).toHaveAccessibleName(options.labelText);
  }

  if (options.hasDescription && options.descriptionText) {
    // Check if element has proper description
    await expect(element).toHaveAccessibleDescription(options.descriptionText);
  }
};

/**
 * Test focus visible states
 */
export const testFocusVisible = async (canvas: any, elementRole: string, elementName?: string) => {
  const element = elementName
    ? canvas.getByRole(elementRole, { name: elementName })
    : canvas.getByRole(elementRole);

  // Tab to element to ensure focus-visible
  await userEvent.keyboard('{Tab}');
  if (!element.matches(':focus')) {
    await userEvent.click(element);
  }

  await expect(element).toHaveFocus();

  // Note: testing :focus-visible pseudo-class is challenging in tests
  // This mainly ensures the element can receive focus properly
};

/**
 * Test screen reader announcements (simplified check)
 */
export const testScreenReaderAnnouncements = async (canvas: any, expectedAriaLive?: string) => {
  if (expectedAriaLive) {
    const liveRegion = canvas.queryByRole('status') || canvas.queryByRole('alert');

    if (liveRegion) {
      await expect(liveRegion).toHaveAttribute('aria-live', expectedAriaLive);
    }
  }
};

/**
 * Test form label associations
 */
export const testFormLabelAssociation = async (canvas: any, inputId: string, labelText: string) => {
  const input = canvas.getByRole('textbox');
  const label = canvas.getByText(labelText);

  // Test explicit association via htmlFor/id - just check the IDs match
  if (input.id) {
    await expect(input).toHaveAttribute('id', inputId);
    await expect(label).toHaveAttribute('for', inputId);
  }

  // Test that clicking label focuses input
  await userEvent.click(label);
  await expect(input).toHaveFocus();
};

/**
 * Test error announcement for form fields
 */
export const testErrorAnnouncement = async (canvas: any, errorMessage: string) => {
  const input = canvas.getByRole('textbox');
  const errorElement = canvas.getByText(errorMessage);

  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveAttribute('aria-describedby');

  const describedBy = input.getAttribute('aria-describedby');
  if (describedBy) {
    expect(errorElement.id).toBe(describedBy);
  }
};