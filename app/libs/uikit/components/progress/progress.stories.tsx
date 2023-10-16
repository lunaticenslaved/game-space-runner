import type { Meta, StoryObj } from '@storybook/react';

import { ThemeContextProvider } from '../../theme';

import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  component: Progress,
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <div style={{ marginBottom: '20px' }}>
        <h3>Circular Progress</h3>
        <Progress view="circle" />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Circular Progress</h3>
        <Progress view="circle" color="red" size={40} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Linear Progress</h3>
        <Progress view="line" />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Linear Progress</h3>
        <Progress view="line" color="red" size={12} />
      </div>
    </ThemeContextProvider>
  ),
};
