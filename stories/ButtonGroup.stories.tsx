import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@/components';
import { Button } from '@/components';
import { Heart, Bookmark, Share, Check, Trash2 } from 'lucide-react';

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default button group
export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Save Draft</Button>
      <Button variant="outline">Preview</Button>
      <Button>Publish</Button>
    </ButtonGroup>
  ),
};

// Horizontal orientation (default)
export const Horizontal: Story = {
  render: () => {
    const [formatting, setFormatting] = useState<string[]>([]);
    
    const toggleFormat = (format: string) => {
      setFormatting(prev => 
        prev.includes(format) 
          ? prev.filter(f => f !== format)
          : [...prev, format]
      );
    };
    
    return (
      <div className="oui:space-y-4">
        <ButtonGroup>
          <Button 
            variant={formatting.includes('bold') ? 'default' : 'outline'}
            onClick={() => toggleFormat('bold')}
          >
            Bold
          </Button>
          <Button 
            variant={formatting.includes('italic') ? 'default' : 'outline'}
            onClick={() => toggleFormat('italic')}
          >
            Italic
          </Button>
          <Button 
            variant={formatting.includes('oui:underline') ? 'default' : 'outline'}
            onClick={() => toggleFormat('oui:underline')}
          >
            Underline
          </Button>
        </ButtonGroup>
        <p className="oui:text-sm oui:text-muted-foreground">
          Active formatting: {formatting.length > 0 ? formatting.join(', ') : 'none'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Button group with horizontal orientation (default). Click buttons to toggle formatting.',
      },
    },
  },
};


// With different button variants
export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Save Draft</Button>
      <Button>Save & Continue</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button group with different button variants mixed together.',
      },
    },
  },
};

// With button sizes
export const DifferentSizes: Story = {
  render: () => (
    <div className="oui:space-y-4">
      <ButtonGroup>
        <Button size="sm" variant="outline">Small</Button>
        <Button size="sm" variant="outline">Group</Button>
        <Button size="sm">Action</Button>
      </ButtonGroup>
      
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Size</Button>
        <Button>Group</Button>
      </ButtonGroup>
      
      <ButtonGroup>
        <Button size="lg" variant="outline">Large</Button>
        <Button size="lg" variant="outline">Button</Button>
        <Button size="lg">Group</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button groups with different button sizes.',
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <Heart />
        Like
      </Button>
      <Button variant="outline">
        <Bookmark />
        Bookmark
      </Button>
      <Button variant="outline">
        <Share />
        Share
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button group with icons in each button.',
      },
    },
  },
};

// With separator
export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Undo</Button>
      <Button variant="outline">Redo</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Cut</Button>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button group with separator to visually group related actions.',
      },
    },
  },
};

// With text element
export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Format:</ButtonGroupText>
      <Button variant="outline">Bold</Button>
      <Button variant="outline">Italic</Button>
      <Button variant="outline">Underline</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button group with text label element.',
      },
    },
  },
};

// Disabled state
export const DisabledButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" disabled>Unavailable</Button>
      <Button variant="outline">Available</Button>
      <Button>Primary Action</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button group with some disabled buttons.',
      },
    },
  },
};

// Complex toolbar example
export const ToolbarExample: Story = {
  render: () => (
    <div className="oui:space-y-4">
      <ButtonGroup>
        <ButtonGroupText>File:</ButtonGroupText>
        <Button variant="outline" size="sm">New</Button>
        <Button variant="outline" size="sm">Open</Button>
        <Button variant="outline" size="sm">Save</Button>
        <ButtonGroupSeparator />
        <Button variant="outline" size="sm">Export</Button>
      </ButtonGroup>
      
      <ButtonGroup>
        <ButtonGroupText>Edit:</ButtonGroupText>
        <Button variant="outline" size="sm">
          <Check />
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 />
        </Button>
        <ButtonGroupSeparator />
        <Button variant="outline" size="sm">Copy</Button>
        <Button variant="outline" size="sm">Paste</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex toolbar example with multiple button groups, text labels, separators, and icons.',
      },
    },
  },
};

