import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../../card';

import { ThemeContextProvider } from '../../../theme';
import { Input } from '..';

const meta: Meta<typeof Input.File> = {
  component: Input.File,
};

export default meta;

type Story = StoryObj<typeof Input.File>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <Card>
        <Card.Title>File</Card.Title>
        <Card.Body>
          <Input.File name="name" label="Name" error="Error message" />
        </Card.Body>
      </Card>
    </ThemeContextProvider>
  ),
};
