import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components';
// import { testButtonBehavior, testDisabledState, testKeyboardInteraction } from './utils/test-helpers';
// import { testAriaLabeling, testFocusVisible } from './utils/accessibility-helpers';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the pagination container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default pagination
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all navigation elements are present and accessible
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });
    const page1Link = canvas.getByRole('link', { name: '1' });
    const page2Link = canvas.getByRole('link', { name: '2' });
    const page3Link = canvas.getByRole('link', { name: '3' });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
    await expect(page1Link).toBeInTheDocument();
    await expect(page2Link).toBeInTheDocument();
    await expect(page3Link).toBeInTheDocument();

    // Test that page 1 is active by default
    await expect(page1Link).toHaveAttribute('aria-current', 'page');
    await expect(page2Link).not.toHaveAttribute('aria-current', 'page');
    await expect(page3Link).not.toHaveAttribute('aria-current', 'page');

    // Test Previous/Next button accessibility
    await expect(prevButton).toHaveAttribute('href', '#');
    await expect(nextButton).toHaveAttribute('href', '#');

    // Test clicking page numbers
    await userEvent.click(page2Link);
    await expect(page2Link).toHaveFocus();

    await userEvent.click(page3Link);
    await expect(page3Link).toHaveFocus();

    // Test clicking Previous button
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    // Test clicking Next button
    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    // Test keyboard navigation between page links
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();
    await userEvent.keyboard('{Tab}');
    await expect(page2Link).toHaveFocus();
    await userEvent.keyboard('{Tab}');
    await expect(page3Link).toHaveFocus();

    // Test Enter key activation
    await userEvent.click(page2Link);
    await userEvent.keyboard('{Enter}');
    await expect(page2Link).toHaveFocus();

    // Test that pagination navigation structure is correct
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic pagination with previous/next buttons and numbered pages.',
      },
    },
  },
};

// Simple pagination with few pages
export const Simple: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all navigation elements are present
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });
    const page1Link = canvas.getByRole('link', { name: '1' });
    const page2Link = canvas.getByRole('link', { name: '2' });
    const page3Link = canvas.getByRole('link', { name: '3' });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
    await expect(page1Link).toBeInTheDocument();
    await expect(page2Link).toBeInTheDocument();
    await expect(page3Link).toBeInTheDocument();

    // Test that page 2 is active (this story's unique state)
    await expect(page2Link).toHaveAttribute('aria-current', 'page');
    await expect(page1Link).not.toHaveAttribute('aria-current', 'page');
    await expect(page3Link).not.toHaveAttribute('aria-current', 'page');

    // Test navigation interactions
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    await userEvent.click(page3Link);
    await expect(page3Link).toHaveFocus();

    // Test Previous/Next button functionality
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    // Test keyboard navigation
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();
    await userEvent.keyboard('{Tab}');
    await expect(page1Link).toHaveFocus();
    await userEvent.keyboard('{Tab}');
    await expect(page2Link).toHaveFocus();

    // Test Space key navigation (should work for links)
    await userEvent.keyboard(' ');
    await expect(page2Link).toHaveFocus();

    // Test that pagination has proper structure
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple pagination with active state on page 2.',
      },
    },
  },
};

// Pagination with ellipsis
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all navigation elements are present
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Test that specific page numbers are present
    const page1Link = canvas.getByRole('link', { name: '1' });
    const page2Link = canvas.getByRole('link', { name: '2' });
    const page3Link = canvas.getByRole('link', { name: '3' });
    const page8Link = canvas.getByRole('link', { name: '8' });
    const page9Link = canvas.getByRole('link', { name: '9' });
    const page10Link = canvas.getByRole('link', { name: '10' });

    await expect(page1Link).toBeInTheDocument();
    await expect(page2Link).toBeInTheDocument();
    await expect(page3Link).toBeInTheDocument();
    await expect(page8Link).toBeInTheDocument();
    await expect(page9Link).toBeInTheDocument();
    await expect(page10Link).toBeInTheDocument();

    // Test that ellipsis is present and not interactive
    const ellipsis = canvas.getByText('…');
    await expect(ellipsis).toBeInTheDocument();
    // Ellipsis should not be a link or button
    await expect(ellipsis.closest('a')).toBe(null);
    await expect(ellipsis.closest('button')).toBe(null);

    // Test that page 2 is active
    await expect(page2Link).toHaveAttribute('aria-current', 'page');
    await expect(page1Link).not.toHaveAttribute('aria-current', 'page');
    await expect(page3Link).not.toHaveAttribute('aria-current', 'page');

    // Test navigation to first page
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    // Test navigation to last section pages
    await userEvent.click(page10Link);
    await expect(page10Link).toHaveFocus();

    await userEvent.click(page8Link);
    await expect(page8Link).toHaveFocus();

    // Test Previous/Next button functionality
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    // Test keyboard navigation through visible pages
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page2Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page3Link).toHaveFocus();

    // Skip ellipsis and go to next page
    await userEvent.keyboard('{Tab}');
    await expect(page8Link).toHaveFocus();

    // Test that pagination structure is accessible
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();

    // Test that gaps between consecutive pages and ellipsis exist
    // Page 4-7 should not be present (indicated by ellipsis)
    await expect(canvas.queryByRole('link', { name: '4' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '5' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '6' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '7' })).not.toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with ellipsis to indicate skipped pages in a large dataset.',
      },
    },
  },
};

