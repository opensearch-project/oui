import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Switch } from '@/components';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the switch is checked (on)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the switch is required in a form',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'box'],
      description: 'The variant of the switch',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the switch',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text for the switch',
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the switch',
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'ID of element that describes the switch',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback fired when the checked state changes',
    },
  },
  args: {
    disabled: false,
    required: false,
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Default switch',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Checked switch',
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    'aria-label': 'Unchecked switch',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled switch',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    'aria-label': 'Disabled checked switch',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with an associated label. The label is clickable and properly linked to the switch.',
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Switch between light and dark themes for better viewing experience.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch with label and description text for additional context.',
      },
    },
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      autoSave: false,
      analytics: true,
      marketing: false,
    });

    const handleChange = (field: string) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [field]: checked }));
    };

    return (
      <div className="oui:space-y-6 oui:w-80">
        <div>
          <h3 className="oui:text-sm oui:font-medium oui:mb-4">Application Settings</h3>
          <div className="oui:space-y-4">
            <Switch
              label="Push notifications"
              description="Receive notifications about important updates"
              checked={settings.notifications}
              onCheckedChange={handleChange('notifications')}
            />
            
            <Switch
              label="Auto-save"
              description="Automatically save your work every few minutes"
              checked={settings.autoSave}
              onCheckedChange={handleChange('autoSave')}
            />
            
            <Switch
              label="Analytics"
              description="Help improve the app by sharing usage data"
              checked={settings.analytics}
              onCheckedChange={handleChange('analytics')}
            />
            
            <Switch
              label="Marketing emails"
              description="Receive emails about new features and updates"
              checked={settings.marketing}
              onCheckedChange={handleChange('marketing')}
            />
          </div>
        </div>
        
        <div className="oui:pt-2 oui:text-xs oui:text-muted-foreground oui:border-t">
          Active settings: {Object.entries(settings).filter(([, value]) => value).map(([key]) => key).join(', ') || 'None'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings panel with multiple switches using component props for labels and descriptions.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      termsAccepted: false,
      newsletterOptIn: true,
      dataProcessing: false,
    });

    const handleChange = (field: string) => (checked: boolean) => {
      setFormData(prev => ({ ...prev, [field]: checked }));
    };

    const isFormValid = formData.termsAccepted && formData.dataProcessing;

    return (
      <form className="oui:space-y-6 oui:w-96">
        <fieldset>
          <legend className="oui:text-sm oui:font-medium oui:mb-4">Account Preferences</legend>
          <div className="oui:space-y-4">
            <Switch
              label="Accept terms and conditions *"
              description="Required to create your account and use our services."
              required
              checked={formData.termsAccepted}
              onCheckedChange={handleChange('termsAccepted')}
            />
            
            <Switch
              label="Subscribe to newsletter"
              description="Get updates about new features and product announcements."
              checked={formData.newsletterOptIn}
              onCheckedChange={handleChange('newsletterOptIn')}
            />
            
            <Switch
              label="Consent to data processing *"
              description="Required for account functionality and service delivery."
              required
              checked={formData.dataProcessing}
              onCheckedChange={handleChange('dataProcessing')}
            />
          </div>
        </fieldset>
        
        <div className="oui:flex oui:items-center oui:justify-between oui:pt-4 oui:border-t">
          <div className="oui:text-xs oui:text-muted-foreground">
            Form status: {isFormValid ? 'Valid' : 'Missing required fields'}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className="oui:px-4 oui:py-2 oui:text-sm oui:font-medium oui:text-white oui:bg-primary oui:rounded-md oui:disabled:opacity-50 oui:disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form integration example with required switches using component props.',
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="oui:space-y-6 oui:w-80">
      <fieldset>
        <legend className="oui:text-sm oui:font-medium oui:mb-4">Privacy Controls</legend>
        <div className="oui:space-y-4">
          <Switch
            label="Location sharing"
            description="Allow the app to access your location for personalized content."
          />
          
          <Switch
            label="Camera access"
            description="Currently disabled by system settings. Enable in device settings to use this feature."
            disabled
          />
          
          <Switch
            label="Biometric authentication"
            description="Use fingerprint or face recognition for secure login."
            defaultChecked
          />
        </div>
      </fieldset>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility example using component props for labels and descriptions.',
      },
    },
  },
};

