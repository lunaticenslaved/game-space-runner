import type { Meta, StoryObj } from '@storybook/react';

import { ThemeContextProvider } from '../../theme';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <div style={{ marginBottom: '20px' }}>
        <h3>Base Avatar</h3>
        <Avatar placeholderIcon={null} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Custom radius</h3>
        <Avatar rounded="md" placeholderIcon={null} />
      </div>
    </ThemeContextProvider>
  ),
};
