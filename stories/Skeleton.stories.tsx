import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/components';
import { Card, CardContent, CardHeader } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A skeleton component that shows placeholder content while data is loading.'),
  },
  tags: ['autodocs'],
  argTypes: {
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
      <Skeleton className="oui:h-4 oui:w-[250px]" {...args} />
      <Skeleton className="oui:h-4 oui:w-[200px]" {...args} />
    </div>
  ),
};

export const UserCard: Story = {
  render: (args) => (
    <div className="oui:w-[350px]">
      <div className="oui:flex oui:items-center oui:space-x-4">
        <Skeleton className="oui:h-12 oui:w-12 oui:rounded-full" {...args} />
        <div className="oui:space-y-2">
          <Skeleton className="oui:h-4 oui:w-[250px]" {...args} />
          <Skeleton className="oui:h-4 oui:w-[200px]" {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a user card with avatar.',
      },
    },
  },
};

export const ArticleCard: Story = {
  render: (args) => (
    <div className="oui:w-[400px]">
      <Card>
        <CardHeader>
          <div className="oui:space-y-2">
            <Skeleton className="oui:h-4 oui:w-3/4" {...args} />
            <Skeleton className="oui:h-3 oui:w-1/2" {...args} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="oui:space-y-2">
            <Skeleton className="oui:h-[200px] oui:w-full oui:rounded-md" {...args} />
            <div className="oui:space-y-2">
              <Skeleton className="oui:h-3 oui:w-full" {...args} />
              <Skeleton className="oui:h-3 oui:w-full" {...args} />
              <Skeleton className="oui:h-3 oui:w-2/3" {...args} />
            </div>
            <div className="oui:flex oui:items-center oui:space-x-2 oui:pt-2">
              <Skeleton className="oui:h-6 oui:w-6 oui:rounded-full" {...args} />
              <Skeleton className="oui:h-3 oui:w-20" {...args} />
              <Skeleton className="oui:h-3 oui:w-16" {...args} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for an article card with image and metadata.',
      },
    },
  },
};

export const UserProfile: Story = {
  render: (args) => (
    <div className="oui:w-[300px] oui:space-y-6">
      <div className="oui:flex oui:flex-col oui:items-center oui:space-y-4">
        <Skeleton className="oui:h-24 oui:w-24 oui:rounded-full" {...args} />
        <div className="oui:space-y-2 oui:text-center">
          <Skeleton className="oui:h-6 oui:w-32 oui:mx-auto" {...args} />
          <Skeleton className="oui:h-4 oui:w-24 oui:mx-auto" {...args} />
        </div>
      </div>

      <div className="oui:space-y-4">
        <div className="oui:space-y-2">
          <Skeleton className="oui:h-4 oui:w-16" {...args} />
          <Skeleton className="oui:h-8 oui:w-full" {...args} />
        </div>
        <div className="oui:space-y-2">
          <Skeleton className="oui:h-4 oui:w-12" {...args} />
          <Skeleton className="oui:h-8 oui:w-full" {...args} />
        </div>
        <div className="oui:space-y-2">
          <Skeleton className="oui:h-4 oui:w-20" {...args} />
          <Skeleton className="oui:h-20 oui:w-full" {...args} />
        </div>
      </div>

      <div className="oui:flex oui:space-x-2">
        <Skeleton className="oui:h-10 oui:flex-1" {...args} />
        <Skeleton className="oui:h-10 oui:flex-1" {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a user profile form.',
      },
    },
  },
};

