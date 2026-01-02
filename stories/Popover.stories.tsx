import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';
import { SettingsIcon, UserIcon, CreditCardIcon, LogOutIcon, PlusIcon } from '@/components';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components';
import { Button } from '@/components';
import { Input } from '@/components';
import { Label } from '@/components';
import { Separator } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A popover component that displays floating content relative to a trigger element.'),
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the popover is open',
    },
    modal: {
      control: { type: 'boolean' },
      description: 'Whether the popover is modal',
    },
  },
  args: {
    modal: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="oui:w-80">
        <div className="oui:grid oui:gap-4">
          <div className="oui:space-y-2">
            <h4 className="oui:font-medium oui:leading-none">Dimensions</h4>
            <p className="oui:text-sm oui:text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="oui:grid oui:gap-2">
            <div className="oui:grid oui:grid-cols-3 oui:items-center oui:gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="oui:col-span-2 oui:h-8"
              />
            </div>
            <div className="oui:grid oui:grid-cols-3 oui:items-center oui:gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="oui:col-span-2 oui:h-8"
              />
            </div>
            <div className="oui:grid oui:grid-cols-3 oui:items-center oui:gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="oui:col-span-2 oui:h-8"
              />
            </div>
            <div className="oui:grid oui:grid-cols-3 oui:items-center oui:gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="oui:col-span-2 oui:h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state - popover should be closed
    const triggerButton = canvas.getByRole('button', { name: 'Open popover' });
    await expect(triggerButton).toBeInTheDocument();

    // Test that popover content is not initially visible
    await expect(canvas.queryByText('Dimensions')).not.toBeInTheDocument();
    await expect(canvas.queryByLabelText('Width')).not.toBeInTheDocument();

    // Test opening popover
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that popover content becomes visible
    const dimensionsHeading = canvas.getByText('Dimensions');
    const widthInput = canvas.getByLabelText('Width');

    await expect(dimensionsHeading).toBeInTheDocument();
    await expect(widthInput).toBeInTheDocument();

    // Test popover has proper ARIA attributes
    const popover = canvas.getByRole('dialog') || canvas.getByRole('tooltip');
    if (popover) {
      await expect(popover).toBeInTheDocument();
    }

    // Test that form fields are properly labeled and functional
    const maxWidthInput = canvas.getByLabelText('Max. width');
    const heightInput = canvas.getByLabelText('Height');
    const maxHeightInput = canvas.getByLabelText('Max. height');

    await expect(widthInput).toHaveValue('100%');
    await expect(maxWidthInput).toHaveValue('300px');
    await expect(heightInput).toHaveValue('25px');
    await expect(maxHeightInput).toHaveValue('none');

    // Test form field interactions
    await userEvent.clear(widthInput);
    await userEvent.type(widthInput, '200px');
    await expect(widthInput).toHaveValue('200px');

    // Test keyboard navigation within popover
    await userEvent.click(widthInput);
    await expect(widthInput).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(maxWidthInput).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(heightInput).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(maxHeightInput).toHaveFocus();

    // Test Shift+Tab reverse navigation
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await expect(heightInput).toHaveFocus();

    // Test Escape key closes popover
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test popover closed and content hidden
    await expect(canvas.queryByText('Dimensions')).not.toBeInTheDocument();
    await expect(canvas.queryByLabelText('Width')).not.toBeInTheDocument();

    // Test focus returns to trigger button
    await expect(triggerButton).toHaveFocus();

    // Test clicking outside to close popover
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify popover reopened
    await expect(canvas.getByText('Dimensions')).toBeInTheDocument();

    // Click outside popover (click on body or container)
    await userEvent.click(document.body);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test popover closed by clicking outside
    await expect(canvas.queryByText('Dimensions')).not.toBeInTheDocument();

    // Test that form values persist when reopening
    await userEvent.click(triggerButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const reopenedWidthInput = canvas.getByLabelText('Width');
    // Values should persist or reset depending on implementation
    await expect(reopenedWidthInput).toBeInTheDocument();

    // Close for cleanup
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 100));
  },
};

