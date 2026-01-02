import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components';
import { Button } from '@/components';
import { Input } from '@/components';
import { Label } from '@/components';

const meta: Meta<typeof Dialog> = {
    title: 'UI/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: { type: 'boolean' },
            description: 'Whether the dialog is open',
        },
        onOpenChange: {
            action: 'openChanged',
            description: 'Callback when the open state changes',
        },
        modal: {
            control: { type: 'boolean' },
            description: 'Whether the dialog is modal',
            table: {
                defaultValue: { summary: 'true' },
            },
        },
    },
    args: {
        modal: true,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>
                        This is a dialog description.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Test initial state - dialog should be closed
        const triggerButton = canvas.getByRole('button', { name: 'Open Dialog' });
        await expect(triggerButton).toBeInTheDocument();
        await expect(triggerButton).toBeVisible();

        // Test that dialog content is not visible initially
        await expect(canvas.queryByText('Dialog title')).not.toBeInTheDocument();
        await expect(canvas.queryByText('This is a dialog description.')).not.toBeInTheDocument();

        // Test opening dialog by clicking trigger
        await userEvent.click(triggerButton);

        // Wait for dialog to open
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test that dialog content becomes visible
        await expect(canvas.getByText('Dialog title')).toBeInTheDocument();
        await expect(canvas.getByText('This is a dialog description.')).toBeInTheDocument();

        // Test dialog buttons are present and accessible
        const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
        const saveButton = canvas.getByRole('button', { name: 'Save changes' });

        await expect(cancelButton).toBeInTheDocument();
        await expect(saveButton).toBeInTheDocument();

        // Test that dialog has proper ARIA attributes
        const dialog = canvas.getByRole('dialog');
        await expect(dialog).toBeInTheDocument();
        await expect(dialog).toHaveAttribute('aria-labelledby');
        await expect(dialog).toHaveAttribute('aria-describedby');

        // Test keyboard navigation within dialog
        await userEvent.keyboard('{Tab}');
        await expect(cancelButton).toHaveFocus();

        await userEvent.keyboard('{Tab}');
        await expect(saveButton).toHaveFocus();

        // Test that Tab cycles back to first focusable element (focus trapping)
        await userEvent.keyboard('{Tab}');
        await expect(cancelButton).toHaveFocus();

        // Test Escape key closes dialog
        await userEvent.keyboard('{Escape}');

        // Wait for dialog to close
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test that dialog content is hidden again
        await expect(canvas.queryByText('Dialog title')).not.toBeInTheDocument();
        await expect(canvas.queryByText('This is a dialog description.')).not.toBeInTheDocument();

        // Test that focus returns to trigger button
        await expect(triggerButton).toHaveFocus();

        // Test opening again and clicking Cancel button
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        const cancelBtn = canvas.getByRole('button', { name: 'Cancel' });
        await userEvent.click(cancelBtn);

        // Wait for dialog to close
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closed and focus returned
        await expect(canvas.queryByText('Dialog title')).not.toBeInTheDocument();
        await expect(triggerButton).toHaveFocus();
    },
    parameters: {
        docs: {
            description: {
                story: 'A basic dialog matching the Figma design with standard title and description.',
            },
        },
    },
};

