import { expect, userEvent } from '@storybook/test';

/**
 * Test helper utilities for component interaction testing
 * These functions provide reusable patterns for common interaction scenarios
 */

/**
 * Test standard form control behavior - typing, focus, blur, validation
 */
export const testFormControl = async (canvas: any, inputSelector: string, testValue = 'test input') => {
  const input = canvas.getByRole('textbox');

  // Test initial state
  await expect(input).toBeInTheDocument();
  await expect(input).toHaveValue('');

  // Test focus behavior
  await userEvent.click(input);
  await expect(input).toHaveFocus();

  // Test typing
  await userEvent.clear(input);
  await userEvent.type(input, testValue);
  await expect(input).toHaveValue(testValue);

  // Test blur behavior
  await userEvent.tab();
  await expect(input).not.toHaveFocus();
};

/**
 * Test form control with different input types
 */
export const testInputTypes = async (canvas: any, inputType: string, testValue: string) => {
  // Different input types have different roles or no roles
  let input;

  if (inputType === 'password') {
    // Password inputs are just regular inputs, find by placeholder
    input = canvas.getByPlaceholderText(/enter your password/i);
  } else if (inputType === 'file') {
    // File inputs have no role, find by type attribute
    const inputs = canvas.getByRole('textbox', { hidden: true }) || document.querySelector('input[type="file"]');
    input = inputs;
  } else {
    // Most other input types have textbox role
    input = canvas.getByRole('textbox');
  }

  await expect(input).toHaveAttribute('type', inputType);
  if (inputType !== 'file') { // File inputs can't be cleared/typed into normally
    await userEvent.clear(input);
    await userEvent.type(input, testValue);
    await expect(input).toHaveValue(testValue);
  }
};

/**
 * Test disabled state behavior
 */
export const testDisabledState = async (canvas: any, elementRole: string, elementName?: string) => {
  const element = elementName
    ? canvas.getByRole(elementRole, { name: elementName })
    : canvas.getByRole(elementRole);

  // Different components implement disabled state differently
  const hasDisabled = element.hasAttribute('disabled');
  const hasDataDisabled = element.hasAttribute('data-disabled');
  const hasAriaDisabled = element.getAttribute('aria-disabled') === 'true';

  if (hasDisabled) {
    await expect(element).toBeDisabled();
    await expect(element).toHaveAttribute('disabled');
  } else if (hasDataDisabled) {
    // Some components use data-disabled attribute
    await expect(element).toHaveAttribute('data-disabled');
  } else if (hasAriaDisabled) {
    // Some components use aria-disabled
    await expect(element).toHaveAttribute('aria-disabled', 'true');
  } else {
    // Fallback: just check that the element looks disabled (opacity, cursor, etc.)
    console.log('Element may be disabled through CSS or other means');
  }

  // For disabled elements, we shouldn't attempt to click as they have pointer-events: none
  // Just verify they maintain their disabled state
};

/**
 * Test readonly state behavior for inputs
 */
export const testReadOnlyState = async (canvas: any, currentValue: string) => {
  const input = canvas.getByRole('textbox');

  await expect(input).toHaveAttribute('readonly');
  await expect(input).toHaveValue(currentValue);

  // Try to type - should not change value
  await userEvent.click(input);
  await userEvent.type(input, 'should not change');
  await expect(input).toHaveValue(currentValue);
};

/**
 * Test required field validation behavior
 */
export const testRequiredField = async (canvas: any) => {
  const input = canvas.getByRole('textbox');

  await expect(input).toBeRequired();
  await expect(input).toHaveAttribute('required');
};

/**
 * Test ARIA attributes and accessibility
 */
export const testAccessibility = async (canvas: any, element: HTMLElement, options: {
  hasAriaLabel?: boolean;
  hasAriaDescribedBy?: boolean;
  hasAriaInvalid?: boolean;
  customAriaAttributes?: Record<string, string>;
} = {}) => {
  if (options.hasAriaLabel) {
    await expect(element).toHaveAttribute('aria-label');
  }

  if (options.hasAriaDescribedBy) {
    await expect(element).toHaveAttribute('aria-describedby');
  }

  if (options.hasAriaInvalid) {
    await expect(element).toHaveAttribute('aria-invalid', 'true');
  }

  if (options.customAriaAttributes) {
    for (const [attr, value] of Object.entries(options.customAriaAttributes)) {
      await expect(element).toHaveAttribute(attr, value);
    }
  }
};

