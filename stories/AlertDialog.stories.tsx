import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components';
import { Button } from '@/components';

const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the alert dialog is open',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback fired when the open state changes',
    },
  },
  args: {
    open: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state - alert dialog should be closed
    const triggerButton = canvas.getByRole('button', { name: 'Delete Account' });
    await expect(triggerButton).toBeInTheDocument();
    await expect(triggerButton).toBeVisible();

    // Test that alert dialog content is not visible initially
    await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
    await expect(canvas.queryByText(/This action cannot be undone/)).not.toBeInTheDocument();

    // Test opening alert dialog by clicking trigger
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that alert dialog content becomes visible
    const alertTitle = canvas.getByText('Are you absolutely sure?');
    const warningText = canvas.getByText(/This action cannot be undone/);

    await expect(alertTitle).toBeInTheDocument();
    await expect(warningText).toBeInTheDocument();

    // Test alert dialog buttons are present and accessible
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
    const continueButton = canvas.getByRole('button', { name: 'Continue' });

    await expect(cancelButton).toBeInTheDocument();
    await expect(continueButton).toBeInTheDocument();

    // Test that alert dialog has proper ARIA attributes
    const alertDialog = canvas.getByRole('alertdialog') || canvas.getByRole('dialog');
    await expect(alertDialog).toBeInTheDocument();

    // Test focus management - focus should be on first interactive element
    // Alert dialogs typically focus cancel button (safer default)
    await expect(cancelButton).toHaveFocus();

    // Test keyboard navigation within alert dialog
    await userEvent.keyboard('{Tab}');
    await expect(continueButton).toHaveFocus();

    // Test that Tab cycles back to first focusable element (focus trapping)
    await userEvent.keyboard('{Tab}');
    await expect(cancelButton).toHaveFocus();

    // Test Shift+Tab reverse navigation
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await expect(continueButton).toHaveFocus();

    // Test Escape key closes alert dialog
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that alert dialog content is hidden again
    await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
    await expect(canvas.queryByText(/This action cannot be undone/)).not.toBeInTheDocument();

    // Test that focus returns to trigger button
    await expect(triggerButton).toHaveFocus();

    // Test opening again and clicking Cancel button
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const cancelBtn = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelBtn);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test dialog closed and focus returned
    await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
    await expect(triggerButton).toHaveFocus();

    // Test opening again and clicking Continue button
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify dialog reopened
    await expect(canvas.getByText('Are you absolutely sure?')).toBeInTheDocument();

    const continueBtn = canvas.getByRole('button', { name: 'Continue' });
    await userEvent.click(continueBtn);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that clicking Continue closes the dialog
    await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
    await expect(triggerButton).toHaveFocus();

    // Test Enter key on Cancel button
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const enterCancelBtn = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(enterCancelBtn);
    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should close dialog
    await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();

    // Test Enter key on Continue button
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const enterContinueBtn = canvas.getByRole('button', { name: 'Continue' });
    await userEvent.click(enterContinueBtn);
    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should close dialog
    await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();

    // Test Space key activation
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const spaceCancelBtn = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(spaceCancelBtn);
    await userEvent.keyboard(' ');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should close dialog
    await expect(canvas.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic alert dialog with confirmation and cancel actions.',
      },
    },
  },
};