export const DataTable: Story = {
  render: (args) => (
    <div className="oui:w-[600px] oui:space-y-4">
      <div className="oui:flex oui:items-center oui:justify-between">
        <Skeleton className="oui:h-8 oui:w-[200px]" {...args} />
        <Skeleton className="oui:h-8 oui:w-[100px]" {...args} />
      </div>

      <div className="oui:space-y-3">
        <div className="oui:grid oui:grid-cols-4 oui:gap-4">
          <Skeleton className="oui:h-4 oui:w-full" {...args} />
          <Skeleton className="oui:h-4 oui:w-full" {...args} />
          <Skeleton className="oui:h-4 oui:w-full" {...args} />
          <Skeleton className="oui:h-4 oui:w-full" {...args} />
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="oui:grid oui:grid-cols-4 oui:gap-4">
            <Skeleton className="oui:h-6 oui:w-full" {...args} />
            <Skeleton className="oui:h-6 oui:w-full" {...args} />
            <Skeleton className="oui:h-6 oui:w-full" {...args} />
            <Skeleton className="oui:h-6 oui:w-full" {...args} />
          </div>
        ))}
      </div>

      <div className="oui:flex oui:items-center oui:justify-between">
        <Skeleton className="oui:h-4 oui:w-[100px]" {...args} />
        <div className="oui:flex oui:space-x-2">
          <Skeleton className="oui:h-8 oui:w-8" {...args} />
          <Skeleton className="oui:h-8 oui:w-8" {...args} />
          <Skeleton className="oui:h-8 oui:w-8" {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a data table with pagination.',
      },
    },
  },
};

export const Dashboard: Story = {
  render: (args) => (
    <div className="oui:w-[800px] oui:space-y-6">
      <div className="oui:space-y-2">
        <Skeleton className="oui:h-8 oui:w-[200px]" {...args} />
        <Skeleton className="oui:h-4 oui:w-[300px]" {...args} />
      </div>

      <div className="oui:grid oui:grid-cols-1 oui:md:grid-cols-3 oui:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="oui:p-6">
              <div className="oui:space-y-2">
                <Skeleton className="oui:h-4 oui:w-[100px]" {...args} />
                <Skeleton className="oui:h-8 oui:w-[80px]" {...args} />
                <Skeleton className="oui:h-3 oui:w-[120px]" {...args} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="oui:grid oui:grid-cols-1 oui:md:grid-cols-2 oui:gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="oui:h-6 oui:w-[150px]" {...args} />
          </CardHeader>
          <CardContent>
            <Skeleton className="oui:h-[200px] oui:w-full" {...args} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="oui:h-6 oui:w-[120px]" {...args} />
          </CardHeader>
          <CardContent>
            <div className="oui:space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="oui:flex oui:items-center oui:space-x-3">
                  <Skeleton className="oui:h-8 oui:w-8 oui:rounded-full" {...args} />
                  <div className="oui:space-y-1 oui:flex-1">
                    <Skeleton className="oui:h-3 oui:w-full" {...args} />
                    <Skeleton className="oui:h-3 oui:w-2/3" {...args} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state for a complete dashboard layout.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Skeleton Examples</h3>
        <div className="oui:space-y-6">
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">Basic Skeletons</p>
            <div className="oui:space-y-2">
              <Skeleton className="oui:h-4 oui:w-[250px]" />
              <Skeleton className="oui:h-4 oui:w-[200px]" />
              <Skeleton className="oui:h-4 oui:w-[150px]" />
            </div>
          </div>

          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">User Card</p>
            <div className="oui:flex oui:items-center oui:space-x-4">
              <Skeleton className="oui:h-12 oui:w-12 oui:rounded-full" />
              <div className="oui:space-y-2">
                <Skeleton className="oui:h-4 oui:w-[200px]" />
                <Skeleton className="oui:h-4 oui:w-[150px]" />
              </div>
            </div>
          </div>

          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">Content Card</p>
            <div className="oui:w-[300px] oui:space-y-3">
              <Skeleton className="oui:h-[120px] oui:w-full oui:rounded-md" />
              <div className="oui:space-y-2">
                <Skeleton className="oui:h-4 oui:w-full" />
                <Skeleton className="oui:h-4 oui:w-4/5" />
                <Skeleton className="oui:h-4 oui:w-3/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different skeleton loading patterns and layouts.',
      },
    },
  },
};