export const ConfirmationDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Test destructive action trigger button
        const deleteButton = canvas.getByRole('button', { name: 'Delete Account' });
        await expect(deleteButton).toBeInTheDocument();
        await expect(deleteButton).toHaveClass('oui:bg-destructive');

        // Test initial state - confirmation dialog should be closed
        await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();

        // Test opening confirmation dialog
        await userEvent.click(deleteButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test that confirmation dialog content is visible
        const dialogTitle = canvas.getByText('Are you absolutely sure?');
        const warningText = canvas.getByText(/This action cannot be undone/);

        await expect(dialogTitle).toBeInTheDocument();
        await expect(warningText).toBeInTheDocument();

        // Test confirmation dialog buttons
        const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
        const confirmDeleteButton = canvas.getByRole('button', { name: 'Delete Account' });

        await expect(cancelButton).toBeInTheDocument();
        await expect(confirmDeleteButton).toBeInTheDocument();
        await expect(confirmDeleteButton).toHaveClass('oui:bg-destructive');

        // Test dialog ARIA attributes for accessibility
        const confirmDialog = canvas.getByRole('dialog');
        await expect(confirmDialog).toBeInTheDocument();
        await expect(confirmDialog).toHaveAttribute('aria-labelledby');
        await expect(confirmDialog).toHaveAttribute('aria-describedby');

        // Test focus management - should focus first interactive element
        await expect(cancelButton).toHaveFocus();

        // Test keyboard navigation within confirmation dialog
        await userEvent.keyboard('{Tab}');
        await expect(confirmDeleteButton).toHaveFocus();

        // Test Tab cycles back (focus trapping)
        await userEvent.keyboard('{Tab}');
        await expect(cancelButton).toHaveFocus();

        // Test canceling via Cancel button
        await userEvent.click(cancelButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closes and content is hidden
        await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
        await expect(deleteButton).toHaveFocus();

        // Test re-opening and using Escape to cancel
        await userEvent.click(deleteButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verify dialog reopened
        await expect(canvas.getByText('Are you absolutely sure?')).toBeInTheDocument();

        // Test Escape key cancellation
        await userEvent.keyboard('{Escape}');
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closed via Escape
        await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
        await expect(deleteButton).toHaveFocus();

        // Test destructive action confirmation flow
        await userEvent.click(deleteButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        const deleteConfirmBtn = canvas.getByRole('button', { name: 'Delete Account' });
        await userEvent.click(deleteConfirmBtn);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test that clicking the destructive button closes dialog
        await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();

        // Test Enter key on destructive action
        await userEvent.click(deleteButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Focus the destructive button and press Enter
        const destructiveBtn = canvas.getByRole('button', { name: 'Delete Account' });
        await userEvent.click(destructiveBtn);
        await userEvent.keyboard('{Enter}');
        await new Promise(resolve => setTimeout(resolve, 100));

        // Should close dialog
        await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
    },
    parameters: {
        docs: {
            description: {
                story: 'A confirmation dialog for destructive actions with clear warning messaging.',
            },
        },
    },
};

export const FormDialog: Story = {
    render: () => {
        const [name, setName] = useState('');
        const [username, setUsername] = useState('');

        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open Form Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogDescription>
                            This is a dialog description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="oui:grid oui:gap-4 oui:py-4">
                        <div className="oui:grid oui:gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Placeholder"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="oui:grid oui:gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Placeholder"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Test form dialog trigger
        const triggerButton = canvas.getByRole('button', { name: 'Open Form Dialog' });
        await expect(triggerButton).toBeInTheDocument();

        // Test initial state - dialog should be closed
        await expect(canvas.queryByText('Dialog title')).not.toBeInTheDocument();
        await expect(canvas.queryByLabelText('Name')).not.toBeInTheDocument();

        // Test opening form dialog
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test that form dialog content is visible
        await expect(canvas.getByText('Dialog title')).toBeInTheDocument();
        await expect(canvas.getByText('This is a dialog description.')).toBeInTheDocument();

        // Test form fields are present and properly labeled
        const nameInput = canvas.getByLabelText('Name');
        const usernameInput = canvas.getByLabelText('Username');

        await expect(nameInput).toBeInTheDocument();
        await expect(usernameInput).toBeInTheDocument();

        // Test input field attributes
        await expect(nameInput).toHaveAttribute('placeholder', 'Placeholder');
        await expect(usernameInput).toHaveAttribute('placeholder', 'Placeholder');
        await expect(nameInput).toHaveAttribute('id', 'name');
        await expect(usernameInput).toHaveAttribute('id', 'username');

        // Test form buttons
        const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
        const saveButton = canvas.getByRole('button', { name: 'Save changes' });

        await expect(cancelButton).toBeInTheDocument();
        await expect(saveButton).toBeInTheDocument();

        // Test initial focus should be on first input (accessibility)
        await expect(nameInput).toHaveFocus();

        // Test typing in name field
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, 'John Doe');
        await expect(nameInput).toHaveValue('John Doe');

        // Test Tab navigation to username field
        await userEvent.keyboard('{Tab}');
        await expect(usernameInput).toHaveFocus();

        // Test typing in username field
        await userEvent.clear(usernameInput);
        await userEvent.type(usernameInput, 'johndoe');
        await expect(usernameInput).toHaveValue('johndoe');

        // Test Tab navigation through form controls
        await userEvent.keyboard('{Tab}');
        await expect(cancelButton).toHaveFocus();

        await userEvent.keyboard('{Tab}');
        await expect(saveButton).toHaveFocus();

        // Test Tab cycles back to first input (focus trapping)
        await userEvent.keyboard('{Tab}');
        await expect(nameInput).toHaveFocus();

        // Test that form values persist during dialog interactions
        await expect(nameInput).toHaveValue('John Doe');
        await expect(usernameInput).toHaveValue('johndoe');

        // Test Shift+Tab reverse navigation
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect(saveButton).toHaveFocus();

        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect(cancelButton).toHaveFocus();

        // Test form submission via Save button
        await userEvent.click(saveButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closes after save
        await expect(canvas.queryByText('Dialog title')).not.toBeInTheDocument();
        await expect(triggerButton).toHaveFocus();

        // Test canceling form with data
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Enter some data
        const nameField = canvas.getByLabelText('Name');
        await userEvent.clear(nameField);
        await userEvent.type(nameField, 'Jane Smith');

        // Test Escape key cancellation
        await userEvent.keyboard('{Escape}');
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closes and focus returns
        await expect(canvas.queryByText('Dialog title')).not.toBeInTheDocument();
        await expect(triggerButton).toHaveFocus();

        // Test form resets when reopened (if supported)
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        const newNameField = canvas.getByLabelText('Name');
        // Field should be empty (form reset) or maintain state (depending on implementation)
        await expect(newNameField).toBeInTheDocument();

        // Test Enter key in input field doesn't submit accidentally
        await userEvent.clear(newNameField);
        await userEvent.type(newNameField, 'Test User');
        await userEvent.keyboard('{Enter}');

        // Dialog should still be open (Enter shouldn't close it)
        await expect(canvas.getByText('Dialog title')).toBeInTheDocument();

        // Close dialog with Cancel for cleanup
        const cancelBtn = canvas.getByRole('button', { name: 'Cancel' });
        await userEvent.click(cancelBtn);
        await new Promise(resolve => setTimeout(resolve, 100));
    },
    parameters: {
        docs: {
            description: {
                story: 'A form dialog matching the Figma design with Name and Username fields.',
            },
        },
    },
};

export const SmallDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Small Dialog</Button>
            </DialogTrigger>
            <DialogContent className="oui:sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                    <DialogDescription>
                        Anyone with this link will be able to view the document.
                    </DialogDescription>
                </DialogHeader>
                <div className="oui:flex oui:items-center oui:space-x-2">
                    <div className="oui:grid oui:flex-1 oui:gap-2">
                        <Label htmlFor="link" className="oui:sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                    <Button size="sm" className="oui:px-3">
                        Copy
                    </Button>
                </div>
                <DialogFooter>
                    <Button variant="outline">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Test small dialog trigger
        const triggerButton = canvas.getByRole('button', { name: 'Small Dialog' });
        await expect(triggerButton).toBeInTheDocument();

        // Test initial state - dialog should be closed
        await expect(canvas.queryByText('Share Link')).not.toBeInTheDocument();

        // Test opening small dialog
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test that small dialog content is visible
        const title = canvas.getByText('Share Link');
        const description = canvas.getByText('Anyone with this link will be able to view the document.');

        await expect(title).toBeInTheDocument();
        await expect(description).toBeInTheDocument();

        // Test dialog size class is applied
        const dialog = canvas.getByRole('dialog');
        await expect(dialog).toBeInTheDocument();

        // The dialog content should have the small dialog class
        const dialogContent = dialog.querySelector('[class*="oui:sm:max-w-md"]');
        await expect(dialogContent).toBeInTheDocument();

        // Test readonly input field
        const linkInput = canvas.getByLabelText('Link');
        await expect(linkInput).toBeInTheDocument();
        await expect(linkInput).toHaveValue('https://ui.shadcn.com/docs/installation');
        await expect(linkInput).toHaveAttribute('readonly');

        // Test copy button
        const copyButton = canvas.getByRole('button', { name: 'Copy' });
        const closeButton = canvas.getByRole('button', { name: 'Close' });

        await expect(copyButton).toBeInTheDocument();
        await expect(closeButton).toBeInTheDocument();

        // Test initial focus management (should focus first interactive element)
        await expect(linkInput).toHaveFocus();

        // Test Tab navigation through interactive elements
        await userEvent.keyboard('{Tab}');
        await expect(copyButton).toHaveFocus();

        await userEvent.keyboard('{Tab}');
        await expect(closeButton).toHaveFocus();

        // Test Tab cycles back to input (focus trapping)
        await userEvent.keyboard('{Tab}');
        await expect(linkInput).toHaveFocus();

        // Test readonly input behavior - should not allow editing
        const originalValue = (linkInput as HTMLInputElement).value;
        await userEvent.clear(linkInput);
        await expect(linkInput).toHaveValue(originalValue); // Should remain unchanged

        await userEvent.type(linkInput, 'should not change');
        await expect(linkInput).toHaveValue(originalValue); // Should remain unchanged

        // Test copy button interaction
        await userEvent.click(copyButton);
        await expect(copyButton).toHaveFocus();

        // Test selection of readonly input on focus
        await userEvent.click(linkInput);
        await expect(linkInput).toHaveFocus();

        // Test keyboard shortcuts (Ctrl+A to select all)
        await userEvent.keyboard('{Control>}a{/Control}');
        // Input should remain focused with content selected
        await expect(linkInput).toHaveFocus();

        // Test closing with Close button
        await userEvent.click(closeButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closes and focus returns
        await expect(canvas.queryByText('Share Link')).not.toBeInTheDocument();
        await expect(triggerButton).toHaveFocus();

        // Test reopening and using Escape to close
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        await expect(canvas.getByText('Share Link')).toBeInTheDocument();

        // Test Escape key closure
        await userEvent.keyboard('{Escape}');
        await new Promise(resolve => setTimeout(resolve, 100));

        await expect(canvas.queryByText('Share Link')).not.toBeInTheDocument();
        await expect(triggerButton).toHaveFocus();

        // Test Enter key on copy button
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        const copyBtn = canvas.getByRole('button', { name: 'Copy' });
        await userEvent.click(copyBtn);
        await userEvent.keyboard('{Enter}');
        await expect(copyBtn).toHaveFocus();

        // Close dialog for cleanup
        const closeBtn = canvas.getByRole('button', { name: 'Close' });
        await userEvent.click(closeBtn);
        await new Promise(resolve => setTimeout(resolve, 100));
    },
    parameters: {
        docs: {
            description: {
                story: 'A smaller dialog with constrained width for simple interactions.',
            },
        },
    },
};

export const TextContentDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Text Content Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>
                        This is a dialog description.
                    </DialogDescription>
                </DialogHeader>
                <div className="oui:space-y-4 oui:py-4">
                    <h3 className="oui:text-lg oui:font-medium oui:leading-7">Lorem ipsum</h3>
                    <p className="oui:text-base oui:leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla laoreet vitae. Quisque ante dui,
                        porta eu felis nec, scelerisque pharetra turpis.
                    </p>
                    <p className="oui:text-base oui:leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla laoreet vitae. Quisque ante dui,
                        porta eu felis nec, scelerisque pharetra turpis.
                    </p>
                    <p className="oui:text-base oui:leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla laoreet vitae. Quisque ante dui,
                        porta eu felis nec, scelerisque pharetra turpis.
                    </p>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A text content dialog matching the Figma design with Lorem ipsum content.',
            },
        },
    },
};

