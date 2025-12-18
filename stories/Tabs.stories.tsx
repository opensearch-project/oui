import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components';
import { Button } from '@/components';
import { Card, CardHeader, CardTitle, CardContent } from '@/components';
import { Badge } from '@/components';
import { Checkbox } from '@/components';

const meta: Meta<typeof Tabs> = {
    title: 'UI/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        defaultValue: {
            control: { type: 'text' },
            description: 'The default active tab value',
        },
        orientation: {
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
            description: 'The orientation of the tabs',
        },
        className: {
            control: { type: 'text' },
            description: 'Additional CSS classes to apply to the tabs container',
        },
        onValueChange: {
            action: 'tab-changed',
            description: 'Callback fired when the active tab changes',
        },
    },
    args: {
        defaultValue: 'overview',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default horizontal tabs with basic content
export const Default: Story = {
    render: (args) => (
        <Tabs {...args} className="oui:w-[400px]">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Get a comprehensive view of your project's current status, recent activity, and key metrics.</p>
                        <div className="oui:mt-4 oui:space-y-2">
                            <div className="oui:flex oui:justify-between">
                                <span>Active Tasks</span>
                                <span className="oui:font-medium">24</span>
                            </div>
                            <div className="oui:flex oui:justify-between">
                                <span>Completed This Week</span>
                                <span className="oui:font-medium">12</span>
                            </div>
                            <div className="oui:flex oui:justify-between">
                                <span>Team Members</span>
                                <span className="oui:font-medium">8</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="analytics" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Track performance metrics and gain insights into your project's progress over time.</p>
                        <div className="oui:mt-4 oui:space-y-3">
                            <div className="oui:flex oui:justify-between oui:items-center">
                                <span>Completion Rate</span>
                                <span className="oui:font-medium oui:text-green-600">87%</span>
                            </div>
                            <div className="oui:flex oui:justify-between oui:items-center">
                                <span>Average Task Time</span>
                                <span className="oui:font-medium">2.3 hours</span>
                            </div>
                            <div className="oui:flex oui:justify-between oui:items-center">
                                <span>Productivity Score</span>
                                <span className="oui:font-medium oui:text-blue-600">94/100</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="reports" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Reports & Exports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Generate detailed reports and export data for analysis and sharing with stakeholders.</p>
                        <div className="oui:mt-4 oui:space-y-3">
                            <Button variant="outline" className="oui:w-full oui:justify-start">
                                📊 Weekly Progress Report
                            </Button>
                            <Button variant="outline" className="oui:w-full oui:justify-start">
                                📈 Performance Analytics
                            </Button>
                            <Button variant="outline" className="oui:w-full oui:justify-start">
                                📋 Task Summary Export
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="notifications" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Manage how and when you receive updates about project activities and milestones.</p>
                        <div className="oui:mt-4 oui:space-y-3">
                            <div className="oui:flex oui:items-center oui:justify-between">
                                <span>Email Notifications</span>
                                <Checkbox defaultChecked />
                            </div>
                            <div className="oui:flex oui:items-center oui:justify-between">
                                <span>Push Notifications</span>
                                <Checkbox />
                            </div>
                            <div className="oui:flex oui:items-center oui:justify-between">
                                <span>Weekly Digest</span>
                                <Checkbox defaultChecked />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    ),
};

// Vertical orientation tabs
export const Vertical: Story = {
    render: (args) => (
        <Tabs {...args} orientation="vertical" className="oui:flex oui:w-[600px] oui:h-[400px]">
            <TabsList className="oui:flex-col oui:h-fit oui:w-[200px] oui:mr-4">
                <TabsTrigger value="account" className="oui:w-full oui:justify-start">
                    Account Settings
                </TabsTrigger>
                <TabsTrigger value="security" className="oui:w-full oui:justify-start">
                    Security & Privacy
                </TabsTrigger>
                <TabsTrigger value="billing" className="oui:w-full oui:justify-start">
                    Billing & Usage
                </TabsTrigger>
                <TabsTrigger value="integrations" className="oui:w-full oui:justify-start">
                    Integrations
                </TabsTrigger>
                <TabsTrigger value="support" className="oui:w-full oui:justify-start">
                    Help & Support
                </TabsTrigger>
            </TabsList>
            <div className="oui:flex-1">
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="oui:space-y-4">
                            <div>
                                <label className="oui:text-sm oui:font-medium">Display Name</label>
                                <div className="oui:mt-1 oui:p-2 oui:border oui:rounded-md oui:bg-muted/50">
                                    John Smith
                                </div>
                            </div>
                            <div>
                                <label className="oui:text-sm oui:font-medium">Email Address</label>
                                <div className="oui:mt-1 oui:p-2 oui:border oui:rounded-md oui:bg-muted/50">
                                    john.smith@company.com
                                </div>
                            </div>
                            <div>
                                <label className="oui:text-sm oui:font-medium">Time Zone</label>
                                <div className="oui:mt-1 oui:p-2 oui:border oui:rounded-md oui:bg-muted/50">
                                    Pacific Standard Time (PST)
                                </div>
                            </div>
                            <Button>Update Account</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security & Privacy</CardTitle>
                        </CardHeader>
                        <CardContent className="oui:space-y-4">
                            <div className="oui:space-y-3">
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Two-Factor Authentication</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                    <Button variant="outline" size="sm">Enable</Button>
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Login Notifications</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Get notified of new sign-ins</p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Data Export</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Download your account data</p>
                                    </div>
                                    <Button variant="outline" size="sm">Export</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="billing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing & Usage</CardTitle>
                        </CardHeader>
                        <CardContent className="oui:space-y-4">
                            <div className="oui:space-y-3">
                                <div className="oui:flex oui:justify-between">
                                    <span>Current Plan</span>
                                    <span className="oui:font-medium">Professional</span>
                                </div>
                                <div className="oui:flex oui:justify-between">
                                    <span>Monthly Usage</span>
                                    <span className="oui:font-medium">2,847 / 5,000 requests</span>
                                </div>
                                <div className="oui:flex oui:justify-between">
                                    <span>Next Billing Date</span>
                                    <span className="oui:font-medium">March 15, 2024</span>
                                </div>
                                <div className="oui:flex oui:justify-between">
                                    <span>Amount Due</span>
                                    <span className="oui:font-medium">$29.00</span>
                                </div>
                            </div>
                            <div className="oui:flex oui:gap-2 oui:pt-2">
                                <Button>Upgrade Plan</Button>
                                <Button variant="outline">View Invoices</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="integrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>Integrations</CardTitle>
                        </CardHeader>
                        <CardContent className="oui:space-y-4">
                            <div className="oui:space-y-3">
                                <div className="oui:flex oui:items-center oui:justify-between oui:p-3 oui:border oui:rounded-md">
                                    <div className="oui:flex oui:items-center oui:gap-3">
                                        <div className="oui:w-8 oui:h-8 oui:bg-blue-100 oui:rounded-md oui:flex oui:items-center oui:justify-center">
                                            <span className="oui:text-blue-600 oui:font-semibold oui:text-sm">S</span>
                                        </div>
                                        <div>
                                            <p className="oui:font-medium">Slack</p>
                                            <p className="oui:text-sm oui:text-muted-foreground">Team communication</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Connected</Button>
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between oui:p-3 oui:border oui:rounded-md">
                                    <div className="oui:flex oui:items-center oui:gap-3">
                                        <div className="oui:w-8 oui:h-8 oui:bg-green-100 oui:rounded-md oui:flex oui:items-center oui:justify-center">
                                            <span className="oui:text-green-600 oui:font-semibold oui:text-sm">G</span>
                                        </div>
                                        <div>
                                            <p className="oui:font-medium">Google Drive</p>
                                            <p className="oui:text-sm oui:text-muted-foreground">File storage and sharing</p>
                                        </div>
                                    </div>
                                    <Button size="sm">Connect</Button>
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between oui:p-3 oui:border oui:rounded-md">
                                    <div className="oui:flex oui:items-center oui:gap-3">
                                        <div className="oui:w-8 oui:h-8 oui:bg-purple-100 oui:rounded-md oui:flex oui:items-center oui:justify-center">
                                            <span className="oui:text-purple-600 oui:font-semibold oui:text-sm">N</span>
                                        </div>
                                        <div>
                                            <p className="oui:font-medium">Notion</p>
                                            <p className="oui:text-sm oui:text-muted-foreground">Documentation and notes</p>
                                        </div>
                                    </div>
                                    <Button size="sm">Connect</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="support">
                    <Card>
                        <CardHeader>
                            <CardTitle>Help & Support</CardTitle>
                        </CardHeader>
                        <CardContent className="oui:space-y-4">
                            <div className="oui:space-y-3">
                                <Button variant="outline" className="oui:w-full oui:justify-start">
                                    📚 Documentation & Guides
                                </Button>
                                <Button variant="outline" className="oui:w-full oui:justify-start">
                                    💬 Contact Support Team
                                </Button>
                                <Button variant="outline" className="oui:w-full oui:justify-start">
                                    🎥 Video Tutorials
                                </Button>
                                <Button variant="outline" className="oui:w-full oui:justify-start">
                                    🐛 Report a Bug
                                </Button>
                                <Button variant="outline" className="oui:w-full oui:justify-start">
                                    💡 Feature Requests
                                </Button>
                            </div>
                            <div className="oui:pt-4 oui:border-t">
                                <p className="oui:text-sm oui:text-muted-foreground">
                                    Need immediate help? Our support team is available 24/7 via live chat.
                                </p>
                                <Button className="oui:mt-2">Start Live Chat</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    ),
    args: {
        defaultValue: 'account',
    },
};

// Compact tabs with minimal content
export const Compact: Story = {
    render: (args) => (
        <Tabs {...args} className="oui:w-[350px]">
            <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="oui:mt-4">
                <div className="oui:space-y-3">
                    <div className="oui:text-2xl oui:font-bold">1,247</div>
                    <p className="oui:text-sm oui:text-muted-foreground">Page views today</p>
                    <div className="oui:text-sm oui:text-green-600">+12% from yesterday</div>
                </div>
            </TabsContent>
            <TabsContent value="week" className="oui:mt-4">
                <div className="oui:space-y-3">
                    <div className="oui:text-2xl oui:font-bold">8,932</div>
                    <p className="oui:text-sm oui:text-muted-foreground">Page views this week</p>
                    <div className="oui:text-sm oui:text-green-600">+8% from last week</div>
                </div>
            </TabsContent>
            <TabsContent value="month" className="oui:mt-4">
                <div className="oui:space-y-3">
                    <div className="oui:text-2xl oui:font-bold">34,521</div>
                    <p className="oui:text-sm oui:text-muted-foreground">Page views this month</p>
                    <div className="oui:text-sm oui:text-red-600">-3% from last month</div>
                </div>
            </TabsContent>
        </Tabs>
    ),
    args: {
        defaultValue: 'today',
    },
};

// Tabs with disabled state
export const WithDisabled: Story = {
    render: (args) => (
        <Tabs {...args} className="oui:w-[400px]">
            <TabsList>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="premium" disabled>
                    Premium Features
                </TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Available Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>These features are currently available and ready to use.</p>
                        <div className="oui:mt-4 oui:space-y-2">
                            <div className="oui:flex oui:items-center oui:gap-2">
                                <div className="oui:w-2 oui:h-2 oui:bg-green-500 oui:rounded-full"></div>
                                <span>Dashboard Analytics</span>
                            </div>
                            <div className="oui:flex oui:items-center oui:gap-2">
                                <div className="oui:w-2 oui:h-2 oui:bg-green-500 oui:rounded-full"></div>
                                <span>Team Collaboration</span>
                            </div>
                            <div className="oui:flex oui:items-center oui:gap-2">
                                <div className="oui:w-2 oui:h-2 oui:bg-green-500 oui:rounded-full"></div>
                                <span>Basic Reporting</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="pending" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>These features are in development and will be available soon.</p>
                        <div className="oui:mt-4 oui:space-y-2">
                            <div className="oui:flex oui:items-center oui:gap-2">
                                <div className="oui:w-2 oui:h-2 oui:bg-yellow-500 oui:rounded-full"></div>
                                <span>Advanced Analytics</span>
                            </div>
                            <div className="oui:flex oui:items-center oui:gap-2">
                                <div className="oui:w-2 oui:h-2 oui:bg-yellow-500 oui:rounded-full"></div>
                                <span>API Integration</span>
                            </div>
                            <div className="oui:flex oui:items-center oui:gap-2">
                                <div className="oui:w-2 oui:h-2 oui:bg-yellow-500 oui:rounded-full"></div>
                                <span>Custom Workflows</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="archived" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Archived Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Previously used features and configurations that have been archived.</p>
                        <div className="oui:mt-4 oui:space-y-2">
                            <div className="oui:flex oui:items-center oui:gap-2 oui:opacity-60">
                                <div className="oui:w-2 oui:h-2 oui:bg-gray-400 oui:rounded-full"></div>
                                <span>Legacy Dashboard</span>
                            </div>
                            <div className="oui:flex oui:items-center oui:gap-2 oui:opacity-60">
                                <div className="oui:w-2 oui:h-2 oui:bg-gray-400 oui:rounded-full"></div>
                                <span>Old Reporting System</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    ),
    args: {
        defaultValue: 'available',
    },
};

// Interactive tabs with state management
export const Interactive: Story = {
    render: (args) => {
        const [activeTab, setActiveTab] = React.useState('dashboard');
        const [notifications, setNotifications] = React.useState(3);

        return (
            <Tabs {...args} value={activeTab} onValueChange={setActiveTab} className="oui:w-[450px]">
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="messages">
                        Messages
                        {notifications > 0 && (
                            <Badge className="oui:ml-2 oui:rounded-full oui:min-w-5 oui:h-5 oui:px-1.5">
                                {notifications}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="oui:mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Welcome back! Here's what's happening with your account today.</p>
                            <div className="oui:mt-4 oui:grid oui:grid-cols-2 oui:gap-4">
                                <div className="oui:p-3 oui:bg-muted/50 oui:rounded-md">
                                    <div className="oui:text-lg oui:font-semibold">24</div>
                                    <div className="oui:text-sm oui:text-muted-foreground">Active Projects</div>
                                </div>
                                <div className="oui:p-3 oui:bg-muted/50 oui:rounded-md">
                                    <div className="oui:text-lg oui:font-semibold">156</div>
                                    <div className="oui:text-sm oui:text-muted-foreground">Completed Tasks</div>
                                </div>
                            </div>
                            <Button
                                className="oui:mt-4"
                                onClick={() => setActiveTab('messages')}
                            >
                                Check Messages
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="messages" className="oui:mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="oui:space-y-3">
                                <div className="oui:p-3 oui:border oui:rounded-md">
                                    <div className="oui:flex oui:justify-between oui:items-start">
                                        <div>
                                            <p className="oui:font-medium">Project Update</p>
                                            <p className="oui:text-sm oui:text-muted-foreground">The design review is complete...</p>
                                        </div>
                                        <span className="oui:text-xs oui:text-muted-foreground">2h ago</span>
                                    </div>
                                </div>
                                <div className="oui:p-3 oui:border oui:rounded-md">
                                    <div className="oui:flex oui:justify-between oui:items-start">
                                        <div>
                                            <p className="oui:font-medium">Team Meeting</p>
                                            <p className="oui:text-sm oui:text-muted-foreground">Don't forget about tomorrow's...</p>
                                        </div>
                                        <span className="oui:text-xs oui:text-muted-foreground">4h ago</span>
                                    </div>
                                </div>
                                <div className="oui:p-3 oui:border oui:rounded-md">
                                    <div className="oui:flex oui:justify-between oui:items-start">
                                        <div>
                                            <p className="oui:font-medium">System Maintenance</p>
                                            <p className="oui:text-sm oui:text-muted-foreground">Scheduled maintenance window...</p>
                                        </div>
                                        <span className="oui:text-xs oui:text-muted-foreground">1d ago</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                className="oui:mt-4 oui:w-full"
                                onClick={() => setNotifications(0)}
                            >
                                Mark All as Read
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="settings" className="oui:mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="oui:space-y-4">
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Email Notifications</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Receive updates via email</p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Dark Mode</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Switch to dark theme</p>
                                    </div>
                                    <Checkbox />
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Auto-save</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Automatically save changes</p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>
                            </div>
                            <Button className="oui:mt-4">Save Settings</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive tabs with state management, notifications, and cross-tab navigation.',
            },
        },
    },
};

// Tabs with icons
export const WithIcons: Story = {
    render: (args) => (
        <Tabs {...args} className="oui:w-[400px]">
            <TabsList>
                <TabsTrigger value="preview" className="oui:gap-2">
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
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M9 8h.01" />
                        <path d="M15 8h.01" />
                        <path d="M9 12h6" />
                        <path d="M9 16h6" />
                    </svg>
                    Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="oui:gap-2">
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
                        <polyline points="16,18 22,12 16,6" />
                        <polyline points="8,6 2,12 8,18" />
                    </svg>
                    Code
                </TabsTrigger>
                <TabsTrigger value="design" className="oui:gap-2">
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
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Design
                </TabsTrigger>
                <TabsTrigger value="settings" className="oui:gap-2">
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
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    Settings
                </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>See your component in action with real-time updates and interactive elements.</p>
                        <div className="oui:mt-4 oui:p-4 oui:border-2 oui:border-dashed oui:border-muted-foreground/25 oui:rounded-md oui:bg-muted/10">
                            <div className="oui:flex oui:items-center oui:justify-center oui:h-32">
                                <div className="oui:text-center">
                                    <div className="oui:w-16 oui:h-16 oui:bg-primary/10 oui:rounded-lg oui:flex oui:items-center oui:justify-center oui:mx-auto oui:mb-2">
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
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10,17 15,12 10,7" />
                                            <line x1="15" x2="3" y1="12" y2="12" />
                                        </svg>
                                    </div>
                                    <p className="oui:text-sm oui:text-muted-foreground">Component Preview Area</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="code" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Source Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>View and edit the component's source code with syntax highlighting and formatting.</p>
                        <div className="oui:mt-4 oui:p-4 oui:bg-muted/50 oui:rounded-md oui:font-mono oui:text-sm">
                            <div className="oui:space-y-1">
                                <div><span className="oui:text-blue-600">import</span> <span className="oui:text-green-600">React</span> <span className="oui:text-blue-600">from</span> <span className="oui:text-orange-600">'react'</span>;</div>
                                <div></div>
                                <div><span className="oui:text-blue-600">export</span> <span className="oui:text-blue-600">function</span> <span className="oui:text-purple-600">MyComponent</span>() {`{`}</div>
                                <div className="oui:ml-4"><span className="oui:text-blue-600">return</span> (</div>
                                <div className="oui:ml-8">&lt;<span className="oui:text-red-600">div</span> <span className="oui:text-green-600">className</span>=<span className="oui:text-orange-600">"container"</span>&gt;</div>
                                <div className="oui:ml-12">Hello World!</div>
                                <div className="oui:ml-8">&lt;/<span className="oui:text-red-600">div</span>&gt;</div>
                                <div className="oui:ml-4">);</div>
                                <div>{`}`}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="design" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Design Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Design tokens, spacing, colors, and typography specifications for the component.</p>
                        <div className="oui:mt-4 oui:space-y-4">
                            <div className="oui:grid oui:grid-cols-2 oui:gap-4">
                                <div className="oui:p-3 oui:bg-muted/50 oui:rounded-md">
                                    <div className="oui:text-sm oui:font-medium">Colors</div>
                                    <div className="oui:mt-2 oui:space-y-1">
                                        <div className="oui:flex oui:items-center oui:gap-2">
                                            <div className="oui:w-4 oui:h-4 oui:bg-primary oui:rounded"></div>
                                            <span className="oui:text-xs">Primary</span>
                                        </div>
                                        <div className="oui:flex oui:items-center oui:gap-2">
                                            <div className="oui:w-4 oui:h-4 oui:bg-secondary oui:rounded"></div>
                                            <span className="oui:text-xs">Secondary</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="oui:p-3 oui:bg-muted/50 oui:rounded-md">
                                    <div className="oui:text-sm oui:font-medium">Spacing</div>
                                    <div className="oui:mt-2 oui:space-y-1">
                                        <div className="oui:text-xs">Padding: 8px</div>
                                        <div className="oui:text-xs">Margin: 4px</div>
                                        <div className="oui:text-xs">Gap: 8px</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="settings" className="oui:mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Component Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Configure component properties, variants, and behavior options.</p>
                        <div className="oui:mt-4 oui:space-y-4">
                            <div className="oui:space-y-3">
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Show Grid</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Display alignment grid</p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Auto-refresh</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Update preview automatically</p>
                                    </div>
                                    <Checkbox />
                                </div>
                                <div className="oui:flex oui:items-center oui:justify-between">
                                    <div>
                                        <p className="oui:font-medium">Dark Mode</p>
                                        <p className="oui:text-sm oui:text-muted-foreground">Switch to dark theme</p>
                                    </div>
                                    <Checkbox />
                                </div>
                            </div>
                            <div className="oui:pt-4 oui:border-t">
                                <Button>Apply Settings</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    ),
    args: {
        defaultValue: 'preview',
    },
};

// Showcase story displaying different tab configurations
export const AllVariants: Story = {
    render: () => (
        <div className="oui:space-y-8 oui:max-w-4xl">
            {/* Horizontal tabs */}
            <div>
                <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Horizontal Tabs</h3>
                <Tabs defaultValue="tab1" className="oui:w-[400px]">
                    <TabsList>
                        <TabsTrigger value="tab1">Overview</TabsTrigger>
                        <TabsTrigger value="tab2">Details</TabsTrigger>
                        <TabsTrigger value="tab3">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="oui:mt-4">
                        <div className="oui:p-4 oui:border oui:rounded-md">
                            <p>Overview content with project summary and key metrics.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="tab2" className="oui:mt-4">
                        <div className="oui:p-4 oui:border oui:rounded-md">
                            <p>Detailed information and comprehensive data analysis.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="tab3" className="oui:mt-4">
                        <div className="oui:p-4 oui:border oui:rounded-md">
                            <p>Configuration options and preference settings.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Vertical tabs */}
            <div>
                <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Vertical Tabs</h3>
                <Tabs defaultValue="profile" orientation="vertical" className="oui:flex oui:w-[500px] oui:h-[200px]">
                    <TabsList className="oui:flex-col oui:h-fit oui:w-[150px] oui:mr-4">
                        <TabsTrigger value="profile" className="oui:w-full oui:justify-start">Profile</TabsTrigger>
                        <TabsTrigger value="security" className="oui:w-full oui:justify-start">Security</TabsTrigger>
                        <TabsTrigger value="billing" className="oui:w-full oui:justify-start">Billing</TabsTrigger>
                    </TabsList>
                    <div className="oui:flex-1">
                        <TabsContent value="profile">
                            <div className="oui:p-4 oui:border oui:rounded-md oui:h-full">
                                <h4 className="oui:font-medium oui:mb-2">Profile Settings</h4>
                                <p className="oui:text-sm oui:text-muted-foreground">Manage your personal information and preferences.</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="security">
                            <div className="oui:p-4 oui:border oui:rounded-md oui:h-full">
                                <h4 className="oui:font-medium oui:mb-2">Security Settings</h4>
                                <p className="oui:text-sm oui:text-muted-foreground">Configure authentication and privacy options.</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="billing">
                            <div className="oui:p-4 oui:border oui:rounded-md oui:h-full">
                                <h4 className="oui:font-medium oui:mb-2">Billing Information</h4>
                                <p className="oui:text-sm oui:text-muted-foreground">View usage and manage payment methods.</p>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>

            {/* Compact tabs */}
            <div>
                <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Compact Tabs</h3>
                <Tabs defaultValue="today" className="oui:w-[300px]">
                    <TabsList>
                        <TabsTrigger value="today">Today</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                    <TabsContent value="today" className="oui:mt-4">
                        <div className="oui:text-center oui:p-4">
                            <div className="oui:text-2xl oui:font-bold">1,247</div>
                            <div className="oui:text-sm oui:text-muted-foreground">Views today</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="week" className="oui:mt-4">
                        <div className="oui:text-center oui:p-4">
                            <div className="oui:text-2xl oui:font-bold">8,932</div>
                            <div className="oui:text-sm oui:text-muted-foreground">Views this week</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="month" className="oui:mt-4">
                        <div className="oui:text-center oui:p-4">
                            <div className="oui:text-2xl oui:font-bold">34,521</div>
                            <div className="oui:text-sm oui:text-muted-foreground">Views this month</div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Tabs with disabled state */}
            <div>
                <h3 className="oui:text-lg oui:font-semibold oui:mb-4">With Disabled Tab</h3>
                <Tabs defaultValue="basic" className="oui:w-[350px]">
                    <TabsList>
                        <TabsTrigger value="basic">Basic</TabsTrigger>
                        <TabsTrigger value="premium" disabled>Premium</TabsTrigger>
                        <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic" className="oui:mt-4">
                        <div className="oui:p-4 oui:border oui:rounded-md">
                            <p>Basic plan features and limitations.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="enterprise" className="oui:mt-4">
                        <div className="oui:p-4 oui:border oui:rounded-md">
                            <p>Enterprise plan with advanced features.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Various tab configurations including horizontal, vertical, compact, and disabled states.',
            },
        },
    },
};