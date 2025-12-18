import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components';
import { Toaster } from '@/components';
import { toast } from 'sonner';

// Create a wrapper component for the stories
const ToastDemo = () => <div />;

const meta: Meta<typeof ToastDemo> = {
  title: 'UI/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Single comprehensive showcase story
export const ToastShowcase: Story = {
  render: () => (
    <div className="oui:space-y-8 oui:max-w-4xl">
      <Toaster />

      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Toast Types</h3>
        <div className="oui:flex oui:flex-wrap oui:gap-4">
          <Button
            onClick={() => toast('Changes saved successfully')}
          >
            Default
          </Button>
          <Button
            onClick={() => toast.success('Profile updated successfully')}
          >
            Success
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error('Failed to save changes. Please try again.')}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning('Your session will expire in 5 minutes')}
          >
            Warning
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.info('New features are now available')}
          >
            Info
          </Button>
          <Button
            onClick={() => toast.loading('Uploading file...')}
          >
            Loading
          </Button>
        </div>
      </div>

      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Advanced Features</h3>
        <div className="oui:flex oui:flex-wrap oui:gap-4">
          <Button
            onClick={() =>
              toast('Email sent successfully', {
                action: (
                  <Button
                    size="sm"
                    onClick={() => toast('Email sending cancelled')}
                  >
                    Undo
                  </Button>
                ),
              })
            }
          >
            With Action
          </Button>
          <Button
            onClick={() =>
              toast('New message received', {
                description: 'John Smith sent you a message about the project update.',
              })
            }
          >
            With Description
          </Button>
          <Button
            onClick={() => {
              const loadingToast = toast.loading('Saving changes...');
              setTimeout(() => {
                toast.dismiss(loadingToast);
                if (Math.random() > 0.5) {
                  toast.success('Changes saved successfully');
                } else {
                  toast.error('Failed to save changes');
                }
              }, 2000);
            }}
          >
            Promise Toast
          </Button>
          <Button
            onClick={() =>
              toast('Custom styled toast', {
                style: {
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                },
              })
            }
          >
            Custom Styling
          </Button>
        </div>
      </div>

      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Positions</h3>
        <div className="oui:grid oui:grid-cols-3 oui:gap-4">
          <Button
            size="sm"
            onClick={() => toast('Top Left', { position: 'top-left' })}
          >
            Top Left
          </Button>
          <Button
            size="sm"
            onClick={() => toast('Top Center', { position: 'top-center' })}
          >
            Top Center
          </Button>
          <Button
            size="sm"
            onClick={() => toast('Top Right', { position: 'top-right' })}
          >
            Top Right
          </Button>
          <Button
            size="sm"
            onClick={() => toast('Bottom Left', { position: 'bottom-left' })}
          >
            Bottom Left
          </Button>
          <Button
            size="sm"
            onClick={() => toast('Bottom Center', { position: 'bottom-center' })}
          >
            Bottom Center
          </Button>
          <Button
            size="sm"
            onClick={() => toast('Bottom Right', { position: 'bottom-right' })}
          >
            Bottom Right
          </Button>
        </div>
      </div>

      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Real-world Examples</h3>
        <div className="oui:flex oui:flex-wrap oui:gap-4">
          <Button
            onClick={() =>
              toast.success('Event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
                action: (
                  <Button
                    size="sm"
                    onClick={() => toast('Event creation undone')}
                  >
                    Undo
                  </Button>
                ),
              })
            }
          >
            Event Created
          </Button>
          <Button
            onClick={() =>
              toast('Scheduled: Catch up', {
                description: 'Friday, February 10, 2023 at 5:30 PM',
              })
            }
          >
            Scheduled Event
          </Button>
          <Button
            onClick={() =>
              toast.error('Something went wrong', {
                description: 'Your request could not be processed',
                action: (
                  <Button
                    size="sm"
                    onClick={() => toast('Retrying...')}
                  >
                    Try again
                  </Button>
                ),
              })
            }
          >
            Error with Action
          </Button>
          <Button
            onClick={() =>
              toast('File uploaded successfully', {
                description: 'document.pdf has been uploaded to your drive',
                duration: 6000,
              })
            }
          >
            File Upload
          </Button>
          <Button
            onClick={() =>
              toast.warning('Storage almost full', {
                description: 'You have used 95% of your available storage',
                action: (
                  <Button
                    size="sm"
                    onClick={() => toast('Redirecting to upgrade...')}
                  >
                    Upgrade
                  </Button>
                ),
              })
            }
          >
            Storage Warning
          </Button>
          <Button
            onClick={() =>
              toast.info('New update available', {
                description: 'Version 2.1.0 is now available for download',
                action: (
                  <Button
                    size="sm"
                    onClick={() => toast.loading('Downloading update...')}
                  >
                    Update
                  </Button>
                ),
              })
            }
          >
            Update Available
          </Button>
          <Button
            onClick={() =>
              toast('Event has been created', {
                action: (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toast('Event creation cancelled')}
                  >
                    Cancel
                  </Button>
                ),
              })
            }
          >
            With Cancel Button
          </Button>
          <Button
            onClick={() =>
              toast.loading('Loading', {
                duration: 3000,
              })
            }
          >
            Loading Toast
          </Button>
        </div>
      </div>

      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Duration & Persistence</h3>
        <div className="oui:flex oui:flex-wrap oui:gap-4">
          <Button
            onClick={() =>
              toast('Quick message', {
                duration: 1000,
              })
            }
          >
            Short Duration (1s)
          </Button>
          <Button
            onClick={() =>
              toast('Standard message', {
                duration: 4000,
              })
            }
          >
            Standard Duration (4s)
          </Button>
          <Button
            onClick={() =>
              toast('Important message', {
                duration: 10000,
              })
            }
          >
            Long Duration (10s)
          </Button>
          <Button
            onClick={() =>
              toast('Persistent message', {
                duration: Infinity,
              })
            }
          >
            Persistent (Manual dismiss)
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all toast functionality using Sonner. This demonstrates all toast types, positions, advanced features, and provides usage examples. Click any button to see the corresponding toast notification.',
      },
    },
  },
};