export const DestructiveAction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this project? This action cannot be undone
            and will permanently remove all project data, files, and settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="oui:bg-destructive oui:text-white oui:hover:bg-destructive/90">
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test destructive trigger button styling
    const deleteButton = canvas.getByRole('button', { name: 'Delete Project' });
    await expect(deleteButton).toBeInTheDocument();
    await expect(deleteButton).toHaveClass('oui:bg-destructive');

    // Test initial state - destructive dialog should be closed
    await expect(canvas.queryByText('Delete Project')).not.toBeInTheDocument();

    // Test opening destructive alert dialog
    await userEvent.click(deleteButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that destructive dialog content is visible
    const dialogTitle = canvas.getByText('Delete Project');
    const warningText = canvas.getByText(/Are you sure you want to delete this project/);

    await expect(dialogTitle).toBeInTheDocument();
    await expect(warningText).toBeInTheDocument();

    // Test that warning message mentions irreversible nature
    const permanentWarning = canvas.getByText(/This action cannot be undone/);
    await expect(permanentWarning).toBeInTheDocument();

    // Test destructive dialog buttons
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' });
    const confirmDeleteButton = canvas.getByRole('button', { name: 'Delete Project' });

    await expect(cancelButton).toBeInTheDocument();
    await expect(confirmDeleteButton).toBeInTheDocument();

    // Test that destructive action button has proper styling
    await expect(confirmDeleteButton).toHaveClass('oui:bg-destructive');
    await expect(confirmDeleteButton).toHaveClass('oui:text-white');

    // Test focus management - focus should be on Cancel (safer option)
    await expect(cancelButton).toHaveFocus();

    // Test keyboard navigation between destructive actions
    await userEvent.keyboard('{Tab}');
    await expect(confirmDeleteButton).toHaveFocus();

    // Test that Tab cycles back (focus trapping)
    await userEvent.keyboard('{Tab}');
    await expect(cancelButton).toHaveFocus();

    // Test Shift+Tab reverse navigation
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await expect(confirmDeleteButton).toHaveFocus();

    // Test that destructive action requires explicit intent (no accidental triggers)
    // Focus on destructive button and test Enter key
    await userEvent.click(confirmDeleteButton);
    await expect(confirmDeleteButton).toHaveFocus();

    // Test Enter key on destructive action
    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should close dialog after destructive action
    await expect(canvas.queryByText('Delete Project')).not.toBeInTheDocument();
    await expect(deleteButton).toHaveFocus();

    // Test cancelling destructive action
    await userEvent.click(deleteButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const cancelBtn = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelBtn);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that cancelling returns to safe state
    await expect(canvas.queryByText('Delete Project')).not.toBeInTheDocument();
    await expect(deleteButton).toHaveFocus();

    // Test Escape key cancellation (important for destructive actions)
    await userEvent.click(deleteButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should close and return focus
    await expect(canvas.queryByText('Delete Project')).not.toBeInTheDocument();
    await expect(deleteButton).toHaveFocus();

    // Test Space key on Cancel button (should work)
    await userEvent.click(deleteButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const spaceCancel = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(spaceCancel);
    await userEvent.keyboard(' ');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should close dialog
    await expect(canvas.queryByText('Delete Project')).not.toBeInTheDocument();

    // Test Space key on destructive action button
    await userEvent.click(deleteButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const spaceDestructive = canvas.getByRole('button', { name: 'Delete Project' });
    await userEvent.click(spaceDestructive);
    await userEvent.keyboard(' ');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should execute destructive action and close dialog
    await expect(canvas.queryByText('Delete Project')).not.toBeInTheDocument();

    // Test ARIA attributes for destructive dialog
    await userEvent.click(deleteButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const destructiveDialog = canvas.getByRole('alertdialog') || canvas.getByRole('dialog');
    await expect(destructiveDialog).toBeInTheDocument();

    // Test that destructive nature is conveyed through accessible means
    const dialogTitleElement = canvas.getByText('Delete Project');
    await expect(dialogTitleElement).toBeInTheDocument();

    // Test multiple confirmation attempts to ensure consistent behavior
    const multiCancelBtn = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(multiCancelBtn);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that trigger button maintains destructive styling
    const finalTrigger = canvas.getByRole('button', { name: 'Delete Project' });
    await expect(finalTrigger).toHaveClass('oui:bg-destructive');
    await expect(finalTrigger).toHaveFocus();

    // Test that destructive action dialog can be opened multiple times
    await userEvent.click(finalTrigger);
    await new Promise(resolve => setTimeout(resolve, 100));

    await expect(canvas.getByText('Delete Project')).toBeInTheDocument();

    // Final cleanup
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 100));
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert dialog with a destructive action styled appropriately.',
      },
    },
  },
};

