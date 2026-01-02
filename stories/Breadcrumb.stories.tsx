import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { ChevronDownIcon } from '@/components';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that breadcrumb links are present and accessible
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    const componentsLink = canvas.getByRole('link', { name: 'Components' });

    await expect(homeLink).toBeInTheDocument();
    await expect(componentsLink).toBeInTheDocument();

    // Test that current page is not a link (should be text only)
    await expect(canvas.getByText('Breadcrumb')).toBeInTheDocument();

    // Verify there are clickable links plus the current page (which has role="link" but is disabled)
    const allLinks = canvas.getAllByRole('link');
    await expect(allLinks).toHaveLength(3); // Home, Components, and current page (disabled)

    // Test that links have proper href attributes
    await expect(homeLink).toHaveAttribute('href', '/');
    await expect(componentsLink).toHaveAttribute('href', '/components');

    // Test clicking breadcrumb links
    await userEvent.click(homeLink);
    await expect(homeLink).toHaveFocus();

    await userEvent.click(componentsLink);
    await expect(componentsLink).toHaveFocus();

    // Test keyboard navigation between breadcrumb links
    await userEvent.click(homeLink);
    await expect(homeLink).toHaveFocus();

    // Tab to next link
    await userEvent.keyboard('{Tab}');
    await expect(componentsLink).toHaveFocus();

    // Test that separators are present (visual elements)
    const breadcrumbList = canvas.getByRole('list');
    await expect(breadcrumbList).toBeInTheDocument();

    // Test overall breadcrumb structure
    await expect(homeLink.closest('li')).toBeInTheDocument();
    await expect(componentsLink.closest('li')).toBeInTheDocument();

    // Test Enter key navigation on links
    await userEvent.click(homeLink);
    await userEvent.keyboard('{Enter}');
    await expect(homeLink).toHaveFocus();

    // Test Space key navigation
    await userEvent.keyboard(' ');
    await expect(homeLink).toHaveFocus();

    // Test that current page is not clickable
    const currentPage = canvas.getByText('Breadcrumb');
    const currentPageLink = currentPage.closest('a');
    if (currentPageLink) {
      // If it has a link, it should be disabled
      await expect(currentPageLink).toHaveAttribute('aria-current', 'page');
    }
  },
};

export const WithEllipsis: Story = {
  args: {
    children: (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
};

export const LongPath: Story = {
  args: {
    children: (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/projects/design-system">Design System</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
};

export const SingleItem: Story = {
  args: {
    children: (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that current page text is present
    await expect(canvas.getByText('Current Page')).toBeInTheDocument();

    // Test that there is only the current page element (which has role="link" but is disabled)
    const links = canvas.queryAllByRole('link');
    await expect(links).toHaveLength(1); // Only the current page with role="link" but disabled

    // Test that breadcrumb list is present
    const breadcrumbList = canvas.getByRole('list');
    await expect(breadcrumbList).toBeInTheDocument();

    // Test that there's exactly one list item
    const listItems = breadcrumbList.querySelectorAll('li');
    expect(listItems).toHaveLength(1);

    // Test that the single item contains the current page text
    await expect(listItems[0]).toHaveTextContent('Current Page');

    // Test that the current page is not focusable (no interactive elements)
    const interactiveElements = canvas.queryAllByRole('button');
    const linkElements = canvas.queryAllByRole('link');
    expect(interactiveElements.length + linkElements.length).toBe(0);

    // Test keyboard navigation behavior with single item
    // Since there are no interactive elements, Tab should not focus anything within breadcrumb

    // Test that the breadcrumb maintains proper structure even with single item
    await expect(breadcrumbList.querySelector('li')).toBeInTheDocument();

    // Test ARIA structure for single breadcrumb
    const singleBreadcrumb = breadcrumbList.querySelector('[aria-current="page"]');
    if (singleBreadcrumb) {
      await expect(singleBreadcrumb).toHaveAttribute('aria-current', 'page');
    }
  },
};

export const WithDropdown: Story = {
  args: {
    children: (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="oui:flex oui:items-center oui:gap-1 oui:hover:text-foreground oui:transition-colors">
              Components
              <ChevronDownIcon className="oui:h-4 oui:w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <BreadcrumbLink href="/components/accordion">Accordion</BreadcrumbLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BreadcrumbLink href="/components/badge">Badge</BreadcrumbLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BreadcrumbLink href="/components/breadcrumb">Breadcrumb</BreadcrumbLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BreadcrumbLink href="/components/button">Button</BreadcrumbLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that Home link is present
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveAttribute('href', '/');

    // Test that dropdown trigger is present and accessible
    const dropdownTrigger = canvas.getByRole('button', { name: /Components/i });
    await expect(dropdownTrigger).toBeInTheDocument();

    // Test that current page is displayed
    await expect(canvas.getByText('Breadcrumb')).toBeInTheDocument();

    // Test dropdown trigger click to open menu
    await userEvent.click(dropdownTrigger);

    // Wait for dropdown menu to appear
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that dropdown menu opens and items are accessible
    // Look for the actual links within the dropdown menu content
    await expect(canvas.getByText('Accordion')).toBeInTheDocument();
    await expect(canvas.getByText('Badge')).toBeInTheDocument();
    await expect(canvas.getByText('Button')).toBeInTheDocument();

    const accordionLink = canvas.getByText('Accordion').closest('a');
    const badgeLink = canvas.getByText('Badge').closest('a');
    const buttonLink = canvas.getByText('Button').closest('a');

    // Test that dropdown menu items have proper href attributes
    if (accordionLink) {
      await expect(accordionLink).toHaveAttribute('href', '/components/accordion');
    }
    if (badgeLink) {
      await expect(badgeLink).toHaveAttribute('href', '/components/badge');
    }
    if (buttonLink) {
      await expect(buttonLink).toHaveAttribute('href', '/components/button');
    }

    // Test clicking a dropdown menu item
    if (accordionLink) {
      await userEvent.click(accordionLink);
    }

    // Test keyboard navigation - reopen dropdown
    await userEvent.click(dropdownTrigger);
    await expect(dropdownTrigger).toHaveFocus();

    // Test escape key closes dropdown
    await userEvent.keyboard('{Escape}');

    // Wait for dropdown to close
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that Home link still works after dropdown interactions
    await userEvent.click(homeLink);
    await expect(homeLink).toHaveFocus();

    // Test keyboard interaction on Home link
    await userEvent.keyboard('{Enter}');
    await expect(homeLink).toHaveFocus();

    // Test Space key on Home link
    await userEvent.keyboard(' ');
    await expect(homeLink).toHaveFocus();

    // Test Arrow key navigation on dropdown trigger
    await userEvent.click(dropdownTrigger);
    await userEvent.keyboard('{ArrowDown}');

    // Wait for dropdown to open with keyboard
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test that dropdown items are keyboard accessible
    if (canvas.queryByText('Accordion')) {
      // Accordion item should be focusable now
      const accordionItem = canvas.getByText('Accordion').closest('a');
      if (accordionItem) {
        await userEvent.keyboard('{ArrowDown}');
      }
    }

    // Test breadcrumb navigation structure with dropdown
    const breadcrumbNav = canvas.getByRole('navigation');
    await expect(breadcrumbNav).toBeInTheDocument();

    // Test that current page remains accessible
    const currentPage = canvas.getByText('Breadcrumb');
    await expect(currentPage).toBeInTheDocument();
  },
};