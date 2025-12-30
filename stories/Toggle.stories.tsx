import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from '@/components';
import { Toggle } from '@/components';


import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A toggle component that switches between two states, similar to a checkbox but with button styling.'),
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'The visual variant of the toggle',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle',
    },
    pressed: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is pressed',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    pressed: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [pressed, setPressed] = useState(args.pressed || false);

    return (
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle bold"
        {...args}
      >
        <BoldIcon className="oui:h-4 oui:w-4" />
      </Toggle>
    );
  },
};

export const WithText: Story = {
  render: (args) => {
    const [pressed, setPressed] = useState(args.pressed || false);

    return (
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle bold"
        {...args}
      >
        <BoldIcon className="oui:h-4 oui:w-4" />
        BoldIcon
      </Toggle>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle with both icon and text.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => {
    const [pressed, setPressed] = useState(args.pressed || false);

    return (
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle italic"
        {...args}
      >
        <ItalicIcon className="oui:h-4 oui:w-4" />
      </Toggle>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle with outline variant.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [smallPressed, setSmallPressed] = useState(false);
    const [defaultPressed, setDefaultPressed] = useState(false);
    const [largePressed, setLargePressed] = useState(false);

    return (
      <div className="oui:flex oui:items-center oui:space-x-2">
        <Toggle
          size="sm"
          pressed={smallPressed}
          onPressedChange={setSmallPressed}
          aria-label="Small toggle"
          {...args}
        >
          <BoldIcon className="oui:h-3 oui:w-3" />
        </Toggle>
        <Toggle
          size="default"
          pressed={defaultPressed}
          onPressedChange={setDefaultPressed}
          aria-label="Default toggle"
          {...args}
        >
          <BoldIcon className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          size="lg"
          pressed={largePressed}
          onPressedChange={setLargePressed}
          aria-label="Large toggle"
          {...args}
        >
          <BoldIcon className="oui:h-5 oui:w-5" />
        </Toggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle in different sizes.',
      },
    },
  },
};

export const TextFormatting: Story = {
  render: (args) => {
    const [bold, setBoldIcon] = useState(false);
    const [italic, setItalicIcon] = useState(false);
    const [underline, setUnderlineIcon] = useState(false);

    return (
      <div className="oui:flex oui:items-center oui:space-x-1">
        <Toggle
          pressed={bold}
          onPressedChange={setBoldIcon}
          aria-label="Toggle bold"
          {...args}
        >
          <BoldIcon className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={italic}
          onPressedChange={setItalicIcon}
          aria-label="Toggle italic"
          {...args}
        >
          <ItalicIcon className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={underline}
          onPressedChange={setUnderlineIcon}
          aria-label="Toggle underline"
          {...args}
        >
          <UnderlineIcon className="oui:h-4 oui:w-4" />
        </Toggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Text formatting toggles for a rich text editor.',
      },
    },
  },
};

export const TextAlignment: Story = {
  render: (args) => {
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

    return (
      <div className="oui:flex oui:items-center oui:space-x-1">
        <Toggle
          pressed={alignment === 'left'}
          onPressedChange={() => setAlignment('left')}
          aria-label="Align left"
          {...args}
        >
          <AlignLeftIcon className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={alignment === 'center'}
          onPressedChange={() => setAlignment('center')}
          aria-label="Align center"
          {...args}
        >
          <AlignCenterIcon className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={alignment === 'right'}
          onPressedChange={() => setAlignment('right')}
          aria-label="Align right"
          {...args}
        >
          <AlignRightIcon className="oui:h-4 oui:w-4" />
        </Toggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Text alignment toggles with single selection behavior.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    pressed: true,
  },
  render: (args) => (
    <Toggle aria-label="Disabled toggle" {...args}>
      <BoldIcon className="oui:h-4 oui:w-4" />
    </Toggle>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle state.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => {
    const [formatting, setFormatting] = useState({
      bold: false,
      italic: false,
      underline: false,
    });

    const toggleFormatting = (key: keyof typeof formatting) => {
      setFormatting(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="oui:space-y-8">
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Toggle Examples</h3>
          <div className="oui:space-y-6">
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Basic Toggles</p>
              <div className="oui:flex oui:items-center oui:space-x-2">
                <Toggle aria-label="BoldIcon">
                  <BoldIcon className="oui:h-4 oui:w-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="ItalicIcon">
                  <ItalicIcon className="oui:h-4 oui:w-4" />
                </Toggle>
                <Toggle aria-label="UnderlineIcon">
                  <UnderlineIcon className="oui:h-4 oui:w-4" />
                </Toggle>
              </div>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">With Text</p>
              <div className="oui:flex oui:items-center oui:space-x-2">
                <Toggle
                  pressed={formatting.bold}
                  onPressedChange={() => toggleFormatting('bold')}
                  aria-label="BoldIcon"
                >
                  <BoldIcon className="oui:h-4 oui:w-4" />
                  BoldIcon
                </Toggle>
                <Toggle
                  pressed={formatting.italic}
                  onPressedChange={() => toggleFormatting('italic')}
                  aria-label="ItalicIcon"
                >
                  <ItalicIcon className="oui:h-4 oui:w-4" />
                  ItalicIcon
                </Toggle>
              </div>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Sizes</p>
              <div className="oui:flex oui:items-center oui:space-x-2">
                <Toggle size="sm" aria-label="Small">
                  <BoldIcon className="oui:h-3 oui:w-3" />
                </Toggle>
                <Toggle size="default" aria-label="Default">
                  <BoldIcon className="oui:h-4 oui:w-4" />
                </Toggle>
                <Toggle size="lg" aria-label="Large">
                  <BoldIcon className="oui:h-5 oui:w-5" />
                </Toggle>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different toggle configurations and use cases.',
      },
    },
  },
};