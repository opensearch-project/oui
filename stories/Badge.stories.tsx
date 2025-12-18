import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components';
import { BadgeCheck, Star, AlertTriangle, Shield, Zap } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'verified', 'severity-low', 'severity-med', 'severity-high', 'severity-critical'],
      description: 'The visual style variant of the badge',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Change the default rendered element for the one passed as a child',
    },
  },
  args: {
    children: 'New',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default badge
export const Default: Story = {
  args: {
    children: 'New',
  },
};

// Variant stories
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Draft',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Urgent',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Optional',
  },
};

export const Verified: Story = {
  args: {
    variant: 'verified',
    children: (
      <>
        <BadgeCheck size={12} />
        Verified
      </>
    ),
  },
};

// Severity variant stories
export const SeverityLow: Story = {
  args: {
    variant: 'severity-low',
    children: 'Low Priority',
  },
};

export const SeverityMedium: Story = {
  args: {
    variant: 'severity-med',
    children: 'Medium Priority',
  },
};

export const SeverityHigh: Story = {
  args: {
    variant: 'severity-high',
    children: 'High Priority',
  },
};

export const SeverityCritical: Story = {
  args: {
    variant: 'severity-critical',
    children: 'Critical',
  },
};

// Badge with icons
export const WithIcons: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <Badge variant="default">
        <Star size={12} />
        Featured
      </Badge>
      <Badge variant="verified">
        <BadgeCheck size={12} />
        Verified
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle size={12} />
        Error
      </Badge>
      <Badge variant="secondary">
        <Shield size={12} />
        Protected
      </Badge>
      <Badge variant="severity-high">
        <Zap size={12} />
        Urgent
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with contextually appropriate icons.',
      },
    },
  },
};

// Showcase stories
export const AllVariants: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <Badge variant="default">New</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="destructive">Urgent</Badge>
      <Badge variant="outline">Optional</Badge>
      <Badge variant="verified">
        <BadgeCheck size={12} />
        Verified
      </Badge>
      <Badge variant="severity-low">Low</Badge>
      <Badge variant="severity-med">Medium</Badge>
      <Badge variant="severity-high">High</Badge>
      <Badge variant="severity-critical">Critical</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants displayed together with contextually appropriate content.',
      },
    },
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="outline">Inactive</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="verified">
        <BadgeCheck size={12} />
        Completed
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common status badges used in applications.',
      },
    },
  },
};

export const PriorityBadges: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <Badge variant="severity-low">Low Priority</Badge>
      <Badge variant="severity-med">Medium Priority</Badge>
      <Badge variant="severity-high">High Priority</Badge>
      <Badge variant="severity-critical">
        <AlertTriangle size={12} />
        Critical
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Priority level badges for task management and issue tracking.',
      },
    },
  },
};