// First page state
export const FirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="oui:pointer-events-none oui:opacity-50" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation elements presence
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Test that page 1 is active
    const page1Link = canvas.getByRole('link', { name: '1' });
    await expect(page1Link).toHaveAttribute('aria-current', 'page');

    // Test disabled state of Previous button (first page)
    // Previous button should have disabled styling
    await expect(prevButton).toHaveClass('oui:pointer-events-none');
    await expect(prevButton).toHaveClass('oui:opacity-50');

    // Test that Next button is enabled (not on last page)
    await expect(nextButton).not.toHaveClass('oui:pointer-events-none');
    await expect(nextButton).not.toHaveClass('oui:opacity-50');

    // Test that ellipsis is present
    const ellipsis = canvas.getByText('…');
    await expect(ellipsis).toBeInTheDocument();

    // Test page numbers
    const page2Link = canvas.getByRole('link', { name: '2' });
    const page3Link = canvas.getByRole('link', { name: '3' });
    const page10Link = canvas.getByRole('link', { name: '10' });

    await expect(page2Link).toBeInTheDocument();
    await expect(page3Link).toBeInTheDocument();
    await expect(page10Link).toBeInTheDocument();

    // Test clicking enabled pages works
    await userEvent.click(page2Link);
    await expect(page2Link).toHaveFocus();

    await userEvent.click(page10Link);
    await expect(page10Link).toHaveFocus();

    // Test clicking enabled Next button works
    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    // Test keyboard navigation (Previous button should still be focusable even if disabled)
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page1Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page2Link).toHaveFocus();

    // Test Enter key on active page
    await userEvent.click(page1Link);
    await userEvent.keyboard('{Enter}');
    await expect(page1Link).toHaveFocus();

    // Test pagination structure
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();

    // Test that middle pages are not present (indicated by ellipsis)
    await expect(canvas.queryByRole('link', { name: '4' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '5' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '6' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '7' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '8' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '9' })).not.toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'First page state with disabled previous button.',
      },
    },
  },
};

// Last page state
export const LastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="oui:pointer-events-none oui:opacity-50" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation elements presence
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Test that page 10 is active (last page)
    const page10Link = canvas.getByRole('link', { name: '10' });
    await expect(page10Link).toHaveAttribute('aria-current', 'page');

    // Test disabled state of Next button (last page)
    await expect(nextButton).toHaveClass('oui:pointer-events-none');
    await expect(nextButton).toHaveClass('oui:opacity-50');

    // Test that Previous button is enabled (not on first page)
    await expect(prevButton).not.toHaveClass('oui:pointer-events-none');
    await expect(prevButton).not.toHaveClass('oui:opacity-50');

    // Test that ellipsis is present
    const ellipsis = canvas.getByText('…');
    await expect(ellipsis).toBeInTheDocument();

    // Test page numbers
    const page1Link = canvas.getByRole('link', { name: '1' });
    const page8Link = canvas.getByRole('link', { name: '8' });
    const page9Link = canvas.getByRole('link', { name: '9' });

    await expect(page1Link).toBeInTheDocument();
    await expect(page8Link).toBeInTheDocument();
    await expect(page9Link).toBeInTheDocument();
    await expect(page10Link).toBeInTheDocument();

    // Test clicking enabled pages works
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    await userEvent.click(page8Link);
    await expect(page8Link).toHaveFocus();

    await userEvent.click(page9Link);
    await expect(page9Link).toHaveFocus();

    // Test clicking enabled Previous button works
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    // Test keyboard navigation (Next button should still be focusable even if disabled)
    await userEvent.click(page9Link);
    await expect(page9Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page10Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(nextButton).toHaveFocus();

    // Test that disabled Next button receives focus but doesn't navigate
    await userEvent.keyboard('{Enter}');
    await expect(nextButton).toHaveFocus();

    // Test that active page (10) works with Enter
    await userEvent.click(page10Link);
    await userEvent.keyboard('{Enter}');
    await expect(page10Link).toHaveFocus();

    // Test pagination structure
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();

    // Test that middle pages are not present (indicated by ellipsis)
    await expect(canvas.queryByRole('link', { name: '2' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '3' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '4' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '5' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '6' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '7' })).not.toBeInTheDocument();

    // Test reverse tab order navigation
    await userEvent.click(nextButton);
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await expect(page10Link).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Last page state with disabled next button.',
      },
    },
  },
};

