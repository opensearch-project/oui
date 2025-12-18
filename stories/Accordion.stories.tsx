import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components';

type AccordionWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionWrapper = ({ children, className }: AccordionWrapperProps) => (
  <div className={className}>{children}</div>
);

const meta: Meta<typeof AccordionWrapper> = {
  title: 'UI/Accordion',
  component: AccordionWrapper,
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
      <Accordion type="single" collapsible className="oui:w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    className: "oui:flex oui:justify-center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all accordion triggers are present and collapsed initially
    const trigger1 = canvas.getByRole('button', { name: /is it accessible/i });
    const trigger2 = canvas.getByRole('button', { name: /is it styled/i });
    const trigger3 = canvas.getByRole('button', { name: /is it animated/i });

    await expect(trigger1).toBeInTheDocument();
    await expect(trigger2).toBeInTheDocument();
    await expect(trigger3).toBeInTheDocument();

    // Verify initial state - all items should be collapsed
    await expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger2).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger3).toHaveAttribute('aria-expanded', 'false');

    // Test opening the first accordion item
    await userEvent.click(trigger1);
    await expect(trigger1).toHaveAttribute('aria-expanded', 'true');

    // Verify content is visible
    const content1 = canvas.getByText(/yes\. it adheres to the wai-aria design pattern/i);
    await expect(content1).toBeInTheDocument();

    // Test that opening another item closes the first (single mode)
    await userEvent.click(trigger2);
    await expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger1).toHaveAttribute('aria-expanded', 'false');

    // Test keyboard navigation
    await userEvent.tab();
    await expect(trigger3).toHaveFocus();

    // Test keyboard activation
    await userEvent.keyboard('{Enter}');
    await expect(trigger3).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger2).toHaveAttribute('aria-expanded', 'false');

    // Test collapsing with keyboard
    await userEvent.keyboard(' '); // Space key
    await expect(trigger3).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Multiple: Story = {
  args: {
    children: (
      <Accordion type="multiple" className="oui:w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
          <AccordionContent>
            Yes. With type="multiple", you can have multiple accordion items open at the same time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            Each item can be opened independently of the others.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Any limitations?</AccordionTrigger>
          <AccordionContent>
            No limitations. Open as many items as you need.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    className: "oui:flex oui:justify-center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all triggers
    const trigger1 = canvas.getByRole('button', { name: /can i open multiple items/i });
    const trigger2 = canvas.getByRole('button', { name: /how does it work/i });
    const trigger3 = canvas.getByRole('button', { name: /any limitations/i });

    // Verify initial state - all items should be collapsed
    await expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger2).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger3).toHaveAttribute('aria-expanded', 'false');

    // Test opening multiple items (should stay open)
    await userEvent.click(trigger1);
    await expect(trigger1).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(trigger2);
    await expect(trigger1).toHaveAttribute('aria-expanded', 'true'); // Should still be open
    await expect(trigger2).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(trigger3);
    await expect(trigger1).toHaveAttribute('aria-expanded', 'true'); // Should still be open
    await expect(trigger2).toHaveAttribute('aria-expanded', 'true'); // Should still be open
    await expect(trigger3).toHaveAttribute('aria-expanded', 'true');

    // Verify all content is visible
    const content1 = canvas.getByText(/yes\. with type="multiple"/i);
    const content2 = canvas.getByText(/each item can be opened independently/i);
    const content3 = canvas.getByText(/no limitations\. open as many items/i);

    await expect(content1).toBeInTheDocument();
    await expect(content2).toBeInTheDocument();
    await expect(content3).toBeInTheDocument();

    // Test closing individual items
    await userEvent.click(trigger2);
    await expect(trigger1).toHaveAttribute('aria-expanded', 'true'); // Should still be open
    await expect(trigger2).toHaveAttribute('aria-expanded', 'false'); // Should be closed
    await expect(trigger3).toHaveAttribute('aria-expanded', 'true'); // Should still be open
  },
};

export const SingleItem: Story = {
  args: {
    children: (
      <Accordion type="single" collapsible className="oui:w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is OUI?</AccordionTrigger>
          <AccordionContent>
            OUI is a comprehensive design system built on top of shadcn/ui,
            providing consistent and accessible UI components for modern web applications.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    className: "oui:flex oui:justify-center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the single trigger
    const trigger = canvas.getByRole('button', { name: /what is oui/i });

    // Verify initial state
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Test opening
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Verify content is visible
    const content = canvas.getByText(/oui is a comprehensive design system/i);
    await expect(content).toBeInTheDocument();

    // Test closing
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Test accessibility - should be focusable and have proper ARIA
    await expect(trigger).toHaveAttribute('aria-controls');
  },
};