export const SystemMaintenance: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">System Notice</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Scheduled Maintenance</AlertDialogTitle>
          <AlertDialogDescription>
            The system will be undergoing scheduled maintenance on Sunday, January 15th
            from 2:00 AM to 4:00 AM EST. During this time, some features may be unavailable.
            We apologize for any inconvenience.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Understood</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test informational trigger button
    const noticeButton = canvas.getByRole('button', { name: 'System Notice' });
    await expect(noticeButton).toBeInTheDocument();

    // Test initial state - maintenance dialog closed
    await expect(canvas.queryByText('Scheduled Maintenance')).not.toBeInTheDocument();

    // Test opening informational dialog
    await userEvent.click(noticeButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test maintenance dialog content
    const title = canvas.getByText('Scheduled Maintenance');
    const maintenanceInfo = canvas.getByText(/The system will be undergoing/);
    await expect(title).toBeInTheDocument();
    await expect(maintenanceInfo).toBeInTheDocument();

    // Test single acknowledgment button
    const understoodButton = canvas.getByRole('button', { name: 'Understood' });
    await expect(understoodButton).toBeInTheDocument();
    await expect(understoodButton).toHaveFocus();

    // Test keyboard interaction
    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should close dialog
    await expect(canvas.queryByText('Scheduled Maintenance')).not.toBeInTheDocument();
    await expect(noticeButton).toHaveFocus();

    // Test Space key activation
    await userEvent.click(noticeButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const spaceUnderstood = canvas.getByRole('button', { name: 'Understood' });
    await userEvent.click(spaceUnderstood);
    await userEvent.keyboard(' ');
    await new Promise(resolve => setTimeout(resolve, 100));

    await expect(canvas.queryByText('Scheduled Maintenance')).not.toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Informational alert dialog with single acknowledgment action.',
      },
    },
  },
};

export const DataLoss: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Clear All Data</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Data</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all your saved data, preferences, and settings.
            This action cannot be undone. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Data</AlertDialogCancel>
          <AlertDialogAction className="oui:bg-destructive oui:text-white oui:hover:bg-destructive/90">
            Clear All Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test data loss trigger button
    const clearButton = canvas.getByRole('button', { name: 'Clear All Data' });
    await expect(clearButton).toBeInTheDocument();

    // Test opening data loss dialog
    await userEvent.click(clearButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test data loss warning content
    const title = canvas.getByText('Clear All Data');
    const warning = canvas.getByText(/This will permanently delete/);
    await expect(title).toBeInTheDocument();
    await expect(warning).toBeInTheDocument();

    // Test clear action buttons with descriptive labels
    const keepDataButton = canvas.getByRole('button', { name: 'Keep Data' });
    const clearDataButton = canvas.getByRole('button', { name: 'Clear All Data' });

    await expect(keepDataButton).toBeInTheDocument();
    await expect(clearDataButton).toBeInTheDocument();
    await expect(clearDataButton).toHaveClass('oui:bg-destructive');

    // Test focus on safer option
    await expect(keepDataButton).toHaveFocus();

    // Test keyboard navigation and actions
    await userEvent.keyboard('{Tab}');
    await expect(clearDataButton).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 100));

    await expect(canvas.queryByText('Clear All Data')).not.toBeInTheDocument();
    await expect(clearButton).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert dialog warning about data loss with clear action labels.',
      },
    },
  },
};

export const LogoutConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Sign Out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? Any unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay Signed In</AlertDialogCancel>
          <AlertDialogAction>Sign Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signOutButton = canvas.getByRole('button', { name: 'Sign Out' });
    await expect(signOutButton).toBeInTheDocument();

    await userEvent.click(signOutButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const title = canvas.getByText('Sign Out');
    const warning = canvas.getByText(/Any unsaved changes will be lost/);
    await expect(title).toBeInTheDocument();
    await expect(warning).toBeInTheDocument();

    const stayButton = canvas.getByRole('button', { name: 'Stay Signed In' });
    const confirmSignOut = canvas.getByRole('button', { name: 'Sign Out' });

    await expect(stayButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(confirmSignOut).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 100));

    await expect(canvas.queryByText('Sign Out')).not.toBeInTheDocument();
    await expect(signOutButton).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert dialog for logout confirmation with contextual messaging.',
      },
    },
  },
};

export const UnsavedChanges: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Leave Page</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes that will be lost if you leave this page.
            Do you want to save your changes before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay on Page</AlertDialogCancel>
          <AlertDialogAction className="oui:bg-secondary oui:border oui:border-primary oui:hover:bg-secondary/80">
            Save Changes
          </AlertDialogAction>
          <AlertDialogAction className="oui:bg-destructive oui:text-white oui:hover:bg-destructive/90">
            Leave Without Saving
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert dialog with multiple action options for handling unsaved changes.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4 oui:p-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="oui:bg-destructive oui:text-white oui:hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">System Alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>System Update</AlertDialogTitle>
            <AlertDialogDescription>
              A new system update is available.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Update Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" size="sm">Save Changes</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to save your changes before closing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don't Save</AlertDialogCancel>
            <AlertDialogAction>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">Sign Out</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different alert dialog variants and use cases.',
      },
    },
  },
};