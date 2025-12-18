import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof AspectRatio> = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A wrapper component that maintains a specific aspect ratio for its content, commonly used for responsive images and media.'),
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'The desired aspect ratio (width/height)',
    },
  },
  args: {
    ratio: 16 / 9,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="oui:w-[450px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="oui:rounded-md oui:object-cover oui:w-full oui:h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: (args) => (
    <div className="oui:w-[300px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&dpr=2&q=80"
          alt="Photo by Pawel Czerwinski"
          className="oui:rounded-md oui:object-cover oui:w-full oui:h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: (args) => (
    <div className="oui:w-[300px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&dpr=2&q=80"
          alt="Photo by Milad Fakurian"
          className="oui:rounded-md oui:object-cover oui:w-full oui:h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const VideoRatio: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="oui:w-[500px]">
      <AspectRatio {...args}>
        <div className="oui:flex oui:items-center oui:justify-center oui:w-full oui:h-full oui:bg-muted oui:rounded-md">
          <div className="oui:text-center">
            <div className="oui:text-4xl oui:mb-2">▶️</div>
            <p className="oui:text-sm oui:text-muted-foreground">Video Content</p>
            <p className="oui:text-xs oui:text-muted-foreground">16:9 Aspect Ratio</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:space-y-6">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-3">Common Aspect Ratios</h3>
        <div className="oui:grid oui:grid-cols-2 oui:gap-4 oui:max-w-2xl">
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-2">16:9 (Widescreen)</p>
            <AspectRatio ratio={16 / 9}>
              <div className="oui:flex oui:items-center oui:justify-center oui:w-full oui:h-full oui:bg-blue-100 oui:rounded-md">
                <span className="oui:text-sm oui:text-blue-800">16:9</span>
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-2">4:3 (Standard)</p>
            <AspectRatio ratio={4 / 3}>
              <div className="oui:flex oui:items-center oui:justify-center oui:w-full oui:h-full oui:bg-green-100 oui:rounded-md">
                <span className="oui:text-sm oui:text-green-800">4:3</span>
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-2">1:1 (Square)</p>
            <AspectRatio ratio={1}>
              <div className="oui:flex oui:items-center oui:justify-center oui:w-full oui:h-full oui:bg-purple-100 oui:rounded-md">
                <span className="oui:text-sm oui:text-purple-800">1:1</span>
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-2">3:4 (Portrait)</p>
            <AspectRatio ratio={3 / 4}>
              <div className="oui:flex oui:items-center oui:justify-center oui:w-full oui:h-full oui:bg-orange-100 oui:rounded-md">
                <span className="oui:text-sm oui:text-orange-800">3:4</span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common aspect ratios used in web design and media.',
      },
    },
  },
};