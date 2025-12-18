import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from '@/components';
import { Label } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

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