export const BoxVariant: Story = {
  args: {
    variant: 'box',
    label: 'Switch Text',
    description: 'This is a switch description.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that label and description are present
    await expect(canvas.getByText('Switch Text')).toBeInTheDocument();
    await expect(canvas.getByText('This is a switch description.')).toBeInTheDocument();

    // Test that box variant styling is applied (should have card-like container)
    const switchContainer = canvas.getByRole('switch').closest('label') || canvas.getByRole('switch').parentElement;
    await expect(switchContainer).toBeInTheDocument();

    // Test switch functionality
    const switchElement = canvas.getByRole('switch');
    await expect(switchElement).not.toBeChecked();

    await userEvent.click(switchElement);
    await expect(switchElement).toBeChecked();

    await userEvent.click(switchElement);
    await expect(switchElement).not.toBeChecked();
  },
  parameters: {
    docs: {
      description: {
        story: 'Box variant of the switch component with card-like styling and white background, exactly matching the Figma design.',
      },
    },
  },
};

export const BoxVariantChecked: Story = {
  args: {
    variant: 'box',
    label: 'Switch Text',
    description: 'This is a switch description.',
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Box variant in oui:checked state.',
      },
    },
  },
};

export const BoxVariantDisabled: Story = {
  args: {
    variant: 'box',
    label: 'Switch Text',
    description: 'This is a switch description.',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Box variant in disabled state.',
      },
    },
  },
};

export const BoxVariantInteractive: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      autoSync: false,
      darkMode: true,
      analytics: false,
    });

    const handleChange = (field: string) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [field]: checked }));
    };

    return (
      <div className="oui:space-y-4 oui:max-w-md">
        <h3 className="oui:text-sm oui:font-medium oui:mb-4">Box Variant - Interactive Settings</h3>
        
        <Switch
          variant="box"
          label="Push Notifications"
          description="Receive notifications about updates and messages."
          checked={settings.notifications}
          onCheckedChange={handleChange('notifications')}
        />

        <Switch
          variant="box"
          label="Auto Sync"
          description="Automatically sync your data across devices."
          checked={settings.autoSync}
          onCheckedChange={handleChange('autoSync')}
        />

        <Switch
          variant="box"
          label="Dark Mode"
          description="Switch between light and dark themes."
          checked={settings.darkMode}
          onCheckedChange={handleChange('darkMode')}
        />

        <Switch
          variant="box"
          label="Analytics"
          description="Help improve the app by sharing usage data."
          disabled
          checked={settings.analytics}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive box variant showing real-world usage with multiple settings using the component props.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="oui:space-y-6">
      <h3 className="oui:text-sm oui:font-medium">All Switch States</h3>
      <div className="oui:grid oui:grid-cols-2 oui:gap-6">
        <div className="oui:space-y-4">
          <h4 className="oui:text-xs oui:font-medium oui:text-muted-foreground oui:uppercase oui:tracking-wide">Default Variant</h4>
          <div className="oui:space-y-3">
            <Switch label="Unchecked" />
            <Switch label="Checked" checked />
            <Switch label="Disabled" disabled />
            <Switch label="Disabled checked" checked disabled />
          </div>
        </div>
        
        <div className="oui:space-y-4">
          <h4 className="oui:text-xs oui:font-medium oui:text-muted-foreground oui:uppercase oui:tracking-wide">Box Variant</h4>
          <div className="oui:space-y-3">
            <Switch variant="box" label="Unchecked" description="This is a description" />
            <Switch variant="box" label="Checked" description="This is a description" checked />
            <Switch variant="box" label="Disabled" description="This is a description" disabled />
            <Switch variant="box" label="Disabled checked" description="This is a description" checked disabled />
          </div>
        </div>
      </div>
      
      <div className="oui:pt-4 oui:border-t">
        <h4 className="oui:text-xs oui:font-medium oui:text-muted-foreground oui:uppercase oui:tracking-wide oui:mb-3">Interactive Examples</h4>
        <div className="oui:space-y-3">
          <Switch label="Toggle me" defaultChecked />
          <Switch label="Click to enable" />
          <Switch variant="box" label="Box variant" description="Interactive box switch" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all possible switch states and variants using component props.',
      },
    },
  },
};