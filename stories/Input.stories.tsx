import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import { Input } from '@/components';
import {
  testFormControl,
  testInputTypes,
  testDisabledState,
  testReadOnlyState,
  testRequiredField,
  testValidationError,
  testValidationSuccess
} from './utils/test-helpers';
import {
  testFormLabelAssociation,
  testErrorAnnouncement
} from './utils/accessibility-helpers';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file'],
      description: 'The type of input field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text displayed when input is empty',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the input is read-only',
    },
    'aria-invalid': {
      control: { type: 'boolean' },
      description: 'Whether the input has validation errors',
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'ID of element that describes the input',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the input value changes',
    },
    onFocus: {
      action: 'focused',
      description: 'Function called when the input receives focus',
    },
    onBlur: {
      action: 'blurred',
      description: 'Function called when the input loses focus',
    },
  },
  args: {
    onChange: () => console.log('Input changed'),
    onFocus: () => console.log('Input focused'),
    onBlur: () => console.log('Input blurred'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default input
export const Default: Story = {
  args: {
    placeholder: 'Enter your email address',
    type: 'email',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test basic form control behavior
    await testFormControl(canvas, 'textbox', 'user@example.com');

    // Test email input specific behavior
    await testInputTypes(canvas, 'email', 'test@domain.com');

    // Test placeholder text
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveAttribute('placeholder', 'Enter your email address');
  },
};

// Input types
export const TextInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your full name',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test text input specific behavior
    await testInputTypes(canvas, 'text', 'John Doe');

    // Test various text input scenarios
    const input = canvas.getByRole('textbox');
    await userEvent.clear(input);

    // Test typing special characters
    await userEvent.type(input, 'José María-Smith Jr.');
    await expect(input).toHaveValue('José María-Smith Jr.');

    // Test clearing
    await userEvent.clear(input);
    await expect(input).toHaveValue('');
  },
};

export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'john.doe@company.com',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test password input behavior
    await testInputTypes(canvas, 'password', 'SecurePassword123!');

    const input = canvas.getByPlaceholderText('Enter your password') as HTMLInputElement;

    // Test that password input masks the text (value should be set but not visible as plain text)
    await userEvent.clear(input);
    await userEvent.type(input, 'hidden');
    await expect(input).toHaveValue('hidden');
    await expect(input).toHaveAttribute('type', 'password');
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100,
  },
};

export const TelephoneInput: Story = {
  args: {
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
  },
};

export const UrlInput: Story = {
  args: {
    type: 'url',
    placeholder: 'https://example.com',
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search products...',
  },
};

export const FileInput: Story = {
  args: {
    type: 'file',
    accept: '.pdf,.doc,.docx',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    placeholder: 'This field is disabled',
    disabled: true,
    value: 'Cannot edit this value',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled state
    await testDisabledState(canvas, 'textbox');

    const input = canvas.getByRole('textbox');

    // Test that value is preserved but not editable
    await expect(input).toHaveValue('Cannot edit this value');

    // Attempt to type - should not work
    await userEvent.type(input, 'should not change');
    await expect(input).toHaveValue('Cannot edit this value');

    // Test that input is not focusable through tab
    await userEvent.tab();
    await expect(input).not.toHaveFocus();
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'This is read-only content',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test readonly state
    await testReadOnlyState(canvas, 'This is read-only content');

    const input = canvas.getByRole('textbox');

    // Test that input can be focused but not edited
    await userEvent.click(input);
    await expect(input).toHaveFocus();

    // Test that readonly attribute is present
    await expect(input).toHaveAttribute('readonly');
  },
};

