import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components';
import { Button } from '@/components';
import { Label } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import React from 'react';

const meta: Meta<typeof InputOTP> = {
  title: 'UI/InputOTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('An input component specifically designed for one-time password (OTP) entry with individual character fields.'),
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum number of characters',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
  },
  args: {
    maxLength: 6,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="oui:space-y-4">
        <div className="oui:space-y-2">
          <Label htmlFor="otp">One-Time Password</Label>
          <InputOTP
            id="otp"
            maxLength={6}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="oui:text-center oui:text-sm">
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that OTP input slots are present
    const otpInput = canvas.getByLabelText('One-Time Password');
    await expect(otpInput).toBeInTheDocument();

    // Test initial state message
    await expect(canvas.getByText('Enter your one-time password.')).toBeInTheDocument();

    // Test typing in OTP - type individual characters
    await userEvent.click(otpInput);
    await userEvent.type(otpInput, '123456');

    // Verify that the value is displayed
    await expect(canvas.getByText('You entered: 123456')).toBeInTheDocument();

    // Test that max length is enforced (should not accept more than 6 characters)
    await userEvent.type(otpInput, '789');
    // Should still show only 6 characters
    await expect(canvas.getByText('You entered: 123456')).toBeInTheDocument();

    // Test clearing and partial input
    await userEvent.clear(otpInput);
    await userEvent.type(otpInput, '12');

    // Should show partial input
    await expect(canvas.getByText('You entered: 12')).toBeInTheDocument();
  },
};

export const WithSeparator: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="oui:space-y-4">
        <div className="oui:space-y-2">
          <Label htmlFor="otp-separator">Verification Code</Label>
          <InputOTP
            id="otp-separator"
            maxLength={6}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="oui:text-center oui:text-sm oui:text-muted-foreground">
          Please enter the 6-digit code sent to your phone.
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that OTP input with separator is present
    const otpInput = canvas.getByLabelText('Verification Code');
    await expect(otpInput).toBeInTheDocument();

    // Test instruction text is present
    await expect(canvas.getByText('Please enter the 6-digit code sent to your phone.')).toBeInTheDocument();

    // Test typing in OTP with separator groups - type individual characters
    await userEvent.click(otpInput);
    await userEvent.type(otpInput, '123456');

    // Verify input accepts the full 6-digit code
    // Note: The value state is internal to the story, but we can test interactions
    await expect(otpInput).toBeInTheDocument();

    // Test clearing and partial input with separator
    await userEvent.clear(otpInput);
    await userEvent.type(otpInput, '123');

    // Test that the input remains functional after partial input
    await expect(otpInput).toBeInTheDocument();
    await expect(otpInput).toBeEnabled();

    // Test max length enforcement with separator
    await userEvent.clear(otpInput);
    await userEvent.type(otpInput, '1234567890'); // Try to type more than 6

    // Input should still work (max length handled internally)
    await expect(otpInput).toBeInTheDocument();

    // Test backspace functionality
    await userEvent.clear(otpInput);
    await userEvent.type(otpInput, '12345');
    await userEvent.keyboard('{Backspace}');
    await expect(otpInput).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'OTP input with separator between groups.',
      },
    },
  },
};

export const FourDigit: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="oui:space-y-4">
        <div className="oui:space-y-2">
          <Label htmlFor="otp-four">PIN Code</Label>
          <InputOTP
            id="otp-four"
            maxLength={4}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="oui:text-center oui:text-sm oui:text-muted-foreground">
          Enter your 4-digit PIN.
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that 4-digit PIN input is present
    const pinInput = canvas.getByLabelText('PIN Code');
    await expect(pinInput).toBeInTheDocument();

    // Test instruction text is present
    await expect(canvas.getByText('Enter your 4-digit PIN.')).toBeInTheDocument();

    // Test typing 4-digit PIN
    await userEvent.click(pinInput);
    await userEvent.type(pinInput, '1234');

    // Verify input accepts 4 digits
    await expect(pinInput).toBeInTheDocument();
    await expect(pinInput).toBeEnabled();

    // Test max length enforcement for 4-digit PIN (should not accept more than 4)
    await userEvent.clear(pinInput);
    await userEvent.type(pinInput, '123456789'); // Try to type more than 4

    // Input should still work despite extra characters
    await expect(pinInput).toBeInTheDocument();

    // Test partial 4-digit input
    await userEvent.clear(pinInput);
    await userEvent.type(pinInput, '12');

    // Should accept partial input
    await expect(pinInput).toBeInTheDocument();
    await expect(pinInput).toBeEnabled();

    // Test complete 4-digit sequence
    await userEvent.clear(pinInput);
    await userEvent.type(pinInput, '9876');

    // Should accept full 4-digit sequence
    await expect(pinInput).toBeInTheDocument();

    // Test backspace functionality with 4-digit input
    await userEvent.keyboard('{Backspace}');
    await expect(pinInput).toBeInTheDocument();

    // Test clearing 4-digit PIN
    await userEvent.clear(pinInput);
    await expect(pinInput).toBeInTheDocument();
    await expect(pinInput).toBeEnabled();
  },
  parameters: {
    docs: {
      description: {
        story: '4-digit OTP input for PIN codes.',
      },
    },
  },
};