// Middle page with ellipsis on both sides
export const MiddlePage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">20</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation elements presence
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Test that page 5 is active (middle page)
    const page5Link = canvas.getByRole('link', { name: '5' });
    await expect(page5Link).toHaveAttribute('aria-current', 'page');

    // Test that both Previous and Next buttons are enabled (middle page)
    await expect(prevButton).not.toHaveClass('oui:pointer-events-none');
    await expect(prevButton).not.toHaveClass('oui:opacity-50');
    await expect(nextButton).not.toHaveClass('oui:pointer-events-none');
    await expect(nextButton).not.toHaveClass('oui:opacity-50');

    // Test that both ellipsis elements are present
    const allEllipsis = canvas.getAllByText('…');
    await expect(allEllipsis).toHaveLength(2); // Two ellipsis elements

    // Test page numbers around current page
    const page1Link = canvas.getByRole('link', { name: '1' });
    const page4Link = canvas.getByRole('link', { name: '4' });
    const page6Link = canvas.getByRole('link', { name: '6' });
    const page20Link = canvas.getByRole('link', { name: '20' });

    await expect(page1Link).toBeInTheDocument();
    await expect(page4Link).toBeInTheDocument();
    await expect(page5Link).toBeInTheDocument();
    await expect(page6Link).toBeInTheDocument();
    await expect(page20Link).toBeInTheDocument();

    // Test clicking different sections works
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    await userEvent.click(page4Link);
    await expect(page4Link).toHaveFocus();

    await userEvent.click(page6Link);
    await expect(page6Link).toHaveFocus();

    await userEvent.click(page20Link);
    await expect(page20Link).toHaveFocus();

    // Test Previous/Next navigation
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    // Test keyboard navigation through visible pages
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    // Skip first ellipsis (not focusable)
    await userEvent.keyboard('{Tab}');
    await expect(page4Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page5Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page6Link).toHaveFocus();

    // Skip second ellipsis (not focusable)
    await userEvent.keyboard('{Tab}');
    await expect(page20Link).toHaveFocus();

    // Test that ellipsis elements are not interactive
    allEllipsis.forEach(ellipsis => {
      expect(ellipsis.closest('a')).toBe(null);
      expect(ellipsis.closest('button')).toBe(null);
    });

    // Test pagination structure
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();

    // Test that gap pages are not present (indicated by ellipsis)
    await expect(canvas.queryByRole('link', { name: '2' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '3' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '7' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '8' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '19' })).not.toBeInTheDocument();

    // Test Enter key navigation on active page
    await userEvent.click(page5Link);
    await userEvent.keyboard('{Enter}');
    await expect(page5Link).toHaveFocus();

    // Test Space key navigation
    await userEvent.keyboard(' ');
    await expect(page5Link).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Middle page navigation with ellipsis on both sides for large datasets.',
      },
    },
  },
};

