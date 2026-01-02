import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Slider } from '@/components';
import { Label } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';
import { testDisabledState } from './utils/test-helpers';
import { testFocusVisible } from './utils/accessibility-helpers';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    ...createDocsWithWarning('A slider component for selecting values from a range with drag interaction.'),
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the slider is disabled',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the slider',
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState([50]);

    return (
      <div className="oui:w-[300px] oui:space-y-4">
        <div className="oui:space-y-2">
          <Label>Volume: {value[0]}</Label>
          <Slider
            value={value}
            onValueChange={setValue}
            {...args}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the slider element - it should have role="slider"
    const slider = canvas.getByRole('slider');
    await expect(slider).toBeInTheDocument();

    // Test initial value
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    await expect(slider).toHaveAttribute('aria-valuemin', '0');
    await expect(slider).toHaveAttribute('aria-valuemax', '100');

    // Test label association
    const label = canvas.getByText('Volume: 50');
    await expect(label).toBeInTheDocument();

    // Test focus behavior
    await testFocusVisible(canvas, 'slider');

    // Test keyboard navigation
    await userEvent.click(slider);
    await expect(slider).toHaveFocus();

    // Test arrow key navigation
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', '51');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(slider).toHaveAttribute('aria-valuenow', '50');

    // Test Home and End keys
    await userEvent.keyboard('{Home}');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');

    await userEvent.keyboard('{End}');
    await expect(slider).toHaveAttribute('aria-valuenow', '100');

    // Test Page Up/Down for larger increments
    await userEvent.keyboard('{Home}'); // Reset to 0
    await userEvent.keyboard('{PageUp}');
    const pageUpValue = slider.getAttribute('aria-valuenow');
    expect(parseInt(pageUpValue || '0')).toBeGreaterThan(0);

    await userEvent.keyboard('{PageDown}');
    const pageDownValue = slider.getAttribute('aria-valuenow');
    expect(parseInt(pageDownValue || '0')).toBeLessThan(parseInt(pageUpValue || '0'));
  },
};

