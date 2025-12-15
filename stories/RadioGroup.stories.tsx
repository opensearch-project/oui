import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { RadioGroup, RadioGroupItem } from '@/components';
import { Label } from '@/components';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'box'],
      description: 'The visual style variant of the radio group',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the radio group is disabled',
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'The default selected value',
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'The orientation of the radio group',
    },
  },
  args: {
    variant: 'default',
    disabled: false,
    orientation: 'vertical',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'option1',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Default option</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Alternative option</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Third option</Label>
      </div>
    </RadioGroup>
  ),
};

export const BoxVariant: Story = {
  args: {
    variant: 'box',
    defaultValue: 'premium',
  },
  render: (args) => (
    <div className="oui:w-80">
      <RadioGroup {...args}>
        <RadioGroupItem value="basic" id="basic" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">Basic Plan</div>
            <div className="oui:text-sm oui:text-muted-foreground">Perfect for individuals getting started</div>
          </div>
        </RadioGroupItem>
        <RadioGroupItem value="premium" id="premium" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">Premium Plan</div>
            <div className="oui:text-sm oui:text-muted-foreground">Best for growing teams and businesses</div>
          </div>
        </RadioGroupItem>
        <RadioGroupItem value="enterprise" id="enterprise" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">Enterprise Plan</div>
            <div className="oui:text-sm oui:text-muted-foreground">Advanced features for large organizations</div>
          </div>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that premium text exists
    const premiumText = canvas.getByText('Premium Plan');
    await expect(premiumText).toBeInTheDocument();

    // Find the premium radio by its value attribute
    const premiumRadio = canvas.getByRole('radio', { name: /premium plan/i }) ||
                         canvasElement.querySelector('input[value="premium"]') as HTMLInputElement;
    await expect(premiumRadio).toBeInTheDocument();

    // Test switching to a different option by clicking the basic plan text/container
    const basicText = canvas.getByText('Basic Plan');
    await userEvent.click(basicText);

    // Verify the basic radio is now checked
    const basicRadio = canvas.getByRole('radio', { name: /basic plan/i }) ||
                      canvasElement.querySelector('input[value="basic"]') as HTMLInputElement;
    await expect(basicRadio).toBeChecked();
  },
};

export const PaymentMethods: Story = {
  args: {
    variant: 'box',
    defaultValue: 'card',
  },
  render: (args) => (
    <div className="oui:w-96">
      <RadioGroup {...args}>
        <RadioGroupItem value="card" id="card" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">Credit Card</div>
            <div className="oui:text-sm oui:text-muted-foreground">Pay with Visa, Mastercard, or American Express</div>
          </div>
        </RadioGroupItem>
        <RadioGroupItem value="paypal" id="paypal" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">PayPal</div>
            <div className="oui:text-sm oui:text-muted-foreground">Secure payment through your PayPal account</div>
          </div>
        </RadioGroupItem>
        <RadioGroupItem value="bank" id="bank" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">Bank Transfer</div>
            <div className="oui:text-sm oui:text-muted-foreground">Direct transfer from your bank account</div>
          </div>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};

export const NotificationSettings: Story = {
  args: {
    defaultValue: 'all',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="all" id="all" />
        <Label htmlFor="all">All notifications</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="important" id="important" />
        <Label htmlFor="important">Important notifications only</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="none" id="none" />
        <Label htmlFor="none">No notifications</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    defaultValue: 'medium',
    className: 'oui:flex oui:flex-row oui:gap-6',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="small" id="small" />
        <Label htmlFor="small">Small</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="medium" id="medium" />
        <Label htmlFor="medium">Medium</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="large" id="large" />
        <Label htmlFor="large">Large</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'option2',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="option1" id="disabled1" />
        <Label htmlFor="disabled1">Unavailable option</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="option2" id="disabled2" />
        <Label htmlFor="disabled2">Selected but disabled</Label>
      </div>
      <div className="oui:flex oui:items-center oui:space-x-2">
        <RadioGroupItem value="option3" id="disabled3" />
        <Label htmlFor="disabled3">Another disabled option</Label>
      </div>
    </RadioGroup>
  ),
};

export const DisabledBoxVariant: Story = {
  args: {
    variant: 'box',
    disabled: true,
    defaultValue: 'premium',
  },
  render: (args) => (
    <div className="oui:w-80">
      <RadioGroup {...args}>
        <RadioGroupItem value="basic" id="disabled-basic" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">Basic Plan</div>
            <div className="oui:text-sm oui:text-muted-foreground">Currently unavailable</div>
          </div>
        </RadioGroupItem>
        <RadioGroupItem value="premium" id="disabled-premium" variant="box">
          <div>
            <div className="oui:font-medium oui:text-sm oui:text-foreground">Premium Plan</div>
            <div className="oui:text-sm oui:text-muted-foreground">Selected but disabled</div>
          </div>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Default Variant</h3>
        <RadioGroup defaultValue="option1">
          <div className="oui:flex oui:items-center oui:space-x-2">
            <RadioGroupItem value="option1" id="showcase1" />
            <Label htmlFor="showcase1">First option</Label>
          </div>
          <div className="oui:flex oui:items-center oui:space-x-2">
            <RadioGroupItem value="option2" id="showcase2" />
            <Label htmlFor="showcase2">Second option</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Box Variant</h3>
        <div className="oui:w-80">
          <RadioGroup variant="box" defaultValue="plan1">
            <RadioGroupItem value="plan1" id="showcase-plan1" variant="box">
              <div>
                <div className="oui:font-medium oui:text-sm oui:text-foreground">Starter Plan</div>
                <div className="oui:text-sm oui:text-muted-foreground">Great for getting started</div>
              </div>
            </RadioGroupItem>
            <RadioGroupItem value="plan2" id="showcase-plan2" variant="box">
              <div>
                <div className="oui:font-medium oui:text-sm oui:text-foreground">Pro Plan</div>
                <div className="oui:text-sm oui:text-muted-foreground">Perfect for professionals</div>
              </div>
            </RadioGroupItem>
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all RadioGroup variants and their usage patterns.',
      },
    },
  },
};