import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Menu, Settings, User, Bell, Search } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components';
import { Button } from '@/components';
import { Input } from '@/components';
import { Label } from '@/components';
import { Separator } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { Switch } from '@/components';

const meta: Meta<typeof Sheet> = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A sheet component that slides in from the edge of the screen, similar to a drawer but with different styling.'),
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the sheet is open',
    },
    modal: {
      control: { type: 'boolean' },
      description: 'Whether the sheet is modal',
    },
  },
  args: {
    modal: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="oui:grid oui:gap-4 oui:py-4">
          <div className="oui:grid oui:grid-cols-4 oui:items-center oui:gap-4">
            <Label htmlFor="name" className="oui:text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="oui:col-span-3" />
          </div>
          <div className="oui:grid oui:grid-cols-4 oui:items-center oui:gap-4">
            <Label htmlFor="username" className="oui:text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="oui:col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FromLeft: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="oui:mr-2 oui:h-4 oui:w-4" />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Navigate through the application sections.
          </SheetDescription>
        </SheetHeader>
        <div className="oui:py-4">
          <nav className="oui:space-y-2">
            <Button variant="ghost" className="oui:w-full oui:justify-start">
              <User className="oui:mr-2 oui:h-4 oui:w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="oui:w-full oui:justify-start">
              <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="oui:w-full oui:justify-start">
              <Bell className="oui:mr-2 oui:h-4 oui:w-4" />
              Notifications
            </Button>
            <Separator className="oui:my-2" />
            <Button variant="ghost" className="oui:w-full oui:justify-start">
              Help & Support
            </Button>
            <Button variant="ghost" className="oui:w-full oui:justify-start">
              Logout
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet opening from the left side as a navigation menu.',
      },
    },
  },
};

export const FromTop: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Search className="oui:mr-2 oui:h-4 oui:w-4" />
          Search
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>
            Search for anything across the application.
          </SheetDescription>
        </SheetHeader>
        <div className="oui:py-4">
          <div className="oui:space-y-4">
            <Input
              placeholder="Type your search query..."
              className="oui:w-full"
            />
            <div className="oui:space-y-2">
              <h4 className="oui:text-sm oui:font-medium">Recent Searches</h4>
              <div className="oui:space-y-1">
                <Button variant="ghost" className="oui:w-full oui:justify-start oui:text-sm">
                  React components
                </Button>
                <Button variant="ghost" className="oui:w-full oui:justify-start oui:text-sm">
                  TypeScript tutorial
                </Button>
                <Button variant="ghost" className="oui:w-full oui:justify-start oui:text-sm">
                  UI design patterns
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet opening from the top as a search interface.',
      },
    },
  },
};

export const FromBottom: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Settings className="oui:mr-2 oui:h-4 oui:w-4" />
          Quick Settings
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Settings</SheetTitle>
          <SheetDescription>
            Adjust your preferences quickly.
          </SheetDescription>
        </SheetHeader>
        <div className="oui:py-4">
          <div className="oui:space-y-4">
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label htmlFor="notifications">Push Notifications</Label>
              <Switch id="notifications" />
            </div>
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label htmlFor="auto-save">Auto Save</Label>
              <Switch id="auto-save" defaultChecked />
            </div>
            <Separator />
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label htmlFor="analytics">Analytics</Label>
              <Switch id="analytics" />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheet opening from the bottom with settings toggles.',
      },
    },
  },
};

export const ContactForm: Story = {
  render: (args) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };

    return (
      <Sheet {...args}>
        <SheetTrigger asChild>
          <Button>Contact Us</Button>
        </SheetTrigger>
        <SheetContent className="oui:sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Contact Us</SheetTitle>
            <SheetDescription>
              Send us a message and we'll get back to you as soon as possible.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="oui:space-y-4 oui:py-4">
            <div className="oui:space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="oui:space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="oui:space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <textarea
                id="contact-message"
                className="oui:flex oui:min-h-[80px] oui:w-full oui:rounded-md oui:border oui:border-input oui:bg-background oui:px-3 oui:py-2 oui:text-sm oui:ring-offset-background oui:placeholder:text-muted-foreground oui:focus-visible:outline-none oui:focus-visible:ring-2 oui:focus-visible:ring-ring oui:focus-visible:ring-offset-2 oui:disabled:cursor-not-allowed oui:disabled:opacity-50"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
              />
            </div>
          </form>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit" onClick={handleSubmit}>
              Send Message
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact form in a sheet with form validation.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Sheet Directions</h3>
        <div className="oui:grid oui:grid-cols-2 oui:md:grid-cols-4 oui:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Right
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Right Sheet</SheetTitle>
                <SheetDescription>
                  This sheet opens from the right side.
                </SheetDescription>
              </SheetHeader>
              <div className="oui:py-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Left
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left Sheet</SheetTitle>
                <SheetDescription>
                  This sheet opens from the left side.
                </SheetDescription>
              </SheetHeader>
              <div className="oui:py-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Top
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Top Sheet</SheetTitle>
                <SheetDescription>
                  This sheet opens from the top.
                </SheetDescription>
              </SheetHeader>
              <div className="oui:py-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Bottom
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Bottom Sheet</SheetTitle>
                <SheetDescription>
                  This sheet opens from the bottom.
                </SheetDescription>
              </SheetHeader>
              <div className="oui:py-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sheets opening from different directions.',
      },
    },
  },
};