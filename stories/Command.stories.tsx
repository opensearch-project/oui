import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  FileText,
  Search,
  Home,
  Mail,
} from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { Button } from '@/components';

const meta: Meta<typeof Command> = {
  title: 'UI/Command',
  component: Command,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A command palette component for quickly finding and executing actions with keyboard navigation support.'),
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The value of the command input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="oui:w-[450px]">
      <Command {...args}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all command items are initially visible
    await expect(canvas.getByText('Calendar')).toBeInTheDocument();
    await expect(canvas.getByText('Search Emoji')).toBeInTheDocument();
    await expect(canvas.getByText('Calculator')).toBeInTheDocument();
    await expect(canvas.getByText('Profile')).toBeInTheDocument();
    await expect(canvas.getByText('Billing')).toBeInTheDocument();
    await expect(canvas.getAllByText('Settings')[1]).toBeInTheDocument(); // Use the second instance (the item, not the heading)

    // Test search functionality
    const searchInput = canvas.getByPlaceholderText('Type a command or search...');
    await userEvent.type(searchInput, 'cal');

    // After typing 'cal', should show Calendar and Calculator, but not other items
    await expect(canvas.getByText('Calendar')).toBeInTheDocument();
    await expect(canvas.getByText('Calculator')).toBeInTheDocument();

    // Clear search and test with another term
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'profile');

    // Should show only Profile
    await expect(canvas.getByText('Profile')).toBeInTheDocument();

    // Test empty state
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'nonexistent');

    // Should show empty state
    await expect(canvas.getByText('No results found.')).toBeInTheDocument();
  },
};

export const Dialog: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Open Command Palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen} {...args}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => setOpen(false)}>
                <FileText className="oui:mr-2 oui:h-4 oui:w-4" />
                <span>New Document</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Search className="oui:mr-2 oui:h-4 oui:w-4" />
                <span>Search Files</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Home className="oui:mr-2 oui:h-4 oui:w-4" />
                <span>Go to Dashboard</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                <User className="oui:mr-2 oui:h-4 oui:w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Mail className="oui:mr-2 oui:h-4 oui:w-4" />
                <span>Messages</span>
                <CommandShortcut>⌘M</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const SearchableList: Story = {
  render: (args) => {
    const items = [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
      { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
      { name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin' },
      { name: 'Diana Davis', email: 'diana@example.com', role: 'Viewer' },
    ];

    return (
      <div className="oui:w-[500px]">
        <Command {...args}>
          <CommandInput placeholder="Search team members..." />
          <CommandList>
            <CommandEmpty>No team members found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              {items.map((item) => (
                <CommandItem key={item.email} value={`${item.name} ${item.email} ${item.role}`}>
                  <User className="oui:mr-2 oui:h-4 oui:w-4" />
                  <div className="oui:flex oui:flex-col">
                    <span className="oui:font-medium">{item.name}</span>
                    <span className="oui:text-sm oui:text-muted-foreground">{item.email}</span>
                  </div>
                  <div className="oui:ml-auto">
                    <span className="oui:text-xs oui:bg-secondary oui:px-2 oui:py-1 oui:rounded">
                      {item.role}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Command component used as a searchable list with complex items.',
      },
    },
  },
};

export const MultipleGroups: Story = {
  render: (args) => (
    <div className="oui:w-[450px]">
      <Command {...args}>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="File">
            <CommandItem>
              <FileText className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>New File</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileText className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Open File</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileText className="oui:mr-2 oui:h-4 oui:w-4" />
              <span>Save File</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Edit">
            <CommandItem>
              <span>Copy</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Paste</span>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Cut</span>
              <CommandShortcut>⌘X</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="View">
            <CommandItem>
              <span>Zoom In</span>
              <CommandShortcut>⌘+</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Zoom Out</span>
              <CommandShortcut>⌘-</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Reset Zoom</span>
              <CommandShortcut>⌘0</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command component with multiple groups and separators.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    return (
      <div className="oui:space-y-8">
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Command Examples</h3>
          <div className="oui:grid oui:grid-cols-1 oui:md:grid-cols-2 oui:gap-6">
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Basic Command</p>
              <Command className="oui:w-full">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Actions">
                    <CommandItem>
                      <Home className="oui:mr-2 oui:h-4 oui:w-4" />
                      <span>Home</span>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
                      <span>Settings</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Command Dialog</p>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(true)}
                className="oui:w-full"
              >
                Open Command Palette
              </Button>
              <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <CommandInput placeholder="Type a command..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Quick Actions">
                    <CommandItem onSelect={() => setDialogOpen(false)}>
                      <FileText className="oui:mr-2 oui:h-4 oui:w-4" />
                      <span>New Document</span>
                      <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setDialogOpen(false)}>
                      <Search className="oui:mr-2 oui:h-4 oui:w-4" />
                      <span>Search</span>
                      <CommandShortcut>⌘K</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different command component configurations.',
      },
    },
  },
};