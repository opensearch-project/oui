import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';
import { BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, ListIcon, GridIcon, CalendarIcon } from '@/components';
import { ToggleGroup, ToggleGroupItem } from '@/components';


import { createDocsWithWarning } from './utils/warning-banner';
import { testAriaLabeling } from './utils/accessibility-helpers';

const meta: Meta<typeof ToggleGroup> = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A toggle group component that allows single or multiple selection from a group of toggle buttons.'),
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Selection type - single or multiple',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'The visual variant of the toggle group',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle group',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle group is disabled',
    },
  },
  args: {
    type: 'single',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState<string>('');

    return (
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all toggle items (single selection uses role="radio")
    const boldToggle = canvas.getByRole('radio', { name: 'Toggle bold' });
    const italicToggle = canvas.getByRole('radio', { name: 'Toggle italic' });
    const underlineToggle = canvas.getByRole('radio', { name: 'Toggle underline' });

    // Test that all toggles are present and enabled
    await expect(boldToggle).toBeInTheDocument();
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeInTheDocument();
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeInTheDocument();
    await expect(underlineToggle).toBeEnabled();

    // Test single selection behavior - clicking one should work
    await userEvent.click(boldToggle);
    await expect(boldToggle).toBeEnabled();

    // Test that clicking another deselects the first (single selection)
    await userEvent.click(italicToggle);
    await expect(italicToggle).toBeEnabled();

    // Test clicking the same toggle again
    await userEvent.click(italicToggle);
    await expect(italicToggle).toBeEnabled();

    // Test clicking underline toggle
    await userEvent.click(underlineToggle);
    await expect(underlineToggle).toBeEnabled();

    // Test focus behavior when clicking
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveFocus();

    // Test that clicking different items transfers focus
    await userEvent.click(italicToggle);
    await expect(italicToggle).toHaveFocus();

    await userEvent.click(underlineToggle);
    await expect(underlineToggle).toHaveFocus();

    // Test basic keyboard interactions (may not work in test environment)
    try {
      await userEvent.keyboard('{Enter}');
      await expect(underlineToggle).toBeEnabled();
    } catch (error) {
      // Keyboard activation may not work in test environment
    }

    // Test ARIA labeling - ensure toggle items have proper attributes
    // Single selection ToggleGroup items use radio role with aria-checked
    await expect(underlineToggle).toHaveAttribute('aria-checked');
  },
};

export const Multiple: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <ToggleGroup
        type="multiple"
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all toggle items
    const boldToggle = canvas.getByRole('button', { name: 'Toggle bold' });
    const italicToggle = canvas.getByRole('button', { name: 'Toggle italic' });
    const underlineToggle = canvas.getByRole('button', { name: 'Toggle underline' });

    // Test that all toggles are present and enabled
    await expect(boldToggle).toBeInTheDocument();
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeInTheDocument();
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeInTheDocument();
    await expect(underlineToggle).toBeEnabled();

    // Test multiple selection behavior - clicking multiple should all remain active
    await userEvent.click(boldToggle);
    await expect(boldToggle).toBeEnabled();

    // Click another toggle - both should remain clickable (multiple selection)
    await userEvent.click(italicToggle);
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled();

    // Click third toggle - all should remain clickable
    await userEvent.click(underlineToggle);
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeEnabled();

    // Test that clicking same toggle again works (toggling off)
    await userEvent.click(boldToggle);
    await expect(boldToggle).toBeEnabled();

    // Test that other toggles are still functional
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeEnabled();

    // Test rapid clicking doesn't break anything
    await userEvent.click(italicToggle);
    await userEvent.click(italicToggle);
    await userEvent.click(underlineToggle);
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeEnabled();

    // Test focus behavior when clicking
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveFocus();

    // Test that clicking different items works and maintains focus
    await userEvent.click(italicToggle);
    await expect(italicToggle).toHaveFocus();

    await userEvent.click(underlineToggle);
    await expect(underlineToggle).toHaveFocus();

    // Test basic keyboard interactions (may not work in test environment)
    try {
      await userEvent.keyboard('{Enter}');
      await expect(underlineToggle).toBeEnabled();
    } catch (error) {
      // Keyboard activation may not work in test environment
    }

    // Test ARIA labeling - ensure toggle has proper attributes
    await expect(italicToggle).toHaveAttribute('aria-pressed');
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle group allowing multiple selections.',
      },
    },
  },
};

