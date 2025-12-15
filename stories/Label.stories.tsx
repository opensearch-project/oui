import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components';
import { Input } from '@/components';
import { Checkbox } from '@/components';
import { RadioGroup, RadioGroupItem } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { Switch } from '@/components';
import { Textarea } from '@/components';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A label component for form fields with proper accessibility attributes.'),
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: { type: 'text' },
      description: 'The id of the form element this label is associated with',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="oui:space-y-2">
      <Label htmlFor="email" {...args}>
        Email
      </Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const WithInput: Story = {
  render: (args) => (
    <div className="oui:grid oui:w-full oui:max-w-sm oui:items-center oui:gap-1.5">
      <Label htmlFor="picture" {...args}>
        Picture
      </Label>
      <Input id="picture" type="file" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label associated with a file input.',
      },
    },
  },
};

export const WithTextarea: Story = {
  render: (args) => (
    <div className="oui:grid oui:w-full oui:gap-1.5">
      <Label htmlFor="message" {...args}>
        Your message
      </Label>
      <Textarea placeholder="Type your message here." id="message" />
      <p className="oui:text-sm oui:text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label with textarea and helper text.',
      },
    },
  },
};

export const WithCheckbox: Story = {
  render: (args) => (
    <div className="items-top oui:flex oui:space-x-2">
      <Checkbox id="terms1" />
      <div className="oui:grid oui:gap-1.5 oui:leading-none">
        <Label
          htmlFor="terms1"
          className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
          {...args}
        >
          Accept terms and conditions
        </Label>
        <p className="oui:text-xs oui:text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label with checkbox and description.',
      },
    },
  },
};

export const WithRadioGroup: Story = {
  render: (args) => (
    <div className="oui:space-y-3">
      <Label className="oui:text-base oui:font-medium" {...args}>
        Choose your notification preference
      </Label>
      <RadioGroup defaultValue="email" className="oui:space-y-2">
        <div className="oui:flex oui:items-center oui:space-x-2">
          <RadioGroupItem value="email" id="email" />
          <Label htmlFor="email" className="oui:font-normal">
            Email notifications
          </Label>
        </div>
        <div className="oui:flex oui:items-center oui:space-x-2">
          <RadioGroupItem value="sms" id="sms" />
          <Label htmlFor="sms" className="oui:font-normal">
            SMS notifications
          </Label>
        </div>
        <div className="oui:flex oui:items-center oui:space-x-2">
          <RadioGroupItem value="push" id="push" />
          <Label htmlFor="push" className="oui:font-normal">
            Push notifications
          </Label>
        </div>
        <div className="oui:flex oui:items-center oui:space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none" className="oui:font-normal">
            No notifications
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label as a group heading with radio group options.',
      },
    },
  },
};

export const WithSwitch: Story = {
  render: (args) => (
    <div className="oui:flex oui:items-center oui:space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode" {...args}>
        Airplane Mode
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label with switch control.',
      },
    },
  },
};

export const Required: Story = {
  render: (args) => (
    <div className="oui:space-y-2">
      <Label htmlFor="required-email" {...args}>
        Email <span className="oui:text-red-500">*</span>
      </Label>
      <Input id="required-email" type="email" placeholder="Enter your email" required />
      <p className="oui:text-xs oui:text-muted-foreground">
        * Required field
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label indicating a required field.',
      },
    },
  },
};

export const FormExample: Story = {
  render: (args) => (
    <form className="oui:w-full oui:max-w-sm oui:space-y-4">
      <div className="oui:space-y-2">
        <Label htmlFor="first-name" {...args}>
          First Name
        </Label>
        <Input id="first-name" placeholder="John" />
      </div>
      
      <div className="oui:space-y-2">
        <Label htmlFor="last-name" {...args}>
          Last Name
        </Label>
        <Input id="last-name" placeholder="Doe" />
      </div>
      
      <div className="oui:space-y-2">
        <Label htmlFor="email-form" {...args}>
          Email Address
        </Label>
        <Input id="email-form" type="email" placeholder="john@example.com" />
      </div>
      
      <div className="oui:space-y-2">
        <Label htmlFor="phone" {...args}>
          Phone Number
        </Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
      </div>
      
      <div className="oui:space-y-2">
        <Label htmlFor="bio" {...args}>
          Bio
        </Label>
        <Textarea id="bio" placeholder="Tell us about yourself..." />
      </div>
      
      <div className="oui:flex oui:items-center oui:space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter" className="oui:text-sm oui:font-normal">
          Subscribe to our newsletter
        </Label>
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form example with various input types and labels.',
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="oui:space-y-2">
      <Label htmlFor="disabled-input" className="oui:opacity-50" {...args}>
        Disabled Field
      </Label>
      <Input id="disabled-input" placeholder="This field is disabled" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label with disabled input field.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Label Examples</h3>
        <div className="oui:space-y-6">
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">Basic Input</p>
            <div className="oui:space-y-2">
              <Label htmlFor="showcase-email">Email</Label>
              <Input id="showcase-email" type="email" placeholder="Enter email" />
            </div>
          </div>
          
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">With Checkbox</p>
            <div className="oui:flex oui:items-center oui:space-x-2">
              <Checkbox id="showcase-terms" />
              <Label htmlFor="showcase-terms" className="oui:text-sm oui:font-normal">
                I agree to the terms and conditions
              </Label>
            </div>
          </div>
          
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">With Switch</p>
            <div className="oui:flex oui:items-center oui:space-x-2">
              <Switch id="showcase-notifications" />
              <Label htmlFor="showcase-notifications">Enable notifications</Label>
            </div>
          </div>
          
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">Required Field</p>
            <div className="oui:space-y-2">
              <Label htmlFor="showcase-required">
                Username <span className="oui:text-red-500">*</span>
              </Label>
              <Input id="showcase-required" placeholder="Enter username" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different label use cases and form controls.',
      },
    },
  },
};