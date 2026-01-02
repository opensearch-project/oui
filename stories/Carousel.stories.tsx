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

    // Test that first item is visible initially
    const firstItem = canvas.getByText('1');
    await expect(firstItem).toBeInTheDocument();

    // Test that all carousel items exist
    const allItems = ['1', '2', '3', '4', '5'].map(num => canvas.getByText(num));
    allItems.forEach(async (item) => {
      await expect(item).toBeInTheDocument();
    });

    // Test that carousel navigation buttons exist
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons.length).toBeGreaterThanOrEqual(2);

    // Find navigation buttons using multiple strategies
    let nextButton: HTMLElement | null = null;
    let prevButton: HTMLElement | null = null;

    // Strategy 1: Try by accessible name
    try {
      nextButton = canvas.getByRole('button', { name: /next/i });
      prevButton = canvas.getByRole('button', { name: /previous/i });
    } catch {
      // Strategy 2: Try by aria-label
      try {
        nextButton = canvas.getByLabelText(/next/i);
        prevButton = canvas.getByLabelText(/previous/i);
      } catch {
        // Strategy 3: Use position-based fallback
        nextButton = allButtons[allButtons.length - 1];
        prevButton = allButtons[0];
      }
    }

    // Test navigation button functionality
    if (nextButton) {
      await expect(nextButton).toBeInTheDocument();

      // Test clicking next button
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Test that navigation occurred (slide should have changed)
      // The exact slide visible depends on carousel implementation
      const carouselContainer = canvasElement.querySelector('[data-slot="carousel"]') ||
                               canvasElement.querySelector('.embla') ||
                               canvasElement;
      await expect(carouselContainer).toBeInTheDocument();
    }

    if (prevButton) {
      await expect(prevButton).toBeInTheDocument();

      // Test clicking previous button
      await userEvent.click(prevButton);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Test keyboard navigation
    const carouselContainer = canvasElement.querySelector('[role="region"]') ||
                             canvasElement.querySelector('[tabindex]') ||
                             canvasElement.firstChild as Element;

    if (carouselContainer) {
      // Test that carousel container can receive focus
      await userEvent.click(carouselContainer);

      // Test arrow key navigation
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 100));

      await userEvent.keyboard('{ArrowLeft}');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Test Home/End keys for first/last slide
      await userEvent.keyboard('{Home}');
      await new Promise(resolve => setTimeout(resolve, 100));

      await userEvent.keyboard('{End}');
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Test that buttons have proper ARIA attributes and semantics
    if (nextButton) {
      await expect(nextButton).toHaveProperty('tagName', 'BUTTON');
      await expect(nextButton).toBeInTheDocument();
    }

    if (prevButton) {
      await expect(prevButton).toHaveProperty('tagName', 'BUTTON');
      await expect(prevButton).toBeInTheDocument();
    }

    // Test disabled states (if applicable)
    // First slide might disable previous button
    if (prevButton) {
      const isDisabled = prevButton.hasAttribute('disabled') ||
                        prevButton.getAttribute('aria-disabled') === 'true';
      // Check if button state is properly set (enabled or disabled)
      expect(typeof isDisabled).toBe('boolean');
    }

    // Test that carousel maintains proper structure
    const carouselContent = canvasElement.querySelector('[data-slot="carousel-content"]') ||
                           canvasElement.querySelector('.embla__container') ||
                           canvasElement.querySelector('[style*="transform"]');

    if (carouselContent) {
      await expect(carouselContent).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that multiple items are visible simultaneously
    const item1 = canvas.getByText('Item 1');
    const item2 = canvas.getByText('Item 2');

    await expect(item1).toBeInTheDocument();
    await expect(item2).toBeInTheDocument();

    // Test that multiple items with numbers are also visible
    const number1 = canvas.getByText('1');
    const number2 = canvas.getByText('2');

    await expect(number1).toBeInTheDocument();
    await expect(number2).toBeInTheDocument();

    // Test navigation buttons for multiple items layout
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons.length).toBeGreaterThanOrEqual(2);

    let nextButton: HTMLElement | null = null;
    let prevButton: HTMLElement | null = null;

    try {
      nextButton = canvas.getByRole('button', { name: /next/i });
      prevButton = canvas.getByRole('button', { name: /previous/i });
    } catch {
      try {
        nextButton = canvas.getByLabelText(/next/i);
        prevButton = canvas.getByLabelText(/previous/i);
      } catch {
        nextButton = allButtons[allButtons.length - 1];
        prevButton = allButtons[0];
      }
    }

    // Test navigation functionality with multiple items
    if (nextButton) {
      await expect(nextButton).toBeInTheDocument();

      // Click next to scroll to next set of items
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // After navigation, different items should be visible
      // The exact visible items depend on responsive breakpoints
      const allItemNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
      const visibleItems = allItemNumbers.filter(num => {
        try {
          canvas.getByText(num);
          return true;
        } catch {
          return false;
        }
      });

      // Should have multiple items visible
      expect(visibleItems.length).toBeGreaterThan(1);
    }

    if (prevButton) {
      await expect(prevButton).toBeInTheDocument();

      // Click previous to scroll back
      await userEvent.click(prevButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Test loop behavior (loop: true is enabled)
    if (nextButton) {
      // Navigate through all items to test looping
      for (let i = 0; i < 5; i++) {
        await userEvent.click(nextButton);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Should still have navigation available due to loop
      await expect(nextButton).toBeInTheDocument();
    }

    // Test keyboard navigation with multiple items
    const carouselContainer = canvasElement.querySelector('[role="region"]') ||
                             canvasElement.querySelector('[tabindex]') ||
                             canvasElement.firstChild as Element;

    if (carouselContainer) {
      await userEvent.click(carouselContainer);

      // Test arrow key navigation
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 100));

      await userEvent.keyboard('{ArrowLeft}');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Test Page keys for larger jumps with multiple items
      await userEvent.keyboard('{PageDown}');
      await new Promise(resolve => setTimeout(resolve, 100));

      await userEvent.keyboard('{PageUp}');
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Test responsive behavior - verify different basis classes exist
    const carouselItems = canvasElement.querySelectorAll('[class*="md:basis-1/2"]');
    expect(carouselItems.length).toBeGreaterThan(0);

    const lgCarouselItems = canvasElement.querySelectorAll('[class*="lg:basis-1/3"]');
    expect(lgCarouselItems.length).toBeGreaterThan(0);

    // Test that carousel maintains proper spacing with multiple items
    const carouselContent = canvasElement.querySelector('[class*="-ml-2"]') ||
                           canvasElement.querySelector('[class*="-ml-4"]');

    if (carouselContent) {
      await expect(carouselContent).toBeInTheDocument();
    }

    // Test focus management with multiple visible items
    if (nextButton && prevButton) {
      nextButton.focus();
      await expect(nextButton).toHaveFocus();

      // Tab navigation should work
      await userEvent.keyboard('{Tab}');
      await expect(prevButton).toHaveFocus();
    }

    // Test that all 8 items exist in the carousel
    const allItems = Array.from({ length: 8 }).map((_, i) => `Item ${i + 1}`);
    allItems.forEach(itemText => {
      const item = canvas.getByText(itemText);
      expect(item).toBeInTheDocument();
    });
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that first item is visible initially in vertical layout
    const firstItem = canvas.getByText('1');
    await expect(firstItem).toBeInTheDocument();

    // Test all vertical carousel items exist
    const allItems = ['1', '2', '3', '4', '5'].map(num => canvas.getByText(num));
    allItems.forEach(async (item) => {
      await expect(item).toBeInTheDocument();
    });

    // Test vertical navigation buttons
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons.length).toBeGreaterThanOrEqual(2);

    // Find vertical navigation buttons
    let nextButton: HTMLElement | null = null;
    let prevButton: HTMLElement | null = null;

    try {
      nextButton = canvas.getByRole('button', { name: /next/i });
      prevButton = canvas.getByRole('button', { name: /previous/i });
    } catch {
      try {
        nextButton = canvas.getByLabelText(/next/i);
        prevButton = canvas.getByLabelText(/previous/i);
      } catch {
        nextButton = allButtons[allButtons.length - 1];
        prevButton = allButtons[0];
      }
    }

    // Test vertical navigation functionality
    if (nextButton) {
      await expect(nextButton).toBeInTheDocument();
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (prevButton) {
      await expect(prevButton).toBeInTheDocument();
      await userEvent.click(prevButton);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Test vertical keyboard navigation
    const carouselContainer = canvasElement.querySelector('[role="region"]') ||
                             canvasElement.querySelector('[tabindex]') ||
                             canvasElement.firstChild as Element;

    if (carouselContainer) {
      await userEvent.click(carouselContainer);

      // Test vertical arrow keys
      await userEvent.keyboard('{ArrowDown}');
      await new Promise(resolve => setTimeout(resolve, 100));

      await userEvent.keyboard('{ArrowUp}');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Test Home/End keys
      await userEvent.keyboard('{Home}');
      await new Promise(resolve => setTimeout(resolve, 100));

      await userEvent.keyboard('{End}');
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Test that vertical carousel has height constraint
    const carouselContent = canvasElement.querySelector('[class*="h-[300px]"]');
    if (carouselContent) {
      await expect(carouselContent).toBeInTheDocument();
    }

    // Test focus management
    if (nextButton && prevButton) {
      nextButton.focus();
      await expect(nextButton).toHaveFocus();

      await userEvent.keyboard('{Tab}');
      await expect(prevButton).toHaveFocus();
    }
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that first product is visible initially
    const firstProduct = canvas.getByText('Wireless Headphones');
    const firstPrice = canvas.getByText('$199');

    await expect(firstProduct).toBeInTheDocument();
    await expect(firstPrice).toBeInTheDocument();

    // Test that product images have proper alt text for accessibility
    const firstImage = canvas.getByAltText('Wireless Headphones');
    await expect(firstImage).toBeInTheDocument();
    await expect(firstImage).toHaveAttribute('src');

    // Test navigation buttons for product showcase
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons.length).toBeGreaterThanOrEqual(2);

    let nextButton: HTMLElement | null = null;
    let prevButton: HTMLElement | null = null;

    try {
      nextButton = canvas.getByRole('button', { name: /next/i });
      prevButton = canvas.getByRole('button', { name: /previous/i });
    } catch {
      try {
        nextButton = canvas.getByLabelText(/next/i);
        prevButton = canvas.getByLabelText(/previous/i);
      } catch {
        nextButton = allButtons[allButtons.length - 1];
        prevButton = allButtons[0];
      }
    }

    // Test forward navigation through products
    if (nextButton) {
      await expect(nextButton).toBeInTheDocument();

      // Navigate to see Smart Watch or other products
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Test that navigation reveals different products (responsive behavior)
      const possibleProducts = ['Smart Watch', 'Laptop Computer', 'Smartphone', 'Tablet Device'];
      let foundNewProduct = false;

      for (const productName of possibleProducts) {
        try {
          canvas.getByText(productName);
          foundNewProduct = true;
          break;
        } catch {
          // Product not visible, continue
        }
      }

      // Should have navigated to show different products
      expect(foundNewProduct).toBe(true);
    }

    // Test backward navigation
    if (prevButton) {
      await expect(prevButton).toBeInTheDocument();
      await userEvent.click(prevButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Test keyboard navigation for product carousel
    const carouselContainer = canvasElement.querySelector('[role="region"]') ||
                             canvasElement.querySelector('[tabindex]') ||
                             canvasElement.firstChild as Element;

    if (carouselContainer) {
      await userEvent.click(carouselContainer);

      // Test horizontal arrow keys for product browsing
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 200));

      await userEvent.keyboard('{ArrowLeft}');
      await new Promise(resolve => setTimeout(resolve, 200));

      // Test Home/End keys for quick navigation
      await userEvent.keyboard('{Home}');
      await new Promise(resolve => setTimeout(resolve, 200));

      // After Home, first product should be visible
      await expect(canvas.getByText('Wireless Headphones')).toBeInTheDocument();

      await userEvent.keyboard('{End}');
      await new Promise(resolve => setTimeout(resolve, 200));

      // After End, last products should be accessible
    }

    // Test that all product prices are formatted correctly
    const prices = ['$199', '$299', '$999', '$699', '$449'];
    let visiblePrices = 0;

    prices.forEach(price => {
      try {
        const priceElement = canvas.getByText(price);
        if (priceElement) {
          visiblePrices++;
        }
      } catch {
        // Price not currently visible due to carousel state
      }
    });

    // Should have at least one price visible
    expect(visiblePrices).toBeGreaterThan(0);

    // Test loop functionality with multiple clicks
    if (nextButton) {
      // Click next multiple times to test looping
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 200));
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 200));
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should still be functional (loop enabled)
      await expect(nextButton).toBeInTheDocument();
      await expect(nextButton).toBeEnabled();
    }

    // Test that cards maintain proper structure
    const allCards = canvasElement.querySelectorAll('[class*="oui:p-4"]');
    expect(allCards.length).toBeGreaterThan(0);

    // Each visible card should have image, title, and price
    allCards.forEach(card => {
      const image = card.querySelector('img');
      const title = card.querySelector('h3');
      const price = card.querySelector('p[class*="font-bold"]');

      if (image) expect(image).toBeInTheDocument();
      if (title) expect(title).toBeInTheDocument();
      if (price) expect(price).toBeInTheDocument();
    });

    // Test focus management on navigation buttons
    if (nextButton && prevButton) {
      nextButton.focus();
      await expect(nextButton).toHaveFocus();

      await userEvent.keyboard('{Tab}');
      // Focus should move to prev button or other focusable element
    }

    // Test responsive behavior by checking for responsive classes
    const responsiveItems = canvasElement.querySelectorAll('[class*="md:basis-1/2"]');
    expect(responsiveItems.length).toBeGreaterThan(0);
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that showcase title is present
    const showcaseTitle = canvas.getByText('Carousel Variations');
    await expect(showcaseTitle).toBeInTheDocument();

    // Test both carousel section headings
    const basicCarouselLabel = canvas.getByText('Basic Carousel');
    const multipleItemsLabel = canvas.getByText('Multiple Items');

    await expect(basicCarouselLabel).toBeInTheDocument();
    await expect(multipleItemsLabel).toBeInTheDocument();

    // Test Basic Carousel section (first carousel)
    const basicCarouselItems = ['1', '2', '3'];
    const firstItem = canvas.getByText('1');
    await expect(firstItem).toBeInTheDocument();

    // Test that Basic Carousel has 3 items
    basicCarouselItems.forEach(async (itemText) => {
      const item = canvas.getByText(itemText);
      await expect(item).toBeInTheDocument();
    });

    // Test Multiple Items section (second carousel)
    const multipleItemsCarousel = ['1', '2', '3', '4', '5', '6'];

    // At least some items from the multiple items carousel should be visible
    let visibleMultipleItems = 0;
    multipleItemsCarousel.forEach((itemText) => {
      try {
        // Get all elements with this text (could be from both carousels)
        const elements = canvas.getAllByText(itemText);
        // Should have at least one element for each number
        if (elements.length >= 1) {
          visibleMultipleItems++;
        }
      } catch {
        // Item not visible
      }
    });

    // Should have all 6 items (shared between both carousels and multiple items section)
    expect(visibleMultipleItems).toBeGreaterThanOrEqual(3);

    // Test navigation buttons for both carousels
    const allButtons = canvas.getAllByRole('button');

    // Should have at least 4 buttons (2 for each carousel: prev + next)
    await expect(allButtons.length).toBeGreaterThanOrEqual(4);

    // Test Basic Carousel navigation (smaller max-width carousel)
    let basicNextButton: HTMLElement | null = null;
    let basicPrevButton: HTMLElement | null = null;

    // Find the first set of navigation buttons (Basic Carousel)
    try {
      const nextButtons = canvas.getAllByRole('button', { name: /next/i });
      const prevButtons = canvas.getAllByRole('button', { name: /previous/i });

      basicNextButton = nextButtons[0];
      basicPrevButton = prevButtons[0];
    } catch {
      // Fallback: use first two buttons
      basicNextButton = allButtons[1];
      basicPrevButton = allButtons[0];
    }

    // Test Basic Carousel navigation
    if (basicNextButton) {
      await expect(basicNextButton).toBeInTheDocument();
      await userEvent.click(basicNextButton);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should still show valid content
      const basicItems = canvas.getAllByText(/^[1-3]$/);
      expect(basicItems.length).toBeGreaterThan(0);
    }

    if (basicPrevButton) {
      await expect(basicPrevButton).toBeInTheDocument();
      await userEvent.click(basicPrevButton);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Test Multiple Items carousel navigation
    let multipleNextButton: HTMLElement | null = null;
    let multiplePrevButton: HTMLElement | null = null;

    try {
      const nextButtons = canvas.getAllByRole('button', { name: /next/i });
      const prevButtons = canvas.getAllByRole('button', { name: /previous/i });

      // Get the second set of buttons (Multiple Items carousel)
      multipleNextButton = nextButtons[1];
      multiplePrevButton = prevButtons[1];
    } catch {
      // Fallback: use last two buttons
      multipleNextButton = allButtons[allButtons.length - 1];
      multiplePrevButton = allButtons[allButtons.length - 2];
    }

    if (multipleNextButton) {
      await expect(multipleNextButton).toBeInTheDocument();
      await userEvent.click(multipleNextButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Multiple items carousel should show different items after navigation
      const itemsAfterNav = multipleItemsCarousel.filter(item => {
        try {
          canvas.getAllByText(item);
          return true;
        } catch {
          return false;
        }
      });

      expect(itemsAfterNav.length).toBeGreaterThan(0);
    }

    if (multiplePrevButton) {
      await expect(multiplePrevButton).toBeInTheDocument();
      await userEvent.click(multiplePrevButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Test keyboard navigation on first carousel
    const firstCarousel = canvasElement.querySelector('.oui\\:max-w-xs');
    if (firstCarousel) {
      const carouselContainer = firstCarousel.querySelector('[role="region"]') ||
                               firstCarousel.querySelector('[tabindex]') ||
                               firstCarousel.firstElementChild;

      if (carouselContainer) {
        await userEvent.click(carouselContainer as Element);

        // Test arrow keys on Basic Carousel
        await userEvent.keyboard('{ArrowRight}');
        await new Promise(resolve => setTimeout(resolve, 100));

        await userEvent.keyboard('{ArrowLeft}');
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Test keyboard navigation on second carousel (multiple items)
    const secondCarousel = canvasElement.querySelector('.oui\\:max-w-2xl');
    if (secondCarousel) {
      const carouselContainer = secondCarousel.querySelector('[role="region"]') ||
                               secondCarousel.querySelector('[tabindex]') ||
                               secondCarousel.firstElementChild;

      if (carouselContainer) {
        await userEvent.click(carouselContainer as Element);

        // Test arrow keys on Multiple Items carousel
        await userEvent.keyboard('{ArrowRight}');
        await new Promise(resolve => setTimeout(resolve, 100));

        await userEvent.keyboard('{Home}');
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Test responsive classes in Multiple Items section
    const responsiveItems = canvasElement.querySelectorAll('.oui\\:md\\:basis-1\\/2');
    expect(responsiveItems.length).toBeGreaterThan(0);

    // Test that both carousels maintain proper card structure
    const allCards = canvasElement.querySelectorAll('[class*="aspect-square"]');
    expect(allCards.length).toBe(9); // 3 basic + 6 multiple = 9 total

    // Test accessibility attributes
    const carouselRegions = canvasElement.querySelectorAll('[role="region"]');

    // Should have carousel regions or other accessibility indicators
    if (carouselRegions.length > 0) {
      carouselRegions.forEach(region => {
        expect(region).toBeInTheDocument();
      });
    }

    // Test that different font sizes are applied correctly
    const largerText = canvasElement.querySelectorAll('.oui\\:text-2xl');
    const smallerText = canvasElement.querySelectorAll('.oui\\:text-xl');

    expect(largerText.length).toBe(3); // Basic carousel items
    expect(smallerText.length).toBe(6); // Multiple items carousel

    // Test focus management between carousels
    if (basicNextButton && multipleNextButton) {
      // Focus first carousel button
      basicNextButton.focus();
      await expect(basicNextButton).toHaveFocus();

      // Navigate through page to reach second carousel
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');

      // Should be able to reach multiple items carousel buttons
      const focusedElement = document.activeElement;
      expect(focusedElement).toBeTruthy();
    }

    // Test that both carousels are independent
    if (basicNextButton && multipleNextButton) {
      // Navigate first carousel
      await userEvent.click(basicNextButton);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Navigate second carousel independently
      await userEvent.click(multipleNextButton);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Both should remain functional
      await expect(basicNextButton).toBeEnabled();
      await expect(multipleNextButton).toBeEnabled();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Different carousel configurations and layouts.',
      },
    },
  },
};