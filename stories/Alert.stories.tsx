import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertTitle, AlertDescription } from '@/components';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Alert> = {
    title: 'UI/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'destructive'],
            description: 'The visual style variant of the alert',
        },
    },
    args: {
        variant: 'default',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default alert
export const Default: Story = {
    render: (args) => (
        <Alert {...args}>
            <Info />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
                Your account has been successfully updated. Changes will take effect within 24 hours.
            </AlertDescription>
        </Alert>
    ),
};

// Variant stories
export const Destructive: Story = {
    render: (args) => (
        <Alert {...args} variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Unable to save changes. Please check your internet connection and try again.
            </AlertDescription>
        </Alert>
    ),
};

// Alert without icon
export const WithoutIcon: Story = {
    render: (args) => (
        <Alert {...args}>
            <AlertTitle>System Maintenance</AlertTitle>
            <AlertDescription>
                Scheduled maintenance will occur on Sunday, March 15th from 2:00 AM to 4:00 AM EST.
            </AlertDescription>
        </Alert>
    ),
};

// Alert with only description
export const DescriptionOnly: Story = {
    render: (args) => (
        <Alert {...args}>
            <Info />
            <AlertDescription>
                New features are now available in your dashboard. Explore the updated interface to discover enhanced functionality.
            </AlertDescription>
        </Alert>
    ),
};

// Success alert (using default variant with success styling)
export const Success: Story = {
    render: (args) => (
        <Alert {...args}>
            <CheckCircle />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
                Your payment has been processed successfully. A confirmation email has been sent to your registered email address.
            </AlertDescription>
        </Alert>
    ),
};

// Warning alert (using default variant with warning styling)
export const Warning: Story = {
    render: (args) => (
        <Alert {...args}>
            <AlertTriangle />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
                Your subscription expires in 3 days. Renew now to avoid service interruption.
            </AlertDescription>
        </Alert>
    ),
};

// Showcase stories
export const AllVariants: Story = {
    render: () => (
        <div className="oui:space-y-4 oui:w-full oui:max-w-md">
            <Alert variant="default">
                <Info />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                    Your account settings have been updated successfully.
                </AlertDescription>
            </Alert>

            <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Unable to process your request. Please try again later.
                </AlertDescription>
            </Alert>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All available alert variants displayed together with contextually appropriate content.',
            },
        },
    },
};

export const AlertTypes: Story = {
    render: () => (
        <div className="oui:space-y-4 oui:w-full oui:max-w-md">
            <Alert>
                <CheckCircle />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                    Your changes have been saved successfully.
                </AlertDescription>
            </Alert>

            <Alert>
                <Info />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                    New features are available in your dashboard.
                </AlertDescription>
            </Alert>

            <Alert>
                <AlertTriangle />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                    Your session will expire in 5 minutes.
                </AlertDescription>
            </Alert>

            <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to connect to the server. Check your connection.
                </AlertDescription>
            </Alert>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common alert types used in applications for different message categories.',
            },
        },
    },
};

export const AlertStructures: Story = {
    render: () => (
        <div className="oui:space-y-4 oui:w-full oui:max-w-md">
            <Alert>
                <Info />
                <AlertTitle>With Title and Description</AlertTitle>
                <AlertDescription>
                    This alert includes both a title and detailed description for comprehensive messaging.
                </AlertDescription>
            </Alert>

            <Alert>
                <AlertTitle>Title Only</AlertTitle>
            </Alert>

            <Alert>
                <Info />
                <AlertDescription>
                    Description only alert without a title, useful for simple notifications.
                </AlertDescription>
            </Alert>

            <Alert>
                <AlertDescription>
                    Minimal alert without icon or title for subtle messaging.
                </AlertDescription>
            </Alert>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different structural variations of alerts showing flexible content organization.',
            },
        },
    },
};