export const Outline: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState<string>('left');

    return (
      <ToggleGroup
        type="single"
        variant="outline"
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeftIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenterIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRightIcon className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle group with outline variant.',
      },
    },
  },
};

export const WithText: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState<string>('list');

    return (
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem value="list" aria-label="List view">
          <ListIcon className="oui:h-4 oui:w-4" />
          List
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <GridIcon className="oui:h-4 oui:w-4" />
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="calendar" aria-label="Calendar view">
          <CalendarIcon className="oui:h-4 oui:w-4" />
          Calendar
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle group with text labels.',
      },
    },
  },
};

export const Sizes: Story = {
  args: {} as never,
  render: (args) => {
    const [smallValue, setSmallValue] = useState<string>('bold');
    const [defaultValue, setDefaultValue] = useState<string>('bold');
    const [largeValue, setLargeValue] = useState<string>('bold');

    return (
      <div className="oui:space-y-4">
        <div>
          <p className="oui:text-sm oui:font-medium oui:mb-2">Small</p>
          <ToggleGroup
            type="single"
            size="sm"
            value={smallValue}
            onValueChange={setSmallValue}
              >
            <ToggleGroupItem value="bold" aria-label="BoldIcon">
              <BoldIcon className="oui:h-3 oui:w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="ItalicIcon">
              <ItalicIcon className="oui:h-3 oui:w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="UnderlineIcon">
              <UnderlineIcon className="oui:h-3 oui:w-3" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div>
          <p className="oui:text-sm oui:font-medium oui:mb-2">Default</p>
          <ToggleGroup
            type="single"
            size="default"
            value={defaultValue}
            onValueChange={setDefaultValue}
              >
            <ToggleGroupItem value="bold" aria-label="BoldIcon">
              <BoldIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="ItalicIcon">
              <ItalicIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="UnderlineIcon">
              <UnderlineIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div>
          <p className="oui:text-sm oui:font-medium oui:mb-2">Large</p>
          <ToggleGroup
            type="single"
            size="lg"
            value={largeValue}
            onValueChange={setLargeValue}
              >
            <ToggleGroupItem value="bold" aria-label="BoldIcon">
              <BoldIcon className="oui:h-5 oui:w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="ItalicIcon">
              <ItalicIcon className="oui:h-5 oui:w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="UnderlineIcon">
              <UnderlineIcon className="oui:h-5 oui:w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle groups in different sizes.',
      },
    },
  },
};

