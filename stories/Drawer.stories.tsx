import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components';
import { Button } from '@/components';
import { Input } from '@/components';
import { Label } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A drawer component that slides in from the edge of the screen, commonly used for navigation or additional content.'),
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The direction from which the drawer opens',
    },
  },
  args: {
    direction: 'bottom',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as never,
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="oui:p-4 oui:pb-0">
          <div className="oui:space-y-4">
            <div className="oui:space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="oui:space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithCounter: Story = {
  args: {} as never,
  render: (args) => {
    const [goal, setGoal] = useState(350);

    function onClick(adjustment: number) {
      setGoal(Math.max(200, Math.min(400, goal + adjustment)));
    }

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Set Goal</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="oui:mx-auto oui:w-full oui:max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="oui:p-4 oui:pb-0">
              <div className="oui:flex oui:items-center oui:justify-center oui:space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="oui:h-8 oui:w-8 oui:shrink-0 oui:rounded-full"
                  onClick={() => onClick(-10)}
                  disabled={goal <= 200}
                >
                  <Minus className="oui:h-4 oui:w-4" />
                  <span className="oui:sr-only">Decrease</span>
                </Button>
                <div className="oui:flex-1 oui:text-center">
                  <div className="oui:text-7xl oui:font-bold oui:tracking-tighter">
                    {goal}
                  </div>
                  <div className="oui:text-[0.70rem] uppercase oui:text-muted-foreground">
                    Calories/day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="oui:h-8 oui:w-8 oui:shrink-0 oui:rounded-full"
                  onClick={() => onClick(10)}
                  disabled={goal >= 400}
                >
                  <Plus className="oui:h-4 oui:w-4" />
                  <span className="oui:sr-only">Increase</span>
                </Button>
              </div>
              <div className="oui:mt-3 oui:h-[120px]">
                <div className="oui:flex oui:h-full oui:items-end oui:justify-center oui:space-x-1">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div
                      key={i}
                      className="oui:bg-muted oui:flex-1 oui:rounded-t-sm"
                      style={{
                        height: `${Math.max(10, (goal - 200) / 2)}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer with interactive counter and visualization.',
      },
    },
  },
};

export const FromTop: Story = {
  args: {} as never,
  render: (args) => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            You have 3 unread notifications.
          </DrawerDescription>
        </DrawerHeader>
        <div className="oui:p-4 oui:pb-0">
          <div className="oui:space-y-4">
            <div className="oui:flex oui:items-start oui:space-x-4 oui:rounded-md oui:border oui:p-4">
              <div className="oui:space-y-1">
                <p className="oui:text-sm oui:font-medium oui:leading-none">
                  New message from John
                </p>
                <p className="oui:text-sm oui:text-muted-foreground">
                  Hey, how's the project going?
                </p>
              </div>
            </div>
            <div className="oui:flex oui:items-start oui:space-x-4 oui:rounded-md oui:border oui:p-4">
              <div className="oui:space-y-1">
                <p className="oui:text-sm oui:font-medium oui:leading-none">
                  Meeting reminder
                </p>
                <p className="oui:text-sm oui:text-muted-foreground">
                  Team standup in 15 minutes
                </p>
              </div>
            </div>
            <div className="oui:flex oui:items-start oui:space-x-4 oui:rounded-md oui:border oui:p-4">
              <div className="oui:space-y-1">
                <p className="oui:text-sm oui:font-medium oui:leading-none">
                  System update
                </p>
                <p className="oui:text-sm oui:text-muted-foreground">
                  New features are now available
                </p>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Mark All as Read</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const FromRight: Story = {
  args: {} as never,
  render: (args) => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open from Right</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Configure your application settings.
          </DrawerDescription>
        </DrawerHeader>
        <div className="oui:p-4 oui:pb-0 oui:space-y-4">
          <div className="oui:space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <select id="theme" className="oui:w-full oui:p-2 oui:border oui:rounded">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div className="oui:space-y-2">
            <Label htmlFor="language">Language</Label>
            <select id="language" className="oui:w-full oui:p-2 oui:border oui:rounded">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="oui:flex oui:items-center oui:space-x-2">
            <input type="checkbox" id="notifications" />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Settings</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Showcase: Story = {
  args: {} as never,
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Drawer Directions</h3>
        <div className="oui:grid oui:grid-cols-2 oui:md:grid-cols-4 oui:gap-4">
          <Drawer direction="bottom">
            <DrawerTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Bottom
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Bottom Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer opens from the bottom.
                </DrawerDescription>
              </DrawerHeader>
              <div className="oui:p-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer direction="top">
            <DrawerTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Top
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Top Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer opens from the top.
                </DrawerDescription>
              </DrawerHeader>
              <div className="oui:p-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Left
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Left Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer opens from the left.
                </DrawerDescription>
              </DrawerHeader>
              <div className="oui:p-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline" className="oui:w-full">
                From Right
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Right Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer opens from the right.
                </DrawerDescription>
              </DrawerHeader>
              <div className="oui:p-4">
                <p className="oui:text-sm oui:text-muted-foreground">
                  Content goes here...
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Drawers opening from different directions.',
      },
    },
  },
};