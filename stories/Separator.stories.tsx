import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/components';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: { type: 'boolean' },
      description: 'Whether the separator is purely decorative or semantic',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the separator',
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default separator
export const Default: Story = {
  render: (args) => (
    <div className="oui:w-64 oui:space-y-4">
      <div className="oui:text-sm oui:font-medium">Navigation Menu</div>
      <Separator {...args} />
      <div className="oui:text-sm oui:text-muted-foreground">Settings and preferences</div>
    </div>
  ),
};

// Horizontal separator
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="oui:w-80 oui:space-y-4">
      <div className="oui:space-y-2">
        <h3 className="oui:text-lg oui:font-semibold">Account Settings</h3>
        <p className="oui:text-sm oui:text-muted-foreground">Manage your account preferences and security settings.</p>
      </div>
      <Separator {...args} />
      <div className="oui:space-y-2">
        <h3 className="oui:text-lg oui:font-semibold">Notification Preferences</h3>
        <p className="oui:text-sm oui:text-muted-foreground">Choose how you want to be notified about updates.</p>
      </div>
    </div>
  ),
};

// Vertical separator
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="oui:flex oui:h-32 oui:items-center oui:space-x-4">
      <div className="oui:text-center">
        <div className="oui:text-2xl oui:font-bold">1,234</div>
        <div className="oui:text-sm oui:text-muted-foreground">Total Users</div>
      </div>
      <Separator {...args} />
      <div className="oui:text-center">
        <div className="oui:text-2xl oui:font-bold">567</div>
        <div className="oui:text-sm oui:text-muted-foreground">Active Sessions</div>
      </div>
      <Separator {...args} />
      <div className="oui:text-center">
        <div className="oui:text-2xl oui:font-bold">89%</div>
        <div className="oui:text-sm oui:text-muted-foreground">Uptime</div>
      </div>
    </div>
  ),
};

// Non-decorative separator (semantic)
export const Semantic: Story = {
  args: {
    orientation: 'horizontal',
    decorative: false,
  },
  render: (args) => (
    <div className="oui:w-80 oui:space-y-4">
      <section>
        <h2 className="oui:text-xl oui:font-semibold oui:mb-2">Personal Information</h2>
        <div className="oui:space-y-2">
          <div className="oui:text-sm">Name: John Smith</div>
          <div className="oui:text-sm">Email: john.smith@example.com</div>
        </div>
      </section>
      <Separator {...args} />
      <section>
        <h2 className="oui:text-xl oui:font-semibold oui:mb-2">Contact Details</h2>
        <div className="oui:space-y-2">
          <div className="oui:text-sm">Phone: +1 (555) 123-4567</div>
          <div className="oui:text-sm">Address: 123 Main St, City, State</div>
        </div>
      </section>
    </div>
  ),
};

// In navigation context
export const InNavigation: Story = {
  render: () => (
    <div className="oui:w-64 oui:bg-card oui:border oui:rounded-lg oui:p-4">
      <nav className="oui:space-y-2">
        <div className="oui:text-sm oui:font-medium oui:text-foreground">Dashboard</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Overview</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Analytics</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Reports</div>
        
        <Separator className="oui:my-3" />
        
        <div className="oui:text-sm oui:font-medium oui:text-foreground">Projects</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Active Projects</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Archived</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Templates</div>
        
        <Separator className="oui:my-3" />
        
        <div className="oui:text-sm oui:font-medium oui:text-foreground">Settings</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Account</div>
        <div className="oui:text-sm oui:text-muted-foreground oui:hover:text-foreground oui:cursor-pointer">Preferences</div>
      </nav>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators used in navigation menus to group related items.',
      },
    },
  },
};

// In content sections
export const InContent: Story = {
  render: () => (
    <div className="oui:max-w-2xl oui:space-y-6">
      <article className="oui:space-y-4">
        <h1 className="oui:text-2xl oui:font-bold">Getting Started Guide</h1>
        <p className="oui:text-muted-foreground">
          Welcome to our platform! This guide will help you get up and running quickly.
        </p>
        
        <Separator />
        
        <section className="oui:space-y-3">
          <h2 className="oui:text-xl oui:font-semibold">Step 1: Create Your Account</h2>
          <p className="oui:text-sm oui:text-muted-foreground">
            Start by creating your account with a valid email address and secure password.
          </p>
        </section>
        
        <Separator />
        
        <section className="oui:space-y-3">
          <h2 className="oui:text-xl oui:font-semibold">Step 2: Set Up Your Profile</h2>
          <p className="oui:text-sm oui:text-muted-foreground">
            Complete your profile information to personalize your experience.
          </p>
        </section>
        
        <Separator />
        
        <section className="oui:space-y-3">
          <h2 className="oui:text-xl oui:font-semibold">Step 3: Explore Features</h2>
          <p className="oui:text-sm oui:text-muted-foreground">
            Take a tour of the main features and discover what you can accomplish.
          </p>
        </section>
      </article>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators used to divide content sections in articles and documentation.',
      },
    },
  },
};

// Showcase all orientations and contexts
export const AllVariants: Story = {
  render: () => (
    <div className="oui:space-y-8">
      {/* Horizontal separators */}
      <div className="oui:space-y-4">
        <h3 className="oui:text-lg oui:font-semibold">Horizontal Separators</h3>
        <div className="oui:w-80 oui:space-y-4">
          <div className="oui:text-sm">Content above separator</div>
          <Separator orientation="horizontal" />
          <div className="oui:text-sm oui:text-muted-foreground">Content below separator</div>
        </div>
      </div>
      
      {/* Vertical separators */}
      <div className="oui:space-y-4">
        <h3 className="oui:text-lg oui:font-semibold">Vertical Separators</h3>
        <div className="oui:flex oui:h-20 oui:items-center oui:space-x-4">
          <div className="oui:text-sm">Left content</div>
          <Separator orientation="vertical" />
          <div className="oui:text-sm">Middle content</div>
          <Separator orientation="vertical" />
          <div className="oui:text-sm">Right content</div>
        </div>
      </div>
      
      {/* Different contexts */}
      <div className="oui:space-y-4">
        <h3 className="oui:text-lg oui:font-semibold">Usage Contexts</h3>
        <div className="oui:grid oui:grid-cols-1 oui:md:grid-cols-2 oui:gap-6">
          {/* Card with separators */}
          <div className="oui:border oui:rounded-lg oui:p-4 oui:space-y-3">
            <h4 className="oui:font-medium">Project Status</h4>
            <Separator />
            <div className="oui:text-sm oui:text-muted-foreground">Last updated: 2 hours ago</div>
            <div className="oui:text-sm oui:text-muted-foreground">Status: In Progress</div>
          </div>
          
          {/* Stats with vertical separators */}
          <div className="oui:border oui:rounded-lg oui:p-4">
            <div className="oui:flex oui:items-center oui:justify-between">
              <div className="oui:text-center">
                <div className="oui:text-lg oui:font-semibold">42</div>
                <div className="oui:text-xs oui:text-muted-foreground">Tasks</div>
              </div>
              <Separator orientation="vertical" className="oui:h-8" />
              <div className="oui:text-center">
                <div className="oui:text-lg oui:font-semibold">18</div>
                <div className="oui:text-xs oui:text-muted-foreground">Done</div>
              </div>
              <Separator orientation="vertical" className="oui:h-8" />
              <div className="oui:text-center">
                <div className="oui:text-lg oui:font-semibold">24</div>
                <div className="oui:text-xs oui:text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All separator orientations and common usage contexts displayed together.',
      },
    },
  },
};