export const Required: Story = {
  args: {
    placeholder: 'This field is required',
    required: true,
    type: 'email',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test required field behavior
    await testRequiredField(canvas);

    const input = canvas.getByRole('textbox');

    // Test form validation behavior
    await userEvent.clear(input);
    await userEvent.tab(); // Blur to trigger validation

    // Test typing valid email
    await userEvent.click(input);
    await userEvent.type(input, 'user@example.com');
    await expect(input).toHaveValue('user@example.com');
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter valid email',
    type: 'email',
    value: 'invalid-email',
    'aria-invalid': true,
    'aria-describedby': 'email-error',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test validation error state
    await testValidationError(canvas, 'textbox');

    const input = canvas.getByRole('textbox');

    // Test that input has error value
    await expect(input).toHaveValue('invalid-email');

    // Test ARIA describedby relationship
    await expect(input).toHaveAttribute('aria-describedby', 'email-error');

    // Test that input shows the invalid value (read-only in this story)
    await expect(input).toHaveValue('invalid-email');
  },
};

// Form integration examples
export const WithLabel: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <label htmlFor="email-input" className="oui:text-sm oui:font-medium">
        Email Address
      </label>
      <Input
        id="email-input"
        type="email"
        placeholder="john.doe@company.com"
        required
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test label association
    await testFormLabelAssociation(canvas, 'email-input', 'Email Address');

    const input = canvas.getByRole('textbox', { name: 'Email Address' });
    const label = canvas.getByText('Email Address');

    // Test that input has accessible name from label
    await expect(input).toHaveAccessibleName('Email Address');

    // Test that input has correct ID
    await expect(input).toHaveAttribute('id', 'email-input');

    // Test clicking label focuses input
    await userEvent.click(label);
    await expect(input).toHaveFocus();

    // Test required field behavior
    await expect(input).toBeRequired();
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with proper label association for accessibility.',
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <label htmlFor="password-input" className="oui:text-sm oui:font-medium">
        Password
      </label>
      <Input
        id="password-input"
        type="password"
        placeholder="Enter your password"
        aria-describedby="password-help"
      />
      <p id="password-help" className="oui:text-sm oui:text-muted-foreground">
        Password must be at least 8 characters long
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with helper text for additional guidance.',
      },
    },
  },
};

export const WithValidationError: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <label htmlFor="email-error-input" className="oui:text-sm oui:font-medium">
        Email Address
      </label>
      <Input
        id="email-error-input"
        type="email"
        placeholder="Enter your email"
        value="invalid-email"
        aria-invalid={true}
        aria-describedby="email-error"
      />
      <p id="email-error" className="oui:text-sm oui:text-destructive">
        Please enter a valid email address
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test error announcement and ARIA relationships
    await testErrorAnnouncement(canvas, 'Please enter a valid email address');

    const input = canvas.getByRole('textbox', { name: 'Email Address' });
    const errorMessage = canvas.getByText('Please enter a valid email address');

    // Test that error message is connected to input
    await expect(errorMessage).toHaveAttribute('id', 'email-error');
    await expect(input).toHaveAttribute('aria-describedby', 'email-error');

    // Test that input has accessible description
    await expect(input).toHaveAccessibleDescription('Please enter a valid email address');

    // Test that input has the error value (read-only in this story)
    await expect(input).toHaveValue('invalid-email');
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with validation error state and error message.',
      },
    },
  },
};

export const WithSuccessState: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <label htmlFor="email-success-input" className="oui:text-sm oui:font-medium">
        Email Address
      </label>
      <Input
        id="email-success-input"
        type="email"
        value="john.doe@company.com"
        aria-describedby="email-success"
        className="oui:border-green-500 oui:focus-visible:border-green-500 oui:focus-visible:ring-green-500/20"
      />
      <p id="email-success" className="oui:text-sm oui:text-green-600">
        Email address is valid
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole('textbox', { name: 'Email Address' });
    const successMessage = canvas.getByText('Email address is valid');

    // Test success state validation
    await testValidationSuccess(canvas, 'textbox', 'Email address is valid');

    // Test that input has valid value
    await expect(input).toHaveValue('john.doe@company.com');

    // Test that success message is connected via aria-describedby
    await expect(input).toHaveAttribute('aria-describedby', 'email-success');
    await expect(successMessage).toHaveAttribute('id', 'email-success');

    // Test that input has accessible description
    await expect(input).toHaveAccessibleDescription('Email address is valid');

    // Test that aria-invalid is false or not present (success state)
    const ariaInvalid = input.getAttribute('aria-invalid');
    if (ariaInvalid !== null) {
      await expect(input).toHaveAttribute('aria-invalid', 'false');
    }

    // Test that user can still edit the field
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with success validation state.',
      },
    },
  },
};