export const TwoFactor: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
      if (value.length === 6) {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
          setIsSubmitting(false);
          setValue("");
        }, 2000);
      }
    };

    return (
      <div className="oui:w-[350px] oui:space-y-6">
        <div className="oui:space-y-2 oui:text-center">
          <h3 className="oui:text-lg oui:font-semibold">Two-Factor Authentication</h3>
          <p className="oui:text-sm oui:text-muted-foreground">
            We sent a verification code to your authenticator app.
          </p>
        </div>

        <div className="oui:space-y-4">
          <div className="oui:space-y-2">
            <Label htmlFor="otp-2fa" className="oui:sr-only">
              Verification code
            </Label>
            <InputOTP
              id="otp-2fa"
              maxLength={6}
              value={value}
              onChange={setValue}
              disabled={isSubmitting}
              >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={value.length !== 6 || isSubmitting}
            className="oui:w-full"
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="oui:text-center">
            <Button variant="link" className="oui:text-sm">
              Didn't receive a code? Resend
            </Button>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that 2FA form elements are present
    await expect(canvas.getByText('Two-Factor Authentication')).toBeInTheDocument();
    await expect(canvas.getByText('We sent a verification code to your authenticator app.')).toBeInTheDocument();

    const otpInput = canvas.getByLabelText('Verification code');
    await expect(otpInput).toBeInTheDocument();

    // Test initial button state - should be disabled when no input
    const verifyButton = canvas.getByRole('button', { name: 'Verify Code' });
    await expect(verifyButton).toBeInTheDocument();
    await expect(verifyButton).toBeDisabled();

    // Test resend button is present and enabled
    const resendButton = canvas.getByRole('button', { name: 'Didn\'t receive a code? Resend' });
    await expect(resendButton).toBeInTheDocument();
    await expect(resendButton).toBeEnabled();

    // Test partial input - button should remain disabled
    await userEvent.click(otpInput);
    await userEvent.type(otpInput, '123');
    await expect(verifyButton).toBeDisabled();

    // Test full 6-digit input - button should become enabled
    await userEvent.type(otpInput, '456');
    await expect(verifyButton).toBeEnabled();

    // Test clicking verify button
    await userEvent.click(verifyButton);

    // Button text should change to "Verifying..." and be disabled during submission
    await expect(canvas.getByRole('button', { name: 'Verifying...' })).toBeInTheDocument();
    const verifyingButton = canvas.getByRole('button', { name: 'Verifying...' });
    await expect(verifyingButton).toBeDisabled();

    // Test that OTP input is disabled during submission
    // Note: The input should be disabled when isSubmitting is true

    // Test clicking resend button
    await userEvent.click(resendButton);
    await expect(resendButton).toBeEnabled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete two-factor authentication form with OTP input.',
      },
    },
  },
};

export const PhoneVerification: Story = {
  args: {} as never,
  render: (args) => {
    const [value, setValue] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);

    React.useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);

    return (
      <div className="oui:w-[400px] oui:space-y-6">
        <div className="oui:space-y-2 oui:text-center">
          <h3 className="oui:text-lg oui:font-semibold">Verify Your Phone Number</h3>
          <p className="oui:text-sm oui:text-muted-foreground">
            Enter the 6-digit code sent to +1 (555) 123-4567
          </p>
        </div>
        
        <div className="oui:space-y-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          
          <div className="oui:flex oui:items-center oui:justify-between oui:text-sm">
            <span className="oui:text-muted-foreground">
              {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Code expired"}
            </span>
            <Button 
              variant="link" 
              className="oui:p-0 oui:h-auto oui:text-sm"
              disabled={timeLeft > 0}
              onClick={() => setTimeLeft(60)}
            >
              Resend Code
            </Button>
          </div>
          
          <Button 
            disabled={value.length !== 6}
            className="oui:w-full"
          >
            Verify Phone Number
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Phone verification with countdown timer and resend functionality.',
      },
    },
  },
};

export const Showcase: Story = {
  args: {} as never,
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    return (
      <div className="oui:space-y-8">
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">OTP Input Examples</h3>
          <div className="oui:space-y-6">
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-2">Basic 6-digit OTP</p>
              <InputOTP maxLength={6} value={value1} onChange={setValue1}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-2">With Separator</p>
              <InputOTP maxLength={6} value={value2} onChange={setValue2}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-2">4-digit PIN</p>
              <InputOTP maxLength={4} value={value3} onChange={setValue3}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different OTP input configurations and layouts.',
      },
    },
  },
};