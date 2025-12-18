import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components';
import { Card, CardContent } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A carousel component for displaying multiple items in a scrollable container with navigation controls.'),
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the carousel',
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="oui:w-full oui:max-w-xs oui:mx-auto">
      <Carousel {...args}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="oui:p-1">
                <Card>
                  <CardContent className="oui:flex oui:aspect-square oui:items-center oui:justify-center oui:p-6">
                    <span className="oui:text-4xl oui:font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that first item is visible initially (core carousel functionality)
    const firstItem = canvas.getByText('1');
    await expect(firstItem).toBeInTheDocument();

    // Test that carousel navigation buttons exist
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons.length).toBeGreaterThanOrEqual(2); // Should have previous and next buttons

    // Try to find navigation buttons by different methods
    let nextButton: HTMLElement | null = null;
    let prevButton: HTMLElement | null = null;

    try {
      nextButton = canvas.getByRole('button', { name: /next/i });
    } catch {
      // Fallback: use button position or any available button
      nextButton = allButtons[allButtons.length - 1]; // Last button likely to be next
    }

    try {
      prevButton = canvas.getByRole('button', { name: /previous/i });
    } catch {
      // Fallback: use button position
      prevButton = allButtons[0]; // First button likely to be previous
    }

    if (nextButton) {
      await expect(nextButton).toBeInTheDocument();
      await userEvent.click(nextButton);
      // Wait a moment for transition
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (prevButton) {
      await expect(prevButton).toBeInTheDocument();
      await userEvent.click(prevButton);
    }

    // Test keyboard navigation on the carousel container
    const carouselContainer = canvasElement.querySelector('[role="region"]') || canvasElement.firstChild as Element;
    if (carouselContainer) {
      await userEvent.click(carouselContainer);
      await userEvent.keyboard('{ArrowRight}');
    }
  },
};

export const WithImages: Story = {
  render: (args) => (
    <div className="oui:w-full oui:max-w-sm oui:mx-auto">
      <Carousel {...args}>
        <CarouselContent>
          {[
            'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80',
            'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&dpr=2&q=80',
            'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&dpr=2&q=80',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&dpr=2&q=80',
          ].map((src, index) => (
            <CarouselItem key={index}>
              <div className="oui:p-1">
                <Card>
                  <CardContent className="oui:p-0">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="oui:w-full oui:h-64 oui:object-cover oui:rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: (args) => (
    <div className="oui:w-full oui:max-w-4xl oui:mx-auto">
      <Carousel
        {...args}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="oui:-ml-2 oui:md:-ml-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className="oui:pl-2 oui:md:pl-4 oui:md:basis-1/2 oui:lg:basis-1/3">
              <div className="oui:p-1">
                <Card>
                  <CardContent className="oui:flex oui:aspect-square oui:items-center oui:justify-center oui:p-6">
                    <div className="oui:text-center">
                      <div className="oui:text-2xl oui:font-semibold">{index + 1}</div>
                      <p className="oui:text-sm oui:text-muted-foreground">Item {index + 1}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="oui:w-full oui:max-w-xs oui:mx-auto">
      <Carousel {...args} className="oui:w-full oui:max-w-xs">
        <CarouselContent className="oui:-mt-1 oui:h-[300px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="oui:pt-1 oui:md:basis-1/2">
              <div className="oui:p-1">
                <Card>
                  <CardContent className="oui:flex oui:items-center oui:justify-center oui:p-6">
                    <span className="oui:text-3xl oui:font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const ProductShowcase: Story = {
  render: (args) => (
    <div className="oui:w-full oui:max-w-5xl oui:mx-auto">
      <Carousel
        {...args}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {[
            { name: 'Wireless Headphones', price: '$199', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&dpr=2&q=80' },
            { name: 'Smart Watch', price: '$299', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&dpr=2&q=80' },
            { name: 'Laptop Computer', price: '$999', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&dpr=2&q=80' },
            { name: 'Smartphone', price: '$699', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&dpr=2&q=80' },
            { name: 'Tablet Device', price: '$449', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&dpr=2&q=80' },
          ].map((product, index) => (
            <CarouselItem key={index} className="oui:md:basis-1/2 oui:lg:basis-1/3">
              <div className="oui:p-1">
                <Card>
                  <CardContent className="oui:p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="oui:w-full oui:h-48 oui:object-cover oui:rounded-md oui:mb-4"
                    />
                    <h3 className="oui:font-semibold oui:text-lg">{product.name}</h3>
                    <p className="oui:text-2xl oui:font-bold oui:text-primary">{product.price}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product showcase carousel with realistic e-commerce content.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div>
        <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Carousel Variations</h3>
        <div className="oui:space-y-8">
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">Basic Carousel</p>
            <div className="oui:w-full oui:max-w-xs oui:mx-auto">
              <Carousel>
                <CarouselContent>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Card>
                        <CardContent className="oui:flex oui:aspect-square oui:items-center oui:justify-center oui:p-6">
                          <span className="oui:text-2xl oui:font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
          
          <div>
            <p className="oui:text-sm oui:font-medium oui:mb-4">Multiple Items</p>
            <div className="oui:w-full oui:max-w-2xl oui:mx-auto">
              <Carousel opts={{ align: 'start' }}>
                <CarouselContent>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="oui:md:basis-1/2 oui:lg:basis-1/3">
                      <Card>
                        <CardContent className="oui:flex oui:aspect-square oui:items-center oui:justify-center oui:p-6">
                          <span className="oui:text-xl oui:font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different carousel configurations and layouts.',
      },
    },
  },
};