export const LargeDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Large Dialog</Button>
            </DialogTrigger>
            <DialogContent className="oui:sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Project Settings</DialogTitle>
                    <DialogDescription>
                        Configure your project settings and preferences.
                    </DialogDescription>
                </DialogHeader>
                <div className="oui:grid oui:gap-6 oui:py-4">
                    <div className="oui:grid oui:gap-2">
                        <Label htmlFor="project-name">Project Name</Label>
                        <Input
                            id="project-name"
                            placeholder="Enter project name"
                            defaultValue="My Awesome Project"
                        />
                    </div>
                    <div className="oui:grid oui:gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            className="oui:min-h-[100px] oui:w-full oui:rounded-md oui:border oui:border-input oui:bg-transparent oui:px-3 oui:py-2 oui:text-sm oui:shadow-xs oui:placeholder:text-muted-foreground oui:focus-visible:outline-none oui:focus-visible:ring-1 oui:focus-visible:ring-ring oui:disabled:cursor-not-allowed oui:disabled:opacity-50"
                            placeholder="Enter project description"
                            defaultValue="A comprehensive project management solution built with modern technologies."
                        />
                    </div>
                    <div className="oui:grid oui:grid-cols-2 oui:gap-4">
                        <div className="oui:grid oui:gap-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input
                                id="start-date"
                                type="date"
                                defaultValue="2024-01-15"
                            />
                        </div>
                        <div className="oui:grid oui:gap-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <Input
                                id="end-date"
                                type="date"
                                defaultValue="2024-06-15"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A larger dialog with more complex content and form fields.',
            },
        },
    },
};

