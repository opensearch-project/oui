import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components';
import { LineChart, BarChart3, PieChart } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the select is required',
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'The default selected value',
    },
    onValueChange: {
      action: 'value-changed',
      description: 'Function called when the selected value changes',
    },
  },
  args: {
    onValueChange: (value: string) => console.log('Selected:', value),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default select
export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="oui:w-[266px]">
        <SelectValue placeholder="Select fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="strawberry">Strawberry</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// With default value
export const WithDefaultValue: Story = {
  render: (args) => (
    <Select defaultValue="react" {...args}>
      <SelectTrigger className="oui:w-[200px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="angular">Angular</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Small size variant
export const Small: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger size="sm" className="oui:w-[200px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <Select disabled {...args}>
      <SelectTrigger className="oui:w-[200px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="angular">Angular</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// With icon
export const WithIcon: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="oui:w-[266px]">
        <SelectValue placeholder="Select chart type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="line">
          <div className="oui:flex oui:items-center oui:gap-2">
            <LineChart className="oui:size-3 oui:text-muted-foreground" />
            Line
          </div>
        </SelectItem>
        <SelectItem value="bar">
          <div className="oui:flex oui:items-center oui:gap-2">
            <BarChart3 className="oui:size-3 oui:text-muted-foreground" />
            Bar
          </div>
        </SelectItem>
        <SelectItem value="pie">
          <div className="oui:flex oui:items-center oui:gap-2">
            <PieChart className="oui:size-3 oui:text-muted-foreground" />
            Pie
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

// With icon selected
export const WithIconSelected: Story = {
  render: (args) => (
    <Select defaultValue="pie" {...args}>
      <SelectTrigger className="oui:w-[266px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="line">
          <div className="oui:flex oui:items-center oui:gap-2">
            <LineChart className="oui:size-3 oui:text-muted-foreground" />
            Line
          </div>
        </SelectItem>
        <SelectItem value="bar">
          <div className="oui:flex oui:items-center oui:gap-2">
            <BarChart3 className="oui:size-3 oui:text-muted-foreground" />
            Bar
          </div>
        </SelectItem>
        <SelectItem value="pie">
          <div className="oui:flex oui:items-center oui:gap-2">
            <PieChart className="oui:size-3 oui:text-muted-foreground" />
            Pie
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

// With groups and labels
export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="oui:w-[250px]">
        <SelectValue placeholder="Select a technology" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend Frameworks</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend Frameworks</SelectLabel>
          <SelectItem value="express">Express</SelectItem>
          <SelectItem value="fastify">Fastify</SelectItem>
          <SelectItem value="nestjs">NestJS</SelectItem>
          <SelectItem value="koa">Koa</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Databases</SelectLabel>
          <SelectItem value="postgresql">PostgreSQL</SelectItem>
          <SelectItem value="mysql">MySQL</SelectItem>
          <SelectItem value="mongodb">MongoDB</SelectItem>
          <SelectItem value="redis">Redis</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// Form integration example
export const FormIntegration: Story = {
  render: (args) => (
    <div className="oui:w-[300px] oui:space-y-4">
      <div className="oui:space-y-2">
        <label htmlFor="country-select" className="oui:text-sm oui:font-medium">
          Country
        </label>
        <Select {...args}>
          <SelectTrigger id="country-select" className="oui:w-full">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
        <p className="oui:text-sm oui:text-muted-foreground">
          Select your country for shipping options
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// Long list with scrolling
export const LongList: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="oui:w-[200px]">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new-york">New York</SelectItem>
        <SelectItem value="los-angeles">Los Angeles</SelectItem>
        <SelectItem value="chicago">Chicago</SelectItem>
        <SelectItem value="houston">Houston</SelectItem>
        <SelectItem value="phoenix">Phoenix</SelectItem>
        <SelectItem value="philadelphia">Philadelphia</SelectItem>
        <SelectItem value="san-antonio">San Antonio</SelectItem>
        <SelectItem value="san-diego">San Diego</SelectItem>
        <SelectItem value="dallas">Dallas</SelectItem>
        <SelectItem value="san-jose">San Jose</SelectItem>
        <SelectItem value="austin">Austin</SelectItem>
        <SelectItem value="jacksonville">Jacksonville</SelectItem>
        <SelectItem value="fort-worth">Fort Worth</SelectItem>
        <SelectItem value="columbus">Columbus</SelectItem>
        <SelectItem value="charlotte">Charlotte</SelectItem>
        <SelectItem value="san-francisco">San Francisco</SelectItem>
        <SelectItem value="indianapolis">Indianapolis</SelectItem>
        <SelectItem value="seattle">Seattle</SelectItem>
        <SelectItem value="denver">Denver</SelectItem>
        <SelectItem value="washington">Washington DC</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Showcase stories
export const AllSizes: Story = {
  render: () => (
    <div className="oui:flex oui:items-center oui:gap-4">
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Small</label>
        <Select defaultValue="react">
          <SelectTrigger size="sm" className="oui:w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Default</label>
        <Select defaultValue="vue">
          <SelectTrigger className="oui:w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'All available select sizes displayed together.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-6">
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Default</label>
        <Select>
          <SelectTrigger className="oui:w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">With Value</label>
        <Select defaultValue="selected">
          <SelectTrigger className="oui:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="selected">Selected Option</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Disabled</label>
        <Select disabled>
          <SelectTrigger className="oui:w-[180px]">
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'All available select states displayed together.',
      },
    },
  },
};