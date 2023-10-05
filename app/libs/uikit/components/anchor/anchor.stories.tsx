import type { Meta, StoryObj } from '@storybook/react';

import { ThemeContextProvider } from '../../theme';

import { Anchor } from './anchor';

const meta: Meta<typeof Anchor> = {
  component: Anchor,
};

export default meta;

type Story = StoryObj<typeof Anchor>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <div style={{ marginBottom: '20px' }}>
        <h3>Base Anchor</h3>
        <Anchor to="/">Link to another site</Anchor>
      </div>
    </ThemeContextProvider>
  ),
};
