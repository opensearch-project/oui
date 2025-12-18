import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { Input } from '@/components';
import { Button } from '@/components';
import { Textarea } from '@/components';
import { Checkbox } from '@/components';
import { RadioGroup, RadioGroupItem } from '@/components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A form component with validation and field management capabilities.'),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a oui:valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const Default: Story = {
  render: () => {
    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
        username: "",
        email: "",
        bio: "",
      },
    });

    function onSubmit(data: ProfileFormValues) {
      console.log(data);
    }

    return (
      <div className="oui:w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="oui:space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="oui:resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that form elements exist
    const usernameInput = canvas.getByPlaceholderText('shadcn');
    const emailInput = canvas.getByPlaceholderText('you@example.com');
    const bioInput = canvas.getByPlaceholderText('Tell us a little bit about yourself');
    const submitButton = canvas.getByRole('button', { name: /update profile/i });

    await expect(usernameInput).toBeInTheDocument();
    await expect(emailInput).toBeInTheDocument();
    await expect(bioInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();

    // Test form interaction - type in fields to test validation logic
    await userEvent.type(usernameInput, 'a'); // Too short
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, 'validuser'); // Valid

    // Test email validation
    await userEvent.type(emailInput, 'invalid');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com'); // Valid

    // Test bio field
    await userEvent.type(bioInput, 'This is a test bio that meets the minimum requirements');

    // Test that submit button is clickable
    await userEvent.click(submitButton);
  },
};

const settingsFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    message: "Please select a theme.",
  }),
  notifications: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export const WithSelectAndCheckbox: Story = {
  render: () => {
    const form = useForm<SettingsFormValues>({
      resolver: zodResolver(settingsFormSchema),
      defaultValues: {
        theme: "light",
        notifications: true,
        marketing_emails: false,
        security_emails: true,
      },
    });

    function onSubmit(data: SettingsFormValues) {
      console.log(data);
    }

    return (
      <div className="oui:w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="oui:space-y-8">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose your preferred theme for the interface.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="oui:flex oui:flex-row oui:items-start oui:space-x-3 oui:space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="oui:space-y-1 oui:leading-none">
                    <FormLabel>
                      Push notifications
                    </FormLabel>
                    <FormDescription>
                      Receive push notifications on your device.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketing_emails"
              render={({ field }) => (
                <FormItem className="oui:flex oui:flex-row oui:items-start oui:space-x-3 oui:space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="oui:space-y-1 oui:leading-none">
                    <FormLabel>
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security_emails"
              render={({ field }) => (
                <FormItem className="oui:flex oui:flex-row oui:items-start oui:space-x-3 oui:space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="oui:space-y-1 oui:leading-none">
                    <FormLabel>
                      Security emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit">Update preferences</Button>
          </form>
        </Form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with select dropdown and checkbox inputs.',
      },
    },
  },
};

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  priority: z.enum(["low", "medium", "high"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const WithRadioGroup: Story = {
  render: () => {
    const form = useForm<ContactFormValues>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: {
        name: "",
        email: "",
        subject: "",
        priority: "medium",
        message: "",
      },
    });

    function onSubmit(data: ContactFormValues) {
      console.log(data);
    }

    return (
      <div className="oui:w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="oui:space-y-6">
            <div className="oui:grid oui:grid-cols-2 oui:gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="What's this about?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="oui:space-y-3">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="oui:flex oui:flex-col oui:space-y-1"
                    >
                      <FormItem className="oui:flex oui:items-center oui:space-x-3 oui:space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="oui:font-normal">
                          Low - General inquiry
                        </FormLabel>
                      </FormItem>
                      <FormItem className="oui:flex oui:items-center oui:space-x-3 oui:space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="oui:font-normal">
                          Medium - Need assistance
                        </FormLabel>
                      </FormItem>
                      <FormItem className="oui:flex oui:items-center oui:space-x-3 oui:space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="oui:font-normal">
                          High - Urgent issue
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      className="oui:resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide as much detail as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="oui:w-full">Send Message</Button>
          </form>
        </Form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact form with radio group for priority selection.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        username: "",
        email: "",
        notifications: true,
      },
    });

    return (
      <div className="oui:space-y-8">
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Form Examples</h3>
          <div className="oui:w-[400px]">
            <Form {...form}>
              <form className="oui:space-y-6">
                <FormField
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a unique username.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="notifications"
                  render={({ field }) => (
                    <FormItem className="oui:flex oui:flex-row oui:items-start oui:space-x-3 oui:space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="oui:space-y-1 oui:leading-none">
                        <FormLabel>Email notifications</FormLabel>
                        <FormDescription>
                          Receive email updates and notifications.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic form components and layouts.',
      },
    },
  },
};