export const Range: Story = {
  render: (args) => {
    const [value, setValue] = useState([20, 80]);

    return (
      <div className="oui:w-[300px] oui:space-y-4">
        <div className="oui:space-y-2">
          <Label>Price Range: ${value[0]} - ${value[1]}</Label>
          <Slider
            value={value}
            onValueChange={setValue}
            {...args}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Range sliders should have multiple slider elements (one for each thumb)
    const sliders = canvas.getAllByRole('slider');
    await expect(sliders).toHaveLength(2);

    // Test initial values for both thumbs
    await expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    await expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');

    // Both should have same min/max
    await expect(sliders[0]).toHaveAttribute('aria-valuemin', '0');
    await expect(sliders[0]).toHaveAttribute('aria-valuemax', '100');
    await expect(sliders[1]).toHaveAttribute('aria-valuemin', '0');
    await expect(sliders[1]).toHaveAttribute('aria-valuemax', '100');

    // Test label update
    const label = canvas.getByText('Price Range: $20 - $80');
    await expect(label).toBeInTheDocument();

    // Test first thumb (lower value) keyboard navigation
    await userEvent.click(sliders[0]);
    await expect(sliders[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(sliders[0]).toHaveAttribute('aria-valuenow', '21');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');

    // Test second thumb (upper value) keyboard navigation
    await userEvent.click(sliders[1]);
    await expect(sliders[1]).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    await expect(sliders[1]).toHaveAttribute('aria-valuenow', '79');

    await userEvent.keyboard('{ArrowRight}');
    await expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');

    // Test Home/End on first thumb
    await userEvent.click(sliders[0]);
    await userEvent.keyboard('{Home}');
    await expect(sliders[0]).toHaveAttribute('aria-valuenow', '0');

    // Test End on second thumb
    await userEvent.click(sliders[1]);
    await userEvent.keyboard('{End}');
    await expect(sliders[1]).toHaveAttribute('aria-valuenow', '100');

    // Test that thumbs don't cross over (thumb 1 shouldn't go above thumb 2)
    await userEvent.click(sliders[0]);
    await userEvent.keyboard('{End}'); // Try to move first thumb to end
    const thumb1Value = parseInt(sliders[0].getAttribute('aria-valuenow') || '0');
    const thumb2Value = parseInt(sliders[1].getAttribute('aria-valuenow') || '0');
    expect(thumb1Value).toBeLessThanOrEqual(thumb2Value);
  },
  parameters: {
    docs: {
      description: {
        story: 'Range slider with two thumbs for selecting a range of values.',
      },
    },
  },
};

export const WithSteps: Story = {
  args: {
    step: 10,
  },
  render: (args) => {
    const [value, setValue] = useState([50]);

    return (
      <div className="oui:w-[300px] oui:space-y-4">
        <div className="oui:space-y-2">
          <Label>Value: {value[0]} (Step: {args.step})</Label>
          <Slider
            value={value}
            onValueChange={setValue}
            {...args}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const slider = canvas.getByRole('slider');
    await expect(slider).toBeInTheDocument();

    // Test initial value and step attribute
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    await expect(slider).toHaveAttribute('aria-valuemin', '0');
    await expect(slider).toHaveAttribute('aria-valuemax', '100');

    // Test step increment with arrow keys
    await userEvent.click(slider);
    await expect(slider).toHaveFocus();

    // Arrow right should increment by step (10)
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', '60');

    // Arrow left should decrement by step (10)
    await userEvent.keyboard('{ArrowLeft}');
    await expect(slider).toHaveAttribute('aria-valuenow', '50');

    // Multiple steps
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', '70');

    // Test boundary conditions - stepping beyond max
    await userEvent.keyboard('{End}'); // Go to max (100)
    await expect(slider).toHaveAttribute('aria-valuenow', '100');
    await userEvent.keyboard('{ArrowRight}'); // Should not exceed max
    await expect(slider).toHaveAttribute('aria-valuenow', '100');

    // Test boundary conditions - stepping below min
    await userEvent.keyboard('{Home}'); // Go to min (0)
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    await userEvent.keyboard('{ArrowLeft}'); // Should not go below min
    await expect(slider).toHaveAttribute('aria-valuenow', '0');

    // Test that values align with step increments
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', '10'); // Should be step-aligned

    // Test label updates with stepped values
    const label = canvas.getByText(/Value: \d+ \(Step: 10\)/);
    await expect(label).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom step increment.',
      },
    },
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => {
    const [value, setValue] = useState([50]);

    return (
      <div className="oui:flex oui:items-center oui:space-x-4 oui:h-[200px]">
        <Label className="oui:text-sm">Volume</Label>
        <Slider
          value={value}
          onValueChange={setValue}
          {...args}
        />
        <span className="oui:text-sm oui:font-medium">{value[0]}</span>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const slider = canvas.getByRole('slider');
    await expect(slider).toBeInTheDocument();

    // Test initial value and orientation
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    await expect(slider).toHaveAttribute('aria-orientation', 'vertical');

    // Test focus behavior
    await userEvent.click(slider);
    await expect(slider).toHaveFocus();

    // For vertical sliders, arrow keys work differently:
    // Arrow Up increases value, Arrow Down decreases value
    await userEvent.keyboard('{ArrowUp}');
    await expect(slider).toHaveAttribute('aria-valuenow', '51');

    await userEvent.keyboard('{ArrowDown}');
    await expect(slider).toHaveAttribute('aria-valuenow', '50');

    // Test multiple increments
    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{ArrowUp}');
    await expect(slider).toHaveAttribute('aria-valuenow', '52');

    // Test Home and End still work
    await userEvent.keyboard('{Home}');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');

    await userEvent.keyboard('{End}');
    await expect(slider).toHaveAttribute('aria-valuenow', '100');

    // Test Page Up/Down
    await userEvent.keyboard('{Home}'); // Reset to 0
    await userEvent.keyboard('{PageUp}');
    const pageUpValue = slider.getAttribute('aria-valuenow');
    expect(parseInt(pageUpValue || '0')).toBeGreaterThan(0);

    await userEvent.keyboard('{PageDown}');
    const pageDownValue = slider.getAttribute('aria-valuenow');
    expect(parseInt(pageDownValue || '0')).toBeLessThan(parseInt(pageUpValue || '0'));

    // Test that horizontal arrow keys might not work (or work differently)
    const currentValue = slider.getAttribute('aria-valuenow');
    await userEvent.keyboard('{ArrowRight}');
    // Value should either stay the same or behave like ArrowUp
    const afterRightValue = slider.getAttribute('aria-valuenow');
    expect(parseInt(afterRightValue || '0')).toBeGreaterThanOrEqual(parseInt(currentValue || '0'));

    // Test labels and display
    await expect(canvas.getByText('Volume')).toBeInTheDocument();
    const valueDisplay = canvas.getByText(/\d+/);
    await expect(valueDisplay).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical slider orientation.',
      },
    },
  },
};

export const VolumeControl: Story = {
  render: (args) => {
    const [volume, setVolume] = useState([75]);

    return (
      <Card className="oui:w-[350px]">
        <CardHeader>
          <CardTitle>Audio Settings</CardTitle>
        </CardHeader>
        <CardContent className="oui:space-y-6">
          <div className="oui:space-y-2">
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label htmlFor="volume">Volume</Label>
              <span className="oui:text-sm oui:text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider
              id="volume"
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              {...args}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Volume control slider in a settings card.',
      },
    },
  },
};

export const PriceFilter: Story = {
  render: (args) => {
    const [priceRange, setPriceRange] = useState([25, 75]);

    return (
      <Card className="oui:w-[350px]">
        <CardHeader>
          <CardTitle>Filter Products</CardTitle>
        </CardHeader>
        <CardContent className="oui:space-y-6">
          <div className="oui:space-y-2">
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label>Price Range</Label>
              <span className="oui:text-sm oui:text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100}
              step={1}
              {...args}
            />
            <div className="oui:flex oui:justify-between oui:text-xs oui:text-muted-foreground">
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Price range filter with dual thumbs.',
      },
    },
  },
};