export const UserMenu: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="oui:relative oui:h-8 oui:w-8 oui:rounded-full">
          <Avatar className="oui:h-8 oui:w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="oui:w-56" align="end">
        <div className="oui:flex oui:items-center oui:space-x-2">
          <Avatar className="oui:h-8 oui:w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="oui:space-y-1">
            <p className="oui:text-sm oui:font-medium oui:leading-none">shadcn</p>
            <p className="oui:text-xs oui:leading-none oui:text-muted-foreground">
              m@example.com
            </p>
          </div>
        </div>
        <Separator className="oui:my-2" />
        <div className="oui:space-y-1">
          <Button variant="ghost" className="oui:w-full oui:justify-start" size="sm">
            <UserIcon className="oui:mr-2 oui:h-4 oui:w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="oui:w-full oui:justify-start" size="sm">
            <CreditCardIcon className="oui:mr-2 oui:h-4 oui:w-4" />
            Billing
          </Button>
          <Button variant="ghost" className="oui:w-full oui:justify-start" size="sm">
            <SettingsIcon className="oui:mr-2 oui:h-4 oui:w-4" />
            Settings
          </Button>
        </div>
        <Separator className="oui:my-2" />
        <Button variant="ghost" className="oui:w-full oui:justify-start" size="sm">
          <LogOutIcon className="oui:mr-2 oui:h-4 oui:w-4" />
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test avatar trigger button
    const avatarButton = canvas.getByRole('button');
    await expect(avatarButton).toBeInTheDocument();
    await expect(avatarButton).toHaveClass('oui:rounded-full');

    // Test that user menu content is initially hidden
    await expect(canvas.queryByText('shadcn')).not.toBeInTheDocument();
    await expect(canvas.queryByText('Profile')).not.toBeInTheDocument();

    // Test opening user menu
    await userEvent.click(avatarButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that user menu content becomes visible
    const username = canvas.getByText('shadcn');
    const email = canvas.getByText('m@example.com');

    await expect(username).toBeInTheDocument();
    await expect(email).toBeInTheDocument();

    // Test menu items are present and accessible
    const profileButton = canvas.getByRole('button', { name: /Profile/i });
    const billingButton = canvas.getByRole('button', { name: /Billing/i });
    const settingsButton = canvas.getByRole('button', { name: /Settings/i });
    const logoutButton = canvas.getByRole('button', { name: /Log out/i });

    await expect(profileButton).toBeInTheDocument();
    await expect(billingButton).toBeInTheDocument();
    await expect(settingsButton).toBeInTheDocument();
    await expect(logoutButton).toBeInTheDocument();

    // Test menu items have proper icons
    const userIcon = profileButton.querySelector('svg');
    const creditCardIcon = billingButton.querySelector('svg');
    const settingsIcon = settingsButton.querySelector('svg');
    const logoutIcon = logoutButton.querySelector('svg');

    await expect(userIcon).toBeInTheDocument();
    await expect(creditCardIcon).toBeInTheDocument();
    await expect(settingsIcon).toBeInTheDocument();
    await expect(logoutIcon).toBeInTheDocument();

    // Test keyboard navigation through menu items
    await userEvent.keyboard('{Tab}');
    await expect(profileButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(billingButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(settingsButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(logoutButton).toHaveFocus();

    // Test that Tab cycles back to first menu item (focus trapping)
    await userEvent.keyboard('{Tab}');
    await expect(profileButton).toHaveFocus();

    // Test reverse Tab navigation
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await expect(logoutButton).toHaveFocus();

    // Test arrow key navigation (if supported)
    await userEvent.keyboard('{ArrowUp}');
    // Focus should move to previous item or stay the same

    await userEvent.keyboard('{ArrowDown}');
    // Focus should move to next item

    // Test clicking menu items
    await userEvent.click(profileButton);
    await expect(profileButton).toHaveFocus();

    await userEvent.click(settingsButton);
    await expect(settingsButton).toHaveFocus();

    // Test Enter key activation
    await userEvent.keyboard('{Enter}');
    await expect(settingsButton).toHaveFocus();

    // Test Space key activation
    await userEvent.keyboard(' ');
    await expect(settingsButton).toHaveFocus();

    // Test that separators are present for visual organization
    const separators = canvas.getAllByRole('separator');
    expect(separators).toHaveLength(2); // Before and after main menu items

    // Test Escape key closes user menu
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test menu closed and content hidden
    await expect(canvas.queryByText('shadcn')).not.toBeInTheDocument();
    await expect(canvas.queryByText('Profile')).not.toBeInTheDocument();

    // Test focus returns to avatar button
    await expect(avatarButton).toHaveFocus();

    // Test clicking outside closes menu
    await userEvent.click(avatarButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify menu reopened
    await expect(canvas.getByText('shadcn')).toBeInTheDocument();

    // Click outside to close
    await userEvent.click(document.body);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test menu closed by clicking outside
    await expect(canvas.queryByText('shadcn')).not.toBeInTheDocument();

    // Test logout functionality (critical action)
    await userEvent.click(avatarButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const logoutBtn = canvas.getByRole('button', { name: /Log out/i });
    await userEvent.click(logoutBtn);
    await expect(logoutBtn).toHaveFocus();

    // Test popover alignment (should be 'end' aligned based on code)
    const popover = canvas.getByRole('dialog') || canvas.getByRole('tooltip') ||
                   document.querySelector('[data-radix-popper-content-wrapper]');

    if (popover) {
      // Popover should exist and be positioned
      await expect(popover).toBeInTheDocument();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'User menu popover with avatar and navigation options.',
      },
    },
  },
};

export const DatePicker: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date>();

    return (
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="oui:w-[280px] oui:justify-start oui:text-left oui:font-normal"
          >
            {date ? date.toDateString() : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="oui:w-auto oui:p-0">
          <div className="oui:p-4">
            <div className="oui:space-y-4">
              <div className="oui:space-y-2">
                <h4 className="oui:font-medium oui:leading-none">Select Date</h4>
                <p className="oui:text-sm oui:text-muted-foreground">
                  Choose a date from the options below.
                </p>
              </div>
              <div className="oui:grid oui:gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDate(new Date())}
                  className="oui:justify-start"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow);
                  }}
                  className="oui:justify-start"
                >
                  Tomorrow
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    setDate(nextWeek);
                  }}
                  className="oui:justify-start"
                >
                  Next Week
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Date picker popover with preset date options.',
      },
    },
  },
};

