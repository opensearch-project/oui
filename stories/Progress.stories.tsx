import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '@/components';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value as a percentage (0-100)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'md', 'lg'],
      description: 'The size of the progress bar',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the progress bar',
    },
  },
  args: {
    value: 50,
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress
export const Default: Story = {
  args: {
    value: 65,
  },
};

// Progress values
export const Empty: Story = {
  args: {
    value: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with no progress (0%)',
      },
    },
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 25% completion',
      },
    },
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 50% completion',
      },
    },
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 75% completion',
      },
    },
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 100% completion',
      },
    },
  },
};

// Size variations
export const Small: Story = {
  args: {
    value: 60,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small progress bar (h-1, w-64)',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    value: 60,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium progress bar (h-3, w-80)',
      },
    },
  },
};

export const Large: Story = {
  args: {
    value: 60,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large progress bar (h-4, w-80)',
      },
    },
  },
};

// Contextual examples
export const FileUpload: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <div className="oui:flex oui:justify-between oui:text-sm oui:w-80">
        <span>Uploading document.pdf</span>
        <span>73%</span>
      </div>
      <Progress value={73} />
      <div className="oui:text-xs oui:text-muted-foreground oui:w-80">
        2.1 MB of 2.9 MB uploaded
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bar in a file upload context with labels and status',
      },
    },
  },
};

export const TaskCompletion: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <div className="oui:flex oui:justify-between oui:text-sm oui:font-medium oui:w-80">
        <span>Project Setup</span>
        <span>4 of 6 tasks</span>
      </div>
      <Progress value={67} />
      <div className="oui:text-xs oui:text-muted-foreground oui:w-80">
        2 tasks remaining
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bar showing task completion status',
      },
    },
  },
};

export const ProfileCompletion: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <div className="oui:flex oui:justify-between oui:text-sm oui:font-medium oui:w-80">
        <span>Profile Completion</span>
        <span>85%</span>
      </div>
      <Progress value={85} />
      <div className="oui:text-xs oui:text-muted-foreground oui:w-80">
        Add phone number to complete your profile
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bar for profile completion with next step guidance',
      },
    },
  },
};

// Showcase stories
export const AllValues: Story = {
  render: () => (
    <div className="oui:space-y-4">
      <div className="oui:space-y-2">
        <div className="oui:text-sm">0% - Not started</div>
        <Progress value={0} />
      </div>
      <div className="oui:space-y-2">
        <div className="oui:text-sm">25% - Getting started</div>
        <Progress value={25} />
      </div>
      <div className="oui:space-y-2">
        <div className="oui:text-sm">50% - Halfway there</div>
        <Progress value={50} />
      </div>
      <div className="oui:space-y-2">
        <div className="oui:text-sm">75% - Almost done</div>
        <Progress value={75} />
      </div>
      <div className="oui:space-y-2">
        <div className="oui:text-sm">100% - Complete</div>
        <Progress value={100} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All progress values from 0% to 100% with contextual labels',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="oui:space-y-6">
      <div className="oui:space-y-2">
        <div className="oui:text-sm oui:font-medium">Small (h-1, w-64)</div>
        <Progress value={60} size="sm" />
      </div>
      <div className="oui:space-y-2">
        <div className="oui:text-sm oui:font-medium">Default (h-2, w-80)</div>
        <Progress value={60} size="default" />
      </div>
      <div className="oui:space-y-2">
        <div className="oui:text-sm oui:font-medium">Medium (h-3, w-80)</div>
        <Progress value={60} size="md" />
      </div>
      <div className="oui:space-y-2">
        <div className="oui:text-sm oui:font-medium">Large (h-4, w-80)</div>
        <Progress value={60} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available progress bar sizes with their dimensions',
      },
    },
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="oui:space-y-8">
      {/* Installation Progress */}
      <div className="oui:space-y-2">
        <div className="oui:flex oui:justify-between oui:text-sm oui:font-medium oui:w-80">
          <span>Installing Dependencies</span>
          <span>Installing...</span>
        </div>
        <Progress value={42} />
        <div className="oui:text-xs oui:text-muted-foreground oui:w-80">
          Installing react-router-dom (127 of 302 packages)
        </div>
      </div>

      {/* Download Progress */}
      <div className="oui:space-y-2">
        <div className="oui:flex oui:justify-between oui:text-sm oui:font-medium oui:w-80">
          <span>Downloading Update</span>
          <span>89%</span>
        </div>
        <Progress value={89} />
        <div className="oui:text-xs oui:text-muted-foreground oui:w-80">
          156.7 MB of 176.2 MB • 2 minutes remaining
        </div>
      </div>

      {/* Onboarding Progress */}
      <div className="oui:space-y-2">
        <div className="oui:flex oui:justify-between oui:text-sm oui:font-medium oui:w-80">
          <span>Account Setup</span>
          <span>Step 3 of 5</span>
        </div>
        <Progress value={60} />
        <div className="oui:text-xs oui:text-muted-foreground oui:w-80">
          Next: Verify your email address
        </div>
      </div>

      {/* Skill Assessment */}
      <div className="oui:space-y-2">
        <div className="oui:flex oui:justify-between oui:text-sm oui:font-medium oui:w-80">
          <span>JavaScript Proficiency</span>
          <span>Advanced</span>
        </div>
        <Progress value={92} />
        <div className="oui:text-xs oui:text-muted-foreground oui:w-80">
          Based on 15 completed assessments
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world progress bar examples showing various use cases and contexts',
      },
    },
  },
};