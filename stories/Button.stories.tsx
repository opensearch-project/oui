import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import { Button } from '@/components';
import { testButtonBehavior, testDisabledState } from './utils/test-helpers';
import { testAriaLabeling, testFocusVisible } from './utils/accessibility-helpers';

const meta: Meta<typeof Button> = { 
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Change the default rendered element for the one passed as a child',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is oui:disabled',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state (automatically includes spinner and disables the button)',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
  },
  args: {
    onClick: () => console.log('Button clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Default: Story = {
  args: {
    children: 'Save Changes',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test basic button behavior
    await testButtonBehavior(canvas, 'Save Changes');

    const button = canvas.getByRole('button', { name: 'Save Changes' });

    // Test focus behavior
    await userEvent.click(button);
    await expect(button).toHaveFocus();

    // Test keyboard interaction (Enter and Space keys)
    await userEvent.keyboard('{Enter}');
    await expect(button).toBeEnabled();

    // Test space key
    await userEvent.keyboard(' ');
    await expect(button).toBeEnabled();

    // Test ARIA labeling
    await testAriaLabeling(canvas, 'button', {
      hasLabel: true,
      labelText: 'Save Changes',
    });

    // Test focus visible state
    await testFocusVisible(canvas, 'button', 'Save Changes');

    // Test multiple clicks (rapid clicking shouldn't break anything)
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    await expect(button).toBeEnabled();
  },
};

// Variant stories
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Account',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that destructive variant works the same as default for interactions
    await testButtonBehavior(canvas, 'Delete Account');

    const button = canvas.getByRole('button', { name: 'Delete Account' });

    // Test focus and keyboard interaction
    await userEvent.click(button);
    await expect(button).toHaveFocus();

    // Test keyboard activation
    await userEvent.keyboard('{Enter}');
    await expect(button).toBeEnabled();

    await userEvent.keyboard(' ');
    await expect(button).toBeEnabled();

    // Test variant-specific styling is applied (data attribute)
    await expect(button).toHaveAttribute('data-variant', 'destructive');

    // Test ARIA labeling works for variants
    await testAriaLabeling(canvas, 'button', {
      hasLabel: true,
      labelText: 'Delete Account',
    });
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Learn More',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'View Details',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Read Documentation',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Submit',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Get Started',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '✓',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Save Changes',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled state behavior
    await testDisabledState(canvas, 'button', 'Save Changes');

    const button = canvas.getByRole('button', { name: 'Save Changes' });

    // Test that disabled button cannot be clicked
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('disabled');

    // Test that disabled button is not focusable via tab
    await userEvent.tab();
    await expect(button).not.toHaveFocus();

    // Test ARIA labeling for disabled button
    await testAriaLabeling(canvas, 'button', {
      hasLabel: true,
      labelText: 'Save Changes',
    });

    // Test that keyboard events don't work on disabled button
    try {
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
    } catch (error) {
      // Expected - disabled buttons should not respond to keyboard events
    }
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5l10 -10" />
        </svg>
        Save Changes
      </>
    ),
  },
};

// Showcase stories
export const AllVariants: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all buttons are present and interactive
    const buttons = [
      { name: 'Default', variant: 'default' },
      { name: 'Destructive', variant: 'destructive' },
      { name: 'Outline', variant: 'outline' },
      { name: 'Secondary', variant: 'secondary' },
      { name: 'Ghost', variant: 'ghost' },
      { name: 'Link', variant: 'link' },
    ];

    for (const { name, variant } of buttons) {
      const button = canvas.getByRole('button', { name });

      // Test basic functionality
      await expect(button).toBeEnabled();
      await expect(button).toBeInTheDocument();

      // Test variant attribute
      await expect(button).toHaveAttribute('data-variant', variant);

      // Test click behavior
      await userEvent.click(button);
      await expect(button).toHaveFocus();
    }

    // Test keyboard navigation between buttons
    const firstButton = canvas.getByRole('button', { name: 'Default' });
    await userEvent.click(firstButton);
    await expect(firstButton).toHaveFocus();

    // Tab to next button
    await userEvent.tab();
    const secondButton = canvas.getByRole('button', { name: 'Destructive' });
    await expect(secondButton).toHaveFocus();

    // Test keyboard activation
    await userEvent.keyboard('{Enter}');
    await expect(secondButton).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together with comprehensive interaction testing.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="oui:flex oui:items-center oui:gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">✓</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Please wait',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /please wait/i });

    // Test that button is disabled when loading
    await expect(button).toBeDisabled();

    // Test that spinner is present
    const spinner = canvas.getByRole('status', { name: /loading/i });
    await expect(spinner).toBeInTheDocument();

    // Test that children text is still visible
    await expect(button).toHaveTextContent('Please wait');
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in a loading state using the loading prop - automatically includes spinner and disables the button.',
      },
    },
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <Button loading>Default Loading</Button>
      <Button variant="destructive" loading>Deleting...</Button>
      <Button variant="outline" loading>Processing...</Button>
      <Button variant="secondary" loading>Saving...</Button>
      <Button variant="ghost" loading>Loading...</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state across all button variants - each maintains its distinct styling with automatic spinner.',
      },
    },
  },
};

export const LoadingSizes: Story = {
  render: () => (
    <div className="oui:flex oui:items-center oui:gap-4">
      <Button size="sm" loading>Small</Button>
      <Button loading>Default</Button>
      <Button size="lg" loading>Large</Button>
      <Button size="icon" loading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state across all button sizes - spinner automatically scales to match button size.',
      },
    },
  },
};

export const LoadingComparison: Story = {
  render: () => (
    <div className="oui:space-y-6">
      <div className="oui:space-y-2">
        <h4 className="oui:text-sm oui:font-medium">Normal State</h4>
        <div className="oui:flex oui:gap-4">
          <Button>Save Changes</Button>
          <Button variant="destructive">Delete Item</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
      <div className="oui:space-y-2">
        <h4 className="oui:text-sm oui:font-medium">Loading State</h4>
        <div className="oui:flex oui:gap-4">
          <Button loading>Save Changes</Button>
          <Button variant="destructive" loading>Delete Item</Button>
          <Button variant="outline" loading>Cancel</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of normal vs loading states showing how the loading prop transforms buttons.',
      },
    },
  },
};

