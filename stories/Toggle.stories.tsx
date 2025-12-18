import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
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
        <Bold className="oui:h-4 oui:w-4" />
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
        <Bold className="oui:h-4 oui:w-4" />
        Bold
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
        <Italic className="oui:h-4 oui:w-4" />
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
          <Bold className="oui:h-3 oui:w-3" />
        </Toggle>
        <Toggle
          size="default"
          pressed={defaultPressed}
          onPressedChange={setDefaultPressed}
          aria-label="Default toggle"
          {...args}
        >
          <Bold className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          size="lg"
          pressed={largePressed}
          onPressedChange={setLargePressed}
          aria-label="Large toggle"
          {...args}
        >
          <Bold className="oui:h-5 oui:w-5" />
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
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <div className="oui:flex oui:items-center oui:space-x-1">
        <Toggle
          pressed={bold}
          onPressedChange={setBold}
          aria-label="Toggle bold"
          {...args}
        >
          <Bold className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={italic}
          onPressedChange={setItalic}
          aria-label="Toggle italic"
          {...args}
        >
          <Italic className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={underline}
          onPressedChange={setUnderline}
          aria-label="Toggle underline"
          {...args}
        >
          <Underline className="oui:h-4 oui:w-4" />
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
          <AlignLeft className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={alignment === 'center'}
          onPressedChange={() => setAlignment('center')}
          aria-label="Align center"
          {...args}
        >
          <AlignCenter className="oui:h-4 oui:w-4" />
        </Toggle>
        <Toggle
          pressed={alignment === 'right'}
          onPressedChange={() => setAlignment('right')}
          aria-label="Align right"
          {...args}
        >
          <AlignRight className="oui:h-4 oui:w-4" />
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
      <Bold className="oui:h-4 oui:w-4" />
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
                <Toggle aria-label="Bold">
                  <Bold className="oui:h-4 oui:w-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Italic">
                  <Italic className="oui:h-4 oui:w-4" />
                </Toggle>
                <Toggle aria-label="Underline">
                  <Underline className="oui:h-4 oui:w-4" />
                </Toggle>
              </div>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">With Text</p>
              <div className="oui:flex oui:items-center oui:space-x-2">
                <Toggle
                  pressed={formatting.bold}
                  onPressedChange={() => toggleFormatting('bold')}
                  aria-label="Bold"
                >
                  <Bold className="oui:h-4 oui:w-4" />
                  Bold
                </Toggle>
                <Toggle
                  pressed={formatting.italic}
                  onPressedChange={() => toggleFormatting('italic')}
                  aria-label="Italic"
                >
                  <Italic className="oui:h-4 oui:w-4" />
                  Italic
                </Toggle>
              </div>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Sizes</p>
              <div className="oui:flex oui:items-center oui:space-x-2">
                <Toggle size="sm" aria-label="Small">
                  <Bold className="oui:h-3 oui:w-3" />
                </Toggle>
                <Toggle size="default" aria-label="Default">
                  <Bold className="oui:h-4 oui:w-4" />
                </Toggle>
                <Toggle size="lg" aria-label="Large">
                  <Bold className="oui:h-5 oui:w-5" />
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