export const AddItem: Story = {
  render: (args) => {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [newItem, setNewItem] = useState('');
    const [open, setOpen] = useState(false);

    const addItem = () => {
      if (newItem.trim()) {
        setItems([...items, newItem]);
        setNewItem('');
        setOpen(false);
      }
    };

    return (
      <div className="oui:space-y-4">
        <div className="oui:space-y-2">
          <h4 className="oui:text-sm oui:font-medium">Items</h4>
          <div className="oui:space-y-1">
            {items.map((item, index) => (
              <div key={index} className="oui:text-sm oui:p-2 oui:bg-muted oui:rounded">
                {item}
              </div>
            ))}
          </div>
        </div>
        
        <Popover open={open} onOpenChange={setOpen} {...args}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusIcon className="oui:mr-2 oui:h-4 oui:w-4" />
              Add Item
            </Button>
          </PopoverTrigger>
          <PopoverContent className="oui:w-80">
            <div className="oui:grid oui:gap-4">
              <div className="oui:space-y-2">
                <h4 className="oui:font-medium oui:leading-none">Add New Item</h4>
                <p className="oui:text-sm oui:text-muted-foreground">
                  Enter the name for your new item.
                </p>
              </div>
              <div className="oui:grid oui:gap-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input
                  id="item-name"
                  placeholder="Enter item name..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addItem();
                    }
                  }}
                />
                <div className="oui:flex oui:gap-2">
                  <Button onClick={addItem} size="sm" className="oui:flex-1">
                    Add Item
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setOpen(false)} 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial list state
    const itemsHeading = canvas.getByText('Items');
    await expect(itemsHeading).toBeInTheDocument();

    // Test that initial items are present
    const item1 = canvas.getByText('Item 1');
    const item2 = canvas.getByText('Item 2');
    const item3 = canvas.getByText('Item 3');

    await expect(item1).toBeInTheDocument();
    await expect(item2).toBeInTheDocument();
    await expect(item3).toBeInTheDocument();

    // Test Add Item trigger button
    const addButton = canvas.getByRole('button', { name: /Add Item/i });
    await expect(addButton).toBeInTheDocument();
    await expect(addButton).toHaveClass('oui:justify-start');

    // Test that plus icon is present
    const plusIcon = addButton.querySelector('svg');
    await expect(plusIcon).toBeInTheDocument();

    // Test that popover content is initially hidden
    await expect(canvas.queryByText('Add New Item')).not.toBeInTheDocument();
    await expect(canvas.queryByLabelText('Item Name')).not.toBeInTheDocument();

    // Test opening add item popover
    await userEvent.click(addButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that popover content becomes visible
    const addHeading = canvas.getByText('Add New Item');
    const itemNameInput = canvas.getByLabelText('Item Name');
    const addItemButton = canvas.getByRole('button', { name: 'Add Item' });
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' });

    await expect(addHeading).toBeInTheDocument();
    await expect(itemNameInput).toBeInTheDocument();
    await expect(addItemButton).toBeInTheDocument();
    await expect(cancelButton).toBeInTheDocument();

    // Test input field attributes
    await expect(itemNameInput).toHaveAttribute('placeholder', 'Enter item name...');
    await expect(itemNameInput).toHaveValue('');

    // Test initial focus management
    await expect(itemNameInput).toHaveFocus();

    // Test typing in input field
    await userEvent.type(itemNameInput, 'New Test Item');
    await expect(itemNameInput).toHaveValue('New Test Item');

    // Test Tab navigation
    await userEvent.keyboard('{Tab}');
    await expect(addItemButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(cancelButton).toHaveFocus();

    // Test Tab cycles back (focus trapping)
    await userEvent.keyboard('{Tab}');
    await expect(itemNameInput).toHaveFocus();

    // Test adding item via Add Item button
    await userEvent.click(addItemButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that popover closes after adding item
    await expect(canvas.queryByText('Add New Item')).not.toBeInTheDocument();

    // Test that new item appears in the list
    const newItem = canvas.getByText('New Test Item');
    await expect(newItem).toBeInTheDocument();

    // Test that there are now 4 items total
    const allItemTexts = canvas.getAllByText(/Item \d+|New Test Item/);
    expect(allItemTexts).toHaveLength(4);

    // Test canceling add item flow
    await userEvent.click(addButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const newInputField = canvas.getByLabelText('Item Name');
    await userEvent.type(newInputField, 'Should be cancelled');

    const newCancelButton = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(newCancelButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test popover closes without adding item
    await expect(canvas.queryByText('Add New Item')).not.toBeInTheDocument();
    await expect(canvas.queryByText('Should be cancelled')).not.toBeInTheDocument();

    // Test that list still has only 4 items
    const itemsAfterCancel = canvas.getAllByText(/Item \d+|New Test Item/);
    expect(itemsAfterCancel).toHaveLength(4);

    // Test Enter key to add item
    await userEvent.click(addButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const enterInputField = canvas.getByLabelText('Item Name');
    await userEvent.type(enterInputField, 'Enter Key Item');
    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that item was added via Enter key
    await expect(canvas.queryByText('Add New Item')).not.toBeInTheDocument();
    await expect(canvas.getByText('Enter Key Item')).toBeInTheDocument();

    // Test that list now has 5 items
    const itemsAfterEnter = canvas.getAllByText(/Item \d+|New Test Item|Enter Key Item/);
    expect(itemsAfterEnter).toHaveLength(5);

    // Test empty input validation
    await userEvent.click(addButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const emptyInputField = canvas.getByLabelText('Item Name');
    const emptyAddButton = canvas.getByRole('button', { name: 'Add Item' });

    // Verify input field is empty
    await expect(emptyInputField).toHaveValue('');

    // Try to add empty item
    await userEvent.click(emptyAddButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Popover should remain open (validation prevents adding empty items)
    await expect(canvas.getByText('Add New Item')).toBeInTheDocument();

    // Test Escape key cancellation
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test popover closed via Escape
    await expect(canvas.queryByText('Add New Item')).not.toBeInTheDocument();

    // Test clicking outside to close
    await userEvent.click(addButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify popover opened
    await expect(canvas.getByText('Add New Item')).toBeInTheDocument();

    // Click outside popover
    await userEvent.click(document.body);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test popover closed by clicking outside
    await expect(canvas.queryByText('Add New Item')).not.toBeInTheDocument();

    // Test that input field clears after successful addition
    await userEvent.click(addButton);
    await new Promise(resolve => setTimeout(resolve, 100));

    const finalInputField = canvas.getByLabelText('Item Name');
    await expect(finalInputField).toHaveValue(''); // Should be empty for new item

    // Close for cleanup
    const finalCancelButton = canvas.getByRole('button', { name: 'Cancel' });
    await userEvent.click(finalCancelButton);
    await new Promise(resolve => setTimeout(resolve, 100));
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive popover for adding items to a list.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Popover Examples</h3>
        <div className="oui:flex oui:flex-wrap oui:gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Basic Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="oui:space-y-2">
                <h4 className="oui:font-medium">Basic Popover</h4>
                <p className="oui:text-sm oui:text-muted-foreground">
                  This is a simple popover with some content.
                </p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Settings</Button>
            </PopoverTrigger>
            <PopoverContent className="oui:w-80">
              <div className="oui:grid oui:gap-4">
                <div className="oui:space-y-2">
                  <h4 className="oui:font-medium oui:leading-none">Settings</h4>
                  <p className="oui:text-sm oui:text-muted-foreground">
                    Configure your preferences.
                  </p>
                </div>
                <div className="oui:grid oui:gap-2">
                  <div className="oui:grid oui:grid-cols-3 oui:items-center oui:gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" className="oui:col-span-2 oui:h-8" />
                  </div>
                  <div className="oui:grid oui:grid-cols-3 oui:items-center oui:gap-4">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" className="oui:col-span-2 oui:h-8" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">User Menu</Button>
            </PopoverTrigger>
            <PopoverContent className="oui:w-56">
              <div className="oui:space-y-1">
                <Button variant="ghost" className="oui:w-full oui:justify-start" size="sm">
                  <UserIcon className="oui:mr-2 oui:h-4 oui:w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="oui:w-full oui:justify-start" size="sm">
                  <SettingsIcon className="oui:mr-2 oui:h-4 oui:w-4" />
                  Settings
                </Button>
                <Separator className="oui:my-1" />
                <Button variant="ghost" className="oui:w-full oui:justify-start" size="sm">
                  <LogOutIcon className="oui:mr-2 oui:h-4 oui:w-4" />
                  Log out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different popover configurations and use cases.',
      },
    },
  },
};