// Compact pagination (minimal pages)
export const Compact: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation elements presence
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Test that page 1 is active (compact layout)
    const page1Link = canvas.getByRole('link', { name: '1' });
    const page2Link = canvas.getByRole('link', { name: '2' });

    await expect(page1Link).toBeInTheDocument();
    await expect(page2Link).toBeInTheDocument();
    await expect(page1Link).toHaveAttribute('aria-current', 'page');
    await expect(page2Link).not.toHaveAttribute('aria-current', 'page');

    // Test that both buttons are enabled (middle pagination)
    await expect(prevButton).not.toHaveClass('oui:pointer-events-none');
    await expect(nextButton).not.toHaveClass('oui:pointer-events-none');

    // Test that no ellipsis is present (small dataset)
    await expect(canvas.queryByText('…')).not.toBeInTheDocument();

    // Test basic navigation interactions
    await userEvent.click(page2Link);
    await expect(page2Link).toHaveFocus();

    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    // Test Previous/Next button functionality
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    // Test keyboard navigation (simple, only 2 pages)
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page1Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page2Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(nextButton).toHaveFocus();

    // Test Enter key navigation
    await userEvent.click(page1Link);
    await userEvent.keyboard('{Enter}');
    await expect(page1Link).toHaveFocus();

    // Test Space key navigation
    await userEvent.keyboard(' ');
    await expect(page1Link).toHaveFocus();

    // Test pagination structure
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();

    // Test that this is truly compact (no gaps)
    const allLinks = canvas.getAllByRole('link');
    expect(allLinks).toHaveLength(4); // Previous, 1, 2, Next
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact pagination for small datasets with only a few pages.',
      },
    },
  },
};

// Single page (no navigation needed)
export const SinglePage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="oui:pointer-events-none oui:opacity-50" size="default" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive size="icon">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="oui:pointer-events-none oui:opacity-50" size="default" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation elements presence
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });
    const page1Link = canvas.getByRole('link', { name: '1' });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
    await expect(page1Link).toBeInTheDocument();

    // Test that page 1 is active (only page)
    await expect(page1Link).toHaveAttribute('aria-current', 'page');

    // Test that both navigation buttons are disabled (single page)
    await expect(prevButton).toHaveClass('oui:pointer-events-none');
    await expect(prevButton).toHaveClass('oui:opacity-50');
    await expect(nextButton).toHaveClass('oui:pointer-events-none');
    await expect(nextButton).toHaveClass('oui:opacity-50');

    // Test that no ellipsis is present (single page)
    await expect(canvas.queryByText('…')).not.toBeInTheDocument();

    // Test basic page interaction (even though it's the only page)
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    // Test that disabled buttons can still receive focus but don't navigate
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(prevButton).toHaveFocus(); // Still focused, but no action

    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(nextButton).toHaveFocus(); // Still focused, but no action

    // Test keyboard navigation through single page layout
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page1Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(nextButton).toHaveFocus();

    // Test Enter key on the active page
    await userEvent.click(page1Link);
    await userEvent.keyboard('{Enter}');
    await expect(page1Link).toHaveFocus();

    // Test Space key on the active page
    await userEvent.keyboard(' ');
    await expect(page1Link).toHaveFocus();

    // Test pagination structure
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();

    // Test that this is truly single page (only 3 links total)
    const allLinks = canvas.getAllByRole('link');
    expect(allLinks).toHaveLength(3); // Previous (disabled), 1, Next (disabled)

    // Test that there are no other page numbers
    await expect(canvas.queryByRole('link', { name: '2' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: '0' })).not.toBeInTheDocument();

    // Test reverse tab navigation
    await userEvent.click(nextButton);
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await expect(page1Link).toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await expect(prevButton).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Single page state with both navigation buttons disabled.',
      },
    },
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="oui:space-y-8">
      <div className="oui:space-y-2">
        <h4 className="oui:text-sm oui:font-medium">Simple Pagination</h4>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive size="icon">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size="default" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="oui:space-y-2">
        <h4 className="oui:text-sm oui:font-medium">With Ellipsis</h4>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive size="icon">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size="default" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="oui:space-y-2">
        <h4 className="oui:text-sm oui:font-medium">First Page (Previous Disabled)</h4>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="oui:pointer-events-none oui:opacity-50" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive size="icon">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size="default" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="oui:space-y-2">
        <h4 className="oui:text-sm oui:font-medium">Last Page (Next Disabled)</h4>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">8</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="icon">9</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive size="icon">
                10
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="oui:pointer-events-none oui:opacity-50" size="default" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All pagination variants and states displayed together for comparison.',
      },
    },
  },
};

