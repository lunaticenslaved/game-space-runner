import type { Meta, StoryObj } from '@storybook/react';

import { ThemeContextProvider } from '../../theme';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <div style={{ marginBottom: '20px' }}>
        <h3>Base Button</h3>
        <Button>Submit</Button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Loading Button</h3>
        <Button loading>Submit</Button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Disabled Button</h3>
        <Button disabled>Submit</Button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Disabled Loading Button</h3>
        <Button disabled loading>
          Submit
        </Button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Pill Radius Button</h3>
        <Button rounded="pill">Pill Radius</Button>
      </div>
    </ThemeContextProvider>
  ),
};
