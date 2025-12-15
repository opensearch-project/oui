import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { Button } from '@/components';
import { HelpCircle, Trash2, Edit, Copy, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: { type: 'boolean' },
      description: 'Whether the tooltip is open by default',
    },
    delayDuration: {
      control: { type: 'number' },
      description: 'The duration from when the mouse enters the trigger until the tooltip gets opened',
    },
    disableHoverableContent: {
      control: { type: 'boolean' },
      description: 'When true, trying to hover the content will result in the tooltip closing',
    },
  },
  args: {
    defaultOpen: false,
    delayDuration: 700,
    disableHoverableContent: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default tooltip
export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover for help</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a helpful tooltip message</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// Different positioning
export const TopPosition: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Top tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Tooltip positioned at the top</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Right tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Tooltip positioned to the right</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const BottomPosition: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Bottom tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Tooltip positioned at the bottom</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Left tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Tooltip positioned to the left</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// Different content types
export const ShortContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Save</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Save changes</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Advanced Settings</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Configure advanced settings for your account including privacy, security, and notification preferences</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Copy</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to clipboard</p>
        <p className="oui:text-xs oui:opacity-70 oui:mt-1">⌘+C</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// Different trigger elements
export const WithIconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <HelpCircle className="oui:h-4 oui:w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Get help and support</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithTextTrigger: Story = {
  render: () => (
    <div className="oui:text-sm">
      This is some text with a{' '}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="oui:underline oui:decoration-dotted oui:cursor-help">technical term</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>A technical term is a word or phrase that has a specific meaning within a particular field</p>
        </TooltipContent>
      </Tooltip>
      {' '}that needs explanation.
    </div>
  ),
};

// Different delay durations
export const FastTooltip: Story = {
  render: () => (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button variant="outline">Fast tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears quickly (100ms delay)</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const SlowTooltip: Story = {
  render: () => (
    <Tooltip delayDuration={1500}>
      <TooltipTrigger asChild>
        <Button variant="outline">Slow tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears slowly (1500ms delay)</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// Showcase stories
export const AllPositions: Story = {
  render: () => (
    <div className="oui:grid oui:grid-cols-3 oui:gap-8 oui:items-center justify-items-center oui:min-h-[200px]">
      <div></div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Top position</p>
        </TooltipContent>
      </Tooltip>
      <div></div>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Left position</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Center</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Default position</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Right position</p>
        </TooltipContent>
      </Tooltip>
      
      <div></div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Bottom position</p>
        </TooltipContent>
      </Tooltip>
      <div></div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available tooltip positions displayed in a grid layout.',
      },
    },
  },
};

export const CommonUseCases: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4 oui:items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Trash2 className="oui:h-4 oui:w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete item</p>
          <p className="oui:text-xs oui:opacity-70 oui:mt-1">⌘+⌫</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Edit className="oui:h-4 oui:w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit item</p>
          <p className="oui:text-xs oui:opacity-70 oui:mt-1">⌘+E</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Copy className="oui:h-4 oui:w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
          <p className="oui:text-xs oui:opacity-70 oui:mt-1">⌘+C</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <AlertTriangle className="oui:h-4 oui:w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Warning: This action cannot be undone</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common tooltip use cases with icon buttons and keyboard shortcuts.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => (
    <div className="oui:space-y-4">
      <p className="oui:text-sm oui:text-muted-foreground">
        Hover over the elements below to see different tooltip examples:
      </p>
      <div className="oui:flex oui:flex-wrap oui:gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Primary Action</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Perform the main action for this workflow</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Secondary Action</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Alternative action with less emphasis</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive">Dangerous Action</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>⚠️ This will permanently delete your data</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing tooltips with different button variants and contextual messages.',
      },
    },
  },
};