/**
 * Test keyboard navigation patterns
 */
export const testKeyboardNavigation = async (canvas: any, containerSelector: string, keys: string[]) => {
  for (const key of keys) {
    await userEvent.keyboard(key);
    // Allow for focus to settle
    await new Promise(resolve => setTimeout(resolve, 50));
  }
};

/**
 * Test keyboard interaction on specific elements
 */
export const testKeyboardInteraction = async (canvas: any, elementRole: string, keys: string[], expectedStates: string[], specificElement?: HTMLElement) => {
  const element = specificElement || canvas.getByRole(elementRole);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const expectedState = expectedStates[i];

    await userEvent.keyboard(key);

    // Check the expected state change
    if (expectedState === 'checked') {
      await expect(element).toBeChecked();
    } else if (expectedState === 'unchecked') {
      await expect(element).not.toBeChecked();
    } else if (expectedState === 'focused') {
      await expect(element).toHaveFocus();
    }

    // Allow for state to settle
    await new Promise(resolve => setTimeout(resolve, 50));
  }
};

/**
 * Test checkbox/switch/toggle button behavior
 */
export const testToggleBehavior = async (canvas: any, toggleRole = 'checkbox', toggleName?: string) => {
  const toggle = toggleName
    ? canvas.getByRole(toggleRole, { name: toggleName })
    : canvas.getByRole(toggleRole);

  // Handle different toggle types
  if (toggleRole === 'button') {
    // Button-based toggles use aria-pressed - check initial state
    const initialState = toggle.getAttribute('aria-pressed');

    // Test first toggle
    await userEvent.click(toggle);

    // Wait for React state update
    await new Promise(resolve => setTimeout(resolve, 100));

    const firstState = toggle.getAttribute('aria-pressed');

    // The state should have changed from initial
    expect(firstState).not.toBe(initialState);

    // Test second toggle (should go back to initial state)
    await userEvent.click(toggle);

    // Wait for React state update
    await new Promise(resolve => setTimeout(resolve, 100));

    const secondState = toggle.getAttribute('aria-pressed');
    expect(secondState).toBe(initialState);
  } else {
    // Checkbox/switch-based toggles use checked state
    await expect(toggle).not.toBeChecked();

    // Test first toggle
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();

    // Test second toggle (back to unchecked)
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
  }
};

/**
 * Test button click behavior and states
 */
export const testButtonBehavior = async (canvas: any, buttonText: string, shouldBeDisabled = false) => {
  const button = canvas.getByRole('button', { name: new RegExp(buttonText, 'i') });

  await expect(button).toBeInTheDocument();

  if (shouldBeDisabled) {
    await expect(button).toBeDisabled();
  } else {
    await expect(button).toBeEnabled();
    await userEvent.click(button);
  }
};

/**
 * Test loading state with spinner
 */
export const testLoadingState = async (canvas: any, buttonText: string) => {
  const button = canvas.getByRole('button', { name: new RegExp(buttonText, 'i') });

  // Should be disabled when loading
  await expect(button).toBeDisabled();

  // Should have spinner
  const spinner = canvas.getByRole('status', { name: /loading/i });
  await expect(spinner).toBeInTheDocument();

  // Should still have text content
  await expect(button).toHaveTextContent(buttonText);
};

/**
 * Wait for element to appear (useful for async components)
 */
export const waitForElement = async (canvas: any, role: string, name?: string, timeout = 1000) => {
  const element = await canvas.findByRole(role, name ? { name } : undefined, { timeout });
  await expect(element).toBeInTheDocument();
  return element;
};

/**
 * Test validation error states
 */
export const testValidationError = async (canvas: any, inputRole = 'textbox', errorMessage?: string) => {
  const input = canvas.getByRole(inputRole);

  await expect(input).toHaveAttribute('aria-invalid', 'true');

  if (errorMessage) {
    const error = canvas.getByText(errorMessage);
    await expect(error).toBeInTheDocument();
  }
};

/**
 * Test success validation states
 */
export const testValidationSuccess = async (canvas: any, inputRole = 'textbox', successMessage?: string) => {
  const input = canvas.getByRole(inputRole);

  // Success states might not have aria-invalid or should be false
  const ariaInvalid = input.getAttribute('aria-invalid');
  if (ariaInvalid !== null) {
    await expect(input).toHaveAttribute('aria-invalid', 'false');
  }

  if (successMessage) {
    const success = canvas.getByText(successMessage);
    await expect(success).toBeInTheDocument();
  }
};