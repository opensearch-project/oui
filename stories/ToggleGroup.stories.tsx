import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, Grid, Calendar } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components';


import { createDocsWithWarning } from './utils/warning-banner';

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
          <Bold className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
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
          <Bold className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
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
          <AlignLeft className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="oui:h-4 oui:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="oui:h-4 oui:w-4" />
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
          <List className="oui:h-4 oui:w-4" />
          List
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <Grid className="oui:h-4 oui:w-4" />
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="calendar" aria-label="Calendar view">
          <Calendar className="oui:h-4 oui:w-4" />
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
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="oui:h-3 oui:w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="oui:h-3 oui:w-3" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="oui:h-3 oui:w-3" />
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
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="oui:h-4 oui:w-4" />
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
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="oui:h-5 oui:w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="oui:h-5 oui:w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="oui:h-5 oui:w-5" />
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
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="oui:h-4 oui:w-4" />
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
              <AlignLeft className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
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
              <List className="oui:h-4 oui:w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="oui:h-4 oui:w-4" />
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
                  <AlignLeft className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="oui:h-4 oui:w-4" />
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
                <ToggleGroupItem value="bold" aria-label="Bold">
                  <Bold className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  <Italic className="oui:h-4 oui:w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                  <Underline className="oui:h-4 oui:w-4" />
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
                  <List className="oui:h-4 oui:w-4" />
                  List
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid className="oui:h-4 oui:w-4" />
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