export const MultipleSliders: Story = {
  render: (args) => {
    const [brightness, setBrightness] = useState([80]);
    const [contrast, setContrast] = useState([60]);
    const [saturation, setSaturation] = useState([70]);

    return (
      <Card className="oui:w-[400px]">
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="oui:space-y-6">
          <div className="oui:space-y-2">
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label>Brightness</Label>
              <span className="oui:text-sm oui:text-muted-foreground">{brightness[0]}%</span>
            </div>
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              max={100}
              {...args}
            />
          </div>
          
          <div className="oui:space-y-2">
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label>Contrast</Label>
              <span className="oui:text-sm oui:text-muted-foreground">{contrast[0]}%</span>
            </div>
            <Slider
              value={contrast}
              onValueChange={setContrast}
              max={100}
              {...args}
            />
          </div>
          
          <div className="oui:space-y-2">
            <div className="oui:flex oui:items-center oui:justify-between">
              <Label>Saturation</Label>
              <span className="oui:text-sm oui:text-muted-foreground">{saturation[0]}%</span>
            </div>
            <Slider
              value={saturation}
              onValueChange={setSaturation}
              max={100}
              {...args}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple sliders for display settings configuration.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState([40]);

    return (
      <div className="oui:w-[300px] oui:space-y-4">
        <div className="oui:space-y-2">
          <Label>Disabled Slider: {value[0]}</Label>
          <Slider
            value={value}
            onValueChange={setValue}
            {...args}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled state using helper function
    await testDisabledState(canvas, 'slider');

    const slider = canvas.getByRole('slider');

    // Test that disabled slider has correct attributes
    // Component uses data-disabled instead of aria-disabled
    await expect(slider).toHaveAttribute('data-disabled');
    await expect(slider).toHaveAttribute('aria-valuenow', '40');

    // Test that value doesn't change with keyboard interaction
    const initialValue = slider.getAttribute('aria-valuenow');

    // Try clicking (should not focus)
    await userEvent.click(slider);

    // Try keyboard interactions (should not work)
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', initialValue || '40');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(slider).toHaveAttribute('aria-valuenow', initialValue || '40');

    await userEvent.keyboard('{Home}');
    await expect(slider).toHaveAttribute('aria-valuenow', initialValue || '40');

    await userEvent.keyboard('{End}');
    await expect(slider).toHaveAttribute('aria-valuenow', initialValue || '40');

    // Test that slider is not focusable
    await expect(slider).not.toHaveFocus();

    // Test label is still visible
    await expect(canvas.getByText('Disabled Slider: 40')).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled slider state.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState([50]);
    const [rangeValue, setRangeValue] = useState([25, 75]);
    const [verticalValue, setVerticalValue] = useState([60]);

    return (
      <div className="oui:space-y-8">
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Slider Examples</h3>
          <div className="oui:space-y-6">
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Single Value</p>
              <div className="oui:w-[300px] oui:space-y-2">
                <Label>Value: {singleValue[0]}</Label>
                <Slider
                  value={singleValue}
                  onValueChange={setSingleValue}
                  max={100}
                />
              </div>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Range Selection</p>
              <div className="oui:w-[300px] oui:space-y-2">
                <Label>Range: {rangeValue[0]} - {rangeValue[1]}</Label>
                <Slider
                  value={rangeValue}
                  onValueChange={setRangeValue}
                  max={100}
                />
              </div>
            </div>
            
            <div>
              <p className="oui:text-sm oui:font-medium oui:mb-4">Vertical Orientation</p>
              <div className="oui:flex oui:items-center oui:space-x-4 oui:h-[150px]">
                <Label className="oui:text-sm">Volume</Label>
                <Slider
                  orientation="vertical"
                  value={verticalValue}
                  onValueChange={setVerticalValue}
                  max={100}
                />
                <span className="oui:text-sm">{verticalValue[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different slider configurations and orientations.',
      },
    },
  },
};