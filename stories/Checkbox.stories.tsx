import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/components';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is required in a form',
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the checkbox',
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'ID of element that describes the checkbox',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback fired when the checked state changes',
    },
  },
  args: {
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Default checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Checked checkbox',
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
    'aria-label': 'Indeterminate checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox in indeterminate state, typically used for "select all" scenarios where some but not all items are selected.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    'aria-label': 'Disabled oui:checked checkbox',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="oui:flex oui:items-center oui:space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with an associated label. The label is clickable and properly linked to the checkbox.',
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="oui:flex oui:items-start oui:space-x-2">
      <Checkbox id="notifications" className="oui:mt-1" />
      <div className="oui:space-y-1">
        <label
          htmlFor="notifications"
          className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
        >
          Email notifications
        </label>
        <p className="oui:text-xs oui:text-muted-foreground">
          Receive emails about your account activity and important updates.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with label and description text for additional context.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: false,
      marketing: false,
      analytics: true,
    });

    const handleChange = (field: string) => (checked: boolean) => {
      setFormData(prev => ({ ...prev, [field]: checked }));
    };

    return (
      <form className="oui:space-y-4 oui:w-80">
        <fieldset>
          <legend className="oui:text-sm oui:font-medium oui:mb-3">Communication Preferences</legend>
          <div className="oui:space-y-3">
            <div className="oui:flex oui:items-center oui:space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={handleChange('newsletter')}
              />
              <label
                htmlFor="newsletter"
                className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
              >
                Newsletter subscription
              </label>
            </div>
            <div className="oui:flex oui:items-center oui:space-x-2">
              <Checkbox
                id="marketing"
                checked={formData.marketing}
                onCheckedChange={handleChange('marketing')}
              />
              <label
                htmlFor="marketing"
                className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
              >
                Marketing communications
              </label>
            </div>
            <div className="oui:flex oui:items-center oui:space-x-2">
              <Checkbox
                id="analytics"
                checked={formData.analytics}
                onCheckedChange={handleChange('analytics')}
              />
              <label
                htmlFor="analytics"
                className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
              >
                Analytics and performance
              </label>
            </div>
          </div>
        </fieldset>
        <div className="oui:pt-2 oui:text-xs oui:text-muted-foreground">
          Current selections: {Object.entries(formData).filter(([, value]) => value).map(([key]) => key).join(', ') || 'None'}
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox group integrated in a form with proper fieldset, legend, and state management.',
      },
    },
  },
};

export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 'item1', label: 'Project Alpha', checked: false },
      { id: 'item2', label: 'Project Beta', checked: true },
      { id: 'item3', label: 'Project Gamma', checked: false },
      { id: 'item4', label: 'Project Delta', checked: true },
    ]);

    const checkedCount = items.filter(item => item.checked).length;
    const isAllChecked = checkedCount === items.length;
    const isIndeterminate = checkedCount > 0 && checkedCount < items.length;

    const handleSelectAll = (checked: boolean) => {
      setItems(prev => prev.map(item => ({ ...item, checked })));
    };

    const handleItemChange = (id: string) => (checked: boolean) => {
      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, checked } : item
      ));
    };

    return (
      <div className="oui:space-y-4 oui:w-64">
        <div className="oui:flex oui:items-center oui:space-x-2 oui:pb-2 oui:border-b">
          <Checkbox
            id="select-all"
            checked={isAllChecked ? true : isIndeterminate ? 'indeterminate' : false}
            onCheckedChange={handleSelectAll}
          />
          <label
            htmlFor="select-all"
            className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
          >
            Select all projects ({checkedCount}/{items.length})
          </label>
        </div>
        <div className="oui:space-y-2">
          {items.map((item) => (
            <div key={item.id} className="oui:flex oui:items-center oui:space-x-2 oui:pl-4">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={handleItemChange(item.id)}
              />
              <label
                htmlFor={item.id}
                className="oui:text-sm oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select all pattern with indeterminate state when some but not all items are selected.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="oui:space-y-4 oui:w-80">
      <fieldset>
        <legend className="oui:text-sm oui:font-medium oui:mb-3">Account Settings</legend>
        <div className="oui:space-y-3">
          <div className="oui:flex oui:space-x-2">
            <Checkbox
              id="two-factor"
              required
              aria-describedby="two-factor-desc"
              className="oui:mt-0.5"
            />
            <div className="oui:space-y-1">
              <label
                htmlFor="two-factor"
                className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70"
              >
                Enable two-factor authentication *
              </label>
              <p id="two-factor-desc" className="oui:text-xs oui:text-muted-foreground">
                Required for enhanced security. You'll receive codes via SMS or authenticator app. </p> </div> </div> <div className="oui:flex oui:space-x-2"> <Checkbox id="backup-codes" disabled aria-describedby="backup-codes-desc" className="oui:mt-0.5" /> <div className="oui:space-y-1"> <label htmlFor="backup-codes" className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70" > Generate backup codes </label> <p id="backup-codes-desc" className="oui:text-xs oui:text-muted-foreground"> Available after enabling two-factor authentication. </p> </div> </div> </div> </fieldset> </div> ), parameters: { docs: { description: { story:'Accessibility example with proper ARIA attributes, required fields, and descriptive text.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="oui:space-y-4">
      <h3 className="oui:text-sm oui:font-medium">All Checkbox States</h3>
      <div className="oui:grid oui:grid-cols-2 oui:gap-4">
        <div className="oui:space-y-3">
          <div className="oui:flex oui:items-center oui:space-x-2">
            <Checkbox id="unchecked" />
            <label htmlFor="unchecked" className="oui:text-sm">Unchecked</label>
          </div>
          <div className="oui:flex oui:items-center oui:space-x-2">
            <Checkbox id="checked" checked />
            <label htmlFor="checked" className="oui:text-sm">Checked</label>
          </div>
          <div className="oui:flex oui:items-center oui:space-x-2">
            <Checkbox id="indeterminate" checked="indeterminate" />
            <label htmlFor="indeterminate" className="oui:text-sm">Indeterminate</label>
          </div>
        </div>
        <div className="oui:space-y-3">
          <div className="oui:flex oui:items-center oui:space-x-2">
            <Checkbox id="disabled-unchecked" disabled />
            <label htmlFor="disabled-unchecked" className="oui:text-sm oui:text-muted-foreground">Disabled unchecked</label>
          </div>
          <div className="oui:flex oui:items-center oui:space-x-2">
            <Checkbox id="disabled-checked" checked disabled />
            <label htmlFor="disabled-checked" className="oui:text-sm oui:text-muted-foreground">Disabled checked</label>
          </div>
          <div className="oui:flex oui:items-center oui:space-x-2">
            <Checkbox id="disabled-indeterminate" checked="indeterminate" disabled />
            <label htmlFor="disabled-indeterminate" className="oui:text-sm oui:text-muted-foreground">Disabled indeterminate</label>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all possible checkbox states including checked, unchecked, indeterminate, and their disabled variants.',
      },
    },
  },
};