// Interactive example with realistic content
export const InteractiveExample: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 20;

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const renderPageNumbers = () => {
      const pages: React.ReactElement[] = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === currentPage}
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Complex logic for ellipsis
        if (currentPage <= 4) {
          // Show first 5 pages, ellipsis, last page
          for (let i = 1; i <= 5; i++) {
            pages.push(
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i === currentPage}
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i);
                  }}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          }
          pages.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>);
          pages.push(
            <PaginationItem key={totalPages}>
              <PaginationLink
                href="#"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          );
        } else if (currentPage >= totalPages - 3) {
          // Show first page, ellipsis, last 5 pages
          pages.push(
            <PaginationItem key={1}>
              <PaginationLink
                href="#"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
          );
          pages.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>);
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i === currentPage}
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i);
                  }}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          }
        } else {
          // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
          pages.push(
            <PaginationItem key={1}>
              <PaginationLink
                href="#"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
          );
          pages.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>);

          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i === currentPage}
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i);
                  }}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          }

          pages.push(<PaginationItem key="ellipsis2"><PaginationEllipsis /></PaginationItem>);
          pages.push(
            <PaginationItem key={totalPages}>
              <PaginationLink
                href="#"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      return pages;
    };

    return (
      <div className="oui:space-y-4">
        <div className="oui:text-center oui:text-sm oui:text-muted-foreground">
          Showing results for page {currentPage} of {totalPages} (400 total items)
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={currentPage === 1 ? "oui:pointer-events-none oui:opacity-50" : ""}
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={currentPage === totalPages ? "oui:pointer-events-none oui:opacity-50" : ""}
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state (should start on page 5)
    await expect(canvas.getByText('Showing results for page 5 of 20 (400 total items)')).toBeInTheDocument();

    // Test navigation elements presence
    const prevButton = canvas.getByRole('link', { name: /previous/i });
    const nextButton = canvas.getByRole('link', { name: /next/i });

    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Test that page 5 is active initially
    const page5Link = canvas.getByRole('link', { name: '5' });
    await expect(page5Link).toHaveAttribute('aria-current', 'page');

    // Test that both buttons are enabled (middle page)
    await expect(prevButton).not.toHaveClass('oui:pointer-events-none');
    await expect(nextButton).not.toHaveClass('oui:pointer-events-none');

    // Test ellipsis are present (complex pagination)
    const allEllipsis = canvas.getAllByText('…');
    await expect(allEllipsis.length).toBeGreaterThan(0);

    // Test clicking different sections
    const page1Link = canvas.getByRole('link', { name: '1' });
    const page4Link = canvas.getByRole('link', { name: '4' });
    const page6Link = canvas.getByRole('link', { name: '6' });
    const page20Link = canvas.getByRole('link', { name: '20' });

    await expect(page1Link).toBeInTheDocument();
    await expect(page4Link).toBeInTheDocument();
    await expect(page6Link).toBeInTheDocument();
    await expect(page20Link).toBeInTheDocument();

    // Test clicking first page
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    // Wait for React state update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test clicking last page
    await userEvent.click(page20Link);
    await expect(page20Link).toHaveFocus();

    // Wait for React state update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test clicking back to middle page
    await userEvent.click(page5Link);
    await expect(page5Link).toHaveFocus();

    // Test Previous/Next button functionality with state changes
    await userEvent.click(prevButton);
    await expect(prevButton).toHaveFocus();

    // Wait for potential state change
    await new Promise(resolve => setTimeout(resolve, 100));

    await userEvent.click(nextButton);
    await expect(nextButton).toHaveFocus();

    // Wait for potential state change
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test keyboard navigation through complex pagination
    await userEvent.click(page1Link);
    await expect(page1Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    // Should skip ellipsis and go to next available page
    await expect(page4Link).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(page5Link).toHaveFocus();

    // Test Enter key activation on interactive pagination
    await userEvent.keyboard('{Enter}');
    await expect(page5Link).toHaveFocus();

    // Test that pagination has proper structure
    const paginationNav = canvas.getByRole('navigation');
    await expect(paginationNav).toBeInTheDocument();

    // Test that proper info text is shown
    const infoText = canvas.getByText(/Showing results for page \d+ of 20 \(400 total items\)/);
    await expect(infoText).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive pagination example with realistic data showing dynamic page navigation and ellipsis behavior.',
      },
    },
  },
};