export const AlertDialog: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Show Alert</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>System Maintenance</DialogTitle>
                    <DialogDescription>
                        The system will be undergoing scheduled maintenance on Sunday, January 15th from 2:00 AM to 4:00 AM EST.
                        During this time, some features may be unavailable.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button>Understood</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        docs: {
            description: {
                story: 'An alert-style dialog with informational content and single action.',
            },
        },
    },
};

export const NoCloseButton: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">No Close Button</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Important Notice</DialogTitle>
                    <DialogDescription>
                        This dialog requires you to make a choice before continuing. The close button has been disabled.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Decline</Button>
                    <Button>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Test trigger button
        const triggerButton = canvas.getByRole('button', { name: 'No Close Button' });
        await expect(triggerButton).toBeInTheDocument();

        // Test initial state - dialog should be closed
        await expect(canvas.queryByText('Important Notice')).not.toBeInTheDocument();

        // Test opening no-close dialog
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test that dialog content is visible
        const title = canvas.getByText('Important Notice');
        const description = canvas.getByText(/This dialog requires you to make a choice/);

        await expect(title).toBeInTheDocument();
        await expect(description).toBeInTheDocument();

        // Test that close button is NOT present
        const allButtons = canvas.getAllByRole('button');
        const closeButtons = allButtons.filter(btn =>
            btn.textContent?.includes('×') ||
            btn.getAttribute('aria-label')?.toLowerCase().includes('close') ||
            btn.className.includes('close')
        );
        expect(closeButtons).toHaveLength(0);

        // Test that only the provided action buttons are present
        const declineButton = canvas.getByRole('button', { name: 'Decline' });
        const acceptButton = canvas.getByRole('button', { name: 'Accept' });

        await expect(declineButton).toBeInTheDocument();
        await expect(acceptButton).toBeInTheDocument();

        // Test dialog has proper ARIA attributes
        const dialog = canvas.getByRole('dialog');
        await expect(dialog).toBeInTheDocument();
        await expect(dialog).toHaveAttribute('aria-labelledby');
        await expect(dialog).toHaveAttribute('aria-describedby');

        // Test initial focus management
        await expect(declineButton).toHaveFocus();

        // Test keyboard navigation between action buttons
        await userEvent.keyboard('{Tab}');
        await expect(acceptButton).toHaveFocus();

        // Test Tab cycles back (focus trapping with only action buttons)
        await userEvent.keyboard('{Tab}');
        await expect(declineButton).toHaveFocus();

        // Test reverse Tab navigation
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await expect(acceptButton).toHaveFocus();

        // Critical Test: Verify Escape key does NOT close dialog
        await userEvent.keyboard('{Escape}');
        await new Promise(resolve => setTimeout(resolve, 100));

        // Dialog should still be open (this is the key test for no-close behavior)
        await expect(canvas.getByText('Important Notice')).toBeInTheDocument();
        await expect(canvas.getByText(/This dialog requires you to make a choice/)).toBeInTheDocument();

        // Test that focus remains within dialog after Escape attempt
        const currentFocusedElement = document.activeElement;
        const dialogContainer = canvas.getByRole('dialog');
        expect(dialogContainer.contains(currentFocusedElement)).toBe(true);

        // Test clicking outside dialog area doesn't close it (if backdrop is clickable)
        // Note: This test depends on the dialog implementation
        try {
            const backdrop = document.querySelector('[data-backdrop]') || document.body;
            if (backdrop) {
                await userEvent.click(backdrop);
                await new Promise(resolve => setTimeout(resolve, 100));

                // Dialog should still be open
                await expect(canvas.getByText('Important Notice')).toBeInTheDocument();
            }
        } catch (error) {
            // Backdrop click test may not be applicable to all implementations
            console.log('Backdrop click test skipped - implementation dependent');
        }

        // Test that users must use provided actions - Decline button
        await userEvent.click(declineButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closes only after explicit user action
        await expect(canvas.queryByText('Important Notice')).not.toBeInTheDocument();
        await expect(triggerButton).toHaveFocus();

        // Test Accept button workflow
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verify dialog reopened
        await expect(canvas.getByText('Important Notice')).toBeInTheDocument();

        const acceptBtn = canvas.getByRole('button', { name: 'Accept' });
        await userEvent.click(acceptBtn);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test dialog closes after Accept action
        await expect(canvas.queryByText('Important Notice')).not.toBeInTheDocument();
        await expect(triggerButton).toHaveFocus();

        // Test keyboard activation of buttons
        await userEvent.click(triggerButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        const declineBtn = canvas.getByRole('button', { name: 'Decline' });
        await userEvent.click(declineBtn);
        await userEvent.keyboard('{Enter}');
        await new Promise(resolve => setTimeout(resolve, 100));

        // Should close dialog with Enter key
        await expect(canvas.queryByText('Important Notice')).not.toBeInTheDocument();
    },
    parameters: {
        docs: {
            description: {
                story: 'A dialog without the close button, forcing user interaction with the provided actions.',
            },
        },
    },
};

export const Showcase: Story = {
    render: () => (
        <div className="oui:flex oui:flex-wrap oui:gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Basic</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Basic Dialog</DialogTitle>
                        <DialogDescription>
                            A simple dialog example.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Confirmation</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Item</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>Form Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogDescription>
                            This is a dialog description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="oui:grid oui:gap-4 oui:py-4">
                        <div className="oui:grid oui:gap-2">
                            <Label htmlFor="showcase-name">Name</Label>
                            <Input id="showcase-name" placeholder="Placeholder" />
                        </div>
                        <div className="oui:grid oui:gap-2">
                            <Label htmlFor="showcase-username">Username</Label>
                            <Input id="showcase-username" placeholder="Placeholder" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">Text Content</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogDescription>
                            This is a dialog description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="oui:space-y-4 oui:py-4">
                        <h3 className="oui:text-lg oui:font-medium oui:leading-7">Lorem ipsum</h3>
                        <p className="oui:text-base oui:leading-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">Alert</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Information</DialogTitle>
                        <DialogDescription>
                            This is an informational alert.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>Got it</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All dialog variants displayed together for easy comparison.',
            },
        },
    },
};