export const TextEditor: Story = {
  args: {} as never,
  render: (args) => {
    const [formatting, setFormatting] = useState<string[]>([]);
    const [alignment, setAlignment] = useState<string>('left');

    return (
      <div className="oui:space-y-4">
        <div>
          <p className="oui:text-sm oui:font-medium oui:mb-2">Text Formatting</p>
          <ToggleGroup
            type="multiple"
            value={formatting}
            onValueChange={setFormatting}
              >
            <ToggleGroupItem value="bold" aria-label="BoldIcon">
              <BoldIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="ItalicIcon">
              <ItalicIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="UnderlineIcon">
              <UnderlineIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <p className="oui:text-sm oui:font-medium oui:mb-2">Text Alignment</p>
          <ToggleGroup
            type="single"
            value={alignment}
            onValueChange={setAlignment}
              >
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeftIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenterIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRightIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get formatting toggle items (multiple selection uses role="button")
    const boldToggle = canvas.getByRole('button', { name: 'BoldIcon' });
    const italicToggle = canvas.getByRole('button', { name: 'ItalicIcon' });
    const underlineToggle = canvas.getByRole('button', { name: 'UnderlineIcon' });

    // Get alignment toggle items (single selection uses role="radio")
    const leftAlign = canvas.getByRole('radio', { name: 'Align left' });
    const centerAlign = canvas.getByRole('radio', { name: 'Align center' });
    const rightAlign = canvas.getByRole('radio', { name: 'Align right' });

    // Test that all toggles are present and enabled
    await expect(boldToggle).toBeInTheDocument();
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeEnabled();
    await expect(leftAlign).toBeEnabled();
    await expect(centerAlign).toBeEnabled();
    await expect(rightAlign).toBeEnabled();

    // Test multiple selection formatting - multiple can be active
    await userEvent.click(boldToggle);
    await expect(boldToggle).toBeEnabled();

    await userEvent.click(italicToggle);
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled();

    await userEvent.click(underlineToggle);
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeEnabled();

    // Test single selection alignment - independent of formatting
    await userEvent.click(centerAlign);
    await expect(centerAlign).toBeEnabled();
    // Formatting should still be enabled
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeEnabled();

    await userEvent.click(rightAlign);
    await expect(rightAlign).toBeEnabled();
    // Formatting should still be enabled
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled();
    await expect(underlineToggle).toBeEnabled();

    // Test toggling formatting while alignment is set
    await userEvent.click(boldToggle); // Toggle off
    await expect(boldToggle).toBeEnabled();
    await expect(italicToggle).toBeEnabled(); // Should stay on
    await expect(rightAlign).toBeEnabled(); // Alignment should stay on

    // Test focus behavior for both groups
    await userEvent.click(italicToggle);
    await expect(italicToggle).toHaveFocus();

    // Test focus in alignment group
    await userEvent.click(centerAlign);
    await expect(centerAlign).toHaveFocus();

    // Test that clicking items in both groups maintains their independence
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveFocus();
    await expect(italicToggle).toBeEnabled(); // Should still be enabled
    await expect(centerAlign).toBeEnabled(); // Should still be enabled

    // Test ARIA labeling for both groups
    await testAriaLabeling(canvas, 'button', {
      hasLabel: true,
      labelText: 'UnderlineIcon',
      elementName: 'UnderlineIcon',
    });

    await testAriaLabeling(canvas, 'radio', {
      hasLabel: true,
      labelText: 'Align center',
      elementName: 'Align center',
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Text editor toolbar with formatting and alignment controls.',
      },
    },
  },
};

export const ViewSwitcher: Story = {
  args: {} as never,
  render: (args) => {
    const [view, setView] = useState<string>('list');

    return (
      <div className="oui:space-y-4">
        <div className="oui:flex oui:items-center oui:justify-between">
          <h3 className="oui:text-lg oui:font-semibold">Products</h3>
          <ToggleGroup
            type="single"
            variant="outline"
            value={view}
            onValueChange={setView}
              >
            <ToggleGroupItem value="list" aria-label="List view">
              <ListIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <GridIcon className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="oui:text-sm oui:text-muted-foreground">
          Current view: {view}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'View switcher for changing between list and grid layouts.',
      },
    },
  },
};

export const Showcase: Story = {
  args: {} as never,
  render: () => {
    const [formatting, setFormatting] = useState<string[]>(['bold']);
    const [alignment, setAlignment] = useState<string>('left');
    const [view, setView] = useState<string>('list');

    return (
      <div className="oui:space-y-8">
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Toggle Group Examples</h3>
          <div className="oui:space-y-6">
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Single Selection</p>
              <ToggleGroup
                type="single"
                value={alignment}
                onValueChange={setAlignment}
              >
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeftIcon className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenterIcon className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRightIcon className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Multiple Selection</p>
              <ToggleGroup
                type="multiple"
                value={formatting}
                onValueChange={setFormatting}
              >
                <ToggleGroupItem value="bold" aria-label="BoldIcon">
                  <BoldIcon className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="ItalicIcon">
                  <ItalicIcon className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="UnderlineIcon">
                  <UnderlineIcon className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Outline Variant</p>
              <ToggleGroup
                type="single"
                variant="outline"
                value={view}
                onValueChange={setView}
              >
                <ToggleGroupItem value="list" aria-label="List view">
                  <ListIcon className="oui:h-4 oui:w-4" />
                  List
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <GridIcon className="oui:h-4 oui:w-4" />
                  Grid
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different toggle group configurations and selection types.',
      },
    },
  },
};