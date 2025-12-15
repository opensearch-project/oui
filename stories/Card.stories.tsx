import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardAction 
} from '@/components';
import { Button } from '@/components';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the card',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the card',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default card with basic structure
export const Default: Story = {
  render: () => (
    <Card className="oui:w-[350px]">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Update your personal information, change your password, and configure notification preferences.</p>
      </CardContent>
      <CardFooter>
        <Button>Edit Profile</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with action button in header
export const WithHeaderAction: Story = {
  render: () => (
    <Card className="oui:w-[400px]">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>Track progress and manage project tasks</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Settings</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="oui:space-y-2">
          <div className="oui:flex oui:justify-between">
            <span>Tasks Completed</span>
            <span className="oui:font-medium">24/30</span>
          </div>
          <div className="oui:flex oui:justify-between">
            <span>Team Members</span>
            <span className="oui:font-medium">8</span>
          </div>
          <div className="oui:flex oui:justify-between">
            <span>Due Date</span>
            <span className="oui:font-medium">March 15, 2024</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="oui:gap-2">
        <Button>View Details</Button>
        <Button variant="outline">Share Project</Button>
      </CardFooter>
    </Card>
  ),
};

// Simple card with minimal content
export const Simple: Story = {
  render: () => (
    <Card className="oui:w-[300px]">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="oui:text-2xl oui:font-bold">1,234</div>
        <p className="oui:text-sm oui:text-muted-foreground">Total users this month</p>
      </CardContent>
    </Card>
  ),
};

// Card with rich content and multiple actions
export const RichContent: Story = {
  render: () => (
    <Card className="oui:w-[450px]">
      <CardHeader>
        <CardTitle>Team Collaboration</CardTitle>
        <CardDescription>Streamline your team's workflow and communication</CardDescription>
      </CardHeader>
      <CardContent className="oui:space-y-4">
        <div className="oui:flex oui:items-center oui:space-x-4">
          <div className="oui:w-12 oui:h-12 oui:bg-primary/10 oui:rounded-full oui:flex oui:items-center oui:justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h4 className="oui:font-semibold">Enhanced Collaboration</h4>
            <p className="oui:text-sm oui:text-muted-foreground">Real-time editing and commenting</p>
          </div>
        </div>
        <div className="oui:flex oui:items-center oui:space-x-4">
          <div className="oui:w-12 oui:h-12 oui:bg-primary/10 oui:rounded-full oui:flex oui:items-center oui:justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h4 className="oui:font-semibold">Advanced Analytics</h4>
            <p className="oui:text-sm oui:text-muted-foreground">Track performance and insights</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="oui:gap-2">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with form-like content
export const FormCard: Story = {
  render: () => (
    <Card className="oui:w-[400px]">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your account information and preferences</CardDescription>
      </CardHeader>
      <CardContent className="oui:space-y-4">
        <div className="oui:space-y-2">
          <label className="oui:text-sm oui:font-medium">Email Address</label>
          <div className="oui:p-2 oui:border oui:rounded-md oui:bg-muted/50">
            john.doe@company.com
          </div>
        </div>
        <div className="oui:space-y-2">
          <label className="oui:text-sm oui:font-medium">Notification Preferences</label>
          <div className="oui:space-y-2">
            <div className="oui:flex oui:items-center oui:space-x-2">
              <input type="checkbox" id="email-notifications" defaultChecked />
              <label htmlFor="email-notifications" className="oui:text-sm">Email notifications</label>
            </div>
            <div className="oui:flex oui:items-center oui:space-x-2">
              <input type="checkbox" id="push-notifications" />
              <label htmlFor="push-notifications" className="oui:text-sm">Push notifications</label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="oui:gap-2">
        <Button>Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with bordered sections
export const WithBorders: Story = {
  render: () => (
    <Card className="oui:w-[350px]">
      <CardHeader className="oui:border-b">
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current system health and performance</CardDescription>
      </CardHeader>
      <CardContent className="oui:space-y-3">
        <div className="oui:flex oui:justify-between oui:items-center">
          <span>API Status</span>
          <span className="oui:text-green-600 oui:font-medium">Operational</span>
        </div>
        <div className="oui:flex oui:justify-between oui:items-center">
          <span>Database</span>
          <span className="oui:text-green-600 oui:font-medium">Healthy</span>
        </div>
        <div className="oui:flex oui:justify-between oui:items-center">
          <span>Response Time</span>
          <span className="oui:font-medium">142ms</span>
        </div>
      </CardContent>
      <CardFooter className="oui:border-t oui:gap-2">
        <Button variant="outline" className="oui:flex-1">View Details</Button>
        <Button variant="outline" className="oui:flex-1">Refresh</Button>
      </CardFooter>
    </Card>
  ),
};

// Showcase story displaying different card layouts
export const AllLayouts: Story = {
  render: () => (
    <div className="oui:grid oui:grid-cols-1 oui:md:grid-cols-2 oui:lg:grid-cols-3 oui:gap-6 oui:max-w-6xl">
      {/* Simple card */}
      <Card>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Basic card with minimal content.</p>
        </CardContent>
      </Card>

      {/* Card with footer */}
      <Card>
        <CardHeader>
          <CardTitle>With Footer</CardTitle>
          <CardDescription>Card including footer actions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates footer usage.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>

      {/* Card with header action */}
      <Card>
        <CardHeader>
          <CardTitle>Header Action</CardTitle>
          <CardDescription>Card with action in header</CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">⋯</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Action button positioned in header.</p>
        </CardContent>
      </Card>

      {/* Card with borders */}
      <Card>
        <CardHeader className="oui:border-b">
          <CardTitle>With Borders</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Sections separated by borders.</p>
        </CardContent>
        <CardFooter className="oui:border-t">
          <Button variant="outline" size="sm">View</Button>
        </CardFooter>
      </Card>

      {/* Rich content card */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Content</CardTitle>
          <CardDescription>Complex layout example</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="oui:flex oui:items-center oui:gap-3">
            <div className="oui:w-8 oui:h-8 oui:bg-primary/10 oui:rounded-full"></div>
            <div>
              <p className="oui:font-medium">Feature</p>
              <p className="oui:text-sm oui:text-muted-foreground">Description</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="oui:gap-2">
          <Button size="sm">Primary</Button>
          <Button variant="outline" size="sm">Secondary</Button>
        </CardFooter>
      </Card>

      {/* Stats card */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="oui:text-3xl oui:font-bold">2,847</div>
          <p className="oui:text-sm oui:text-muted-foreground">Active users</p>
        </CardContent>
      </Card>

      {/* Image card */}
      <Card>
        <CardHeader>
          <CardTitle>Server Monitor</CardTitle>
        </CardHeader>
        <CardContent className="oui:p-0">
          <div className="oui:aspect-video oui:w-full oui:bg-gradient-to-br oui:from-green-500 oui:to-blue-600 oui:flex oui:items-center oui:justify-center">
            <div className="oui:text-white oui:text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="oui:mx-auto oui:mb-1"
              >
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
              <p className="oui:text-xs oui:opacity-90">Chart</p>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <p className="oui:text-sm">Performance monitoring with charts.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">View</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various card layouts and content structures displayed together.',
      },
    },
  },
};

// Interactive card with state management
export const Interactive: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    return (
      <Card className="oui:w-[400px]">
        <CardHeader>
          <CardTitle>Expandable Content</CardTitle>
          <CardDescription>Click to expand and see more details</CardDescription>
          <CardAction>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '−' : '+'}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates interactive behavior.</p>
          {isExpanded && (
            <div className="oui:mt-4 oui:p-3 oui:bg-muted/50 oui:rounded-md">
              <h4 className="oui:font-medium oui:mb-2">Additional Details</h4>
              <p className="oui:text-sm oui:text-muted-foreground">
                This expanded section shows how cards can contain dynamic content 
                that responds to user interactions. You can include forms, lists, 
                or any other content that enhances the user experience.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </CardFooter>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive card with expandable content and state management.',
      },
    },
  },
};

// Card with image content
export const WithImage: Story = {
  render: () => (
    <Card className="oui:w-[350px]">
      <CardHeader>
        <CardTitle>Server Performance</CardTitle>
        <CardDescription>Real-time monitoring dashboard for production servers</CardDescription>
      </CardHeader>
      <CardContent className="oui:p-0">
        <div className="oui:aspect-video oui:w-full oui:bg-gradient-to-br oui:from-green-500 oui:to-blue-600 oui:flex oui:items-center oui:justify-center">
          <div className="oui:text-white oui:text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="oui:mx-auto oui:mb-2"
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            <p className="oui:text-sm oui:opacity-90">Performance Chart</p>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="oui:space-y-3">
          <div className="oui:flex oui:justify-between oui:items-center">
            <span>CPU Usage</span>
            <span className="oui:font-medium oui:text-green-600">23%</span>
          </div>
          <div className="oui:flex oui:justify-between oui:items-center">
            <span>Memory</span>
            <span className="oui:font-medium oui:text-yellow-600">67%</span>
          </div>
          <div className="oui:flex oui:justify-between oui:items-center">
            <span>Disk I/O</span>
            <span className="oui:font-medium oui:text-green-600">12%</span>
          </div>
          <div className="oui:flex oui:justify-between oui:items-center">
            <span>Network</span>
            <span className="oui:font-medium oui:text-green-600">8.2 MB/s</span>
          </div>
          <div className="oui:flex oui:items-center oui:gap-2 oui:pt-2">
            <div className="oui:w-2 oui:h-2 oui:bg-green-500 oui:rounded-full"></div>
            <span className="oui:text-sm oui:text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="oui:gap-2">
        <Button className="oui:flex-1">View Details</Button>
        <Button variant="outline" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Server monitoring card with performance chart and system metrics.',
      },
    },
  },
};