import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components';

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
};

// Input types
export const TextInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your full name',
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
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'This is read-only content',
  },
};

export const Required: Story = {
  args: {
    placeholder: 'This field is required',
    required: true,
    type: 'email',
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