// File input variants
export const FileUpload: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <label htmlFor="file-upload" className="oui:text-sm oui:font-medium">
        Upload Document
      </label>
      <Input
        id="file-upload"
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        aria-describedby="file-help"
      />
      <p id="file-help" className="oui:text-sm oui:text-muted-foreground">
        Accepted formats: PDF, DOC, DOCX, TXT (max 10MB)
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'File input with accepted file types and size guidance.',
      },
    },
  },
};

export const ImageUpload: Story = {
  render: () => (
    <div className="oui:space-y-2">
      <label htmlFor="image-upload" className="oui:text-sm oui:font-medium">
        Profile Picture
      </label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        aria-describedby="image-help"
      />
      <p id="image-help" className="oui:text-sm oui:text-muted-foreground">
        Upload a profile picture (JPG, PNG, GIF)
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'File input specifically for image uploads.',
      },
    },
  },
};

// Showcase stories
export const AllInputTypes: Story = {
  render: () => (
    <div className="oui:grid oui:grid-cols-1 oui:md:grid-cols-2 oui:gap-4 oui:w-full oui:max-w-2xl">
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Text</label>
        <Input type="text" placeholder="Enter text" />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Email</label>
        <Input type="email" placeholder="Enter email" />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Password</label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Number</label>
        <Input type="number" placeholder="Enter number" />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Telephone</label>
        <Input type="tel" placeholder="Enter phone" />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">URL</label>
        <Input type="url" placeholder="Enter URL" />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Search</label>
        <Input type="search" placeholder="Search..." />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">File</label>
        <Input type="file" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available input types displayed together.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="oui:space-y-6 oui:w-full oui:max-w-md">
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Default State</label>
        <Input placeholder="Enter your name" />
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Error State</label>
        <Input
          placeholder="Enter valid email"
          value="invalid-email"
          aria-invalid={true}
        />
        <p className="oui:text-sm oui:text-destructive">Please enter a valid email</p>
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Success State</label>
        <Input
          value="john.doe@company.com"
          className="oui:border-green-500 oui:focus-visible:border-green-500 oui:focus-visible:ring-green-500/20"
        />
        <p className="oui:text-sm oui:text-green-600">Email is valid</p>
      </div>
      <div className="oui:space-y-2">
        <label className="oui:text-sm oui:font-medium">Disabled State</label>
        <Input disabled value="Cannot edit this field" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation and interaction states.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <form className="oui:space-y-4 oui:w-full oui:max-w-md">
      <div className="oui:space-y-2">
        <label htmlFor="form-name" className="oui:text-sm oui:font-medium">
          Full Name *
        </label>
        <Input
          id="form-name"
          type="text"
          placeholder="John Smith"
          required
        />
      </div>
      <div className="oui:space-y-2">
        <label htmlFor="form-email" className="oui:text-sm oui:font-medium">
          Email Address *
        </label>
        <Input
          id="form-email"
          type="email"
          placeholder="john.smith@company.com"
          required
        />
      </div>
      <div className="oui:space-y-2">
        <label htmlFor="form-phone" className="oui:text-sm oui:font-medium">
          Phone Number
        </label>
        <Input
          id="form-phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div className="oui:space-y-2">
        <label htmlFor="form-company" className="oui:text-sm oui:font-medium">
          Company
        </label>
        <Input
          id="form-company"
          type="text"
          placeholder="Acme Corporation"
        />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form example with multiple input types and proper labeling.',
      },
    },
  },
};