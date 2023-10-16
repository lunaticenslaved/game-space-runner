import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../../card';

import { ThemeContextProvider } from '../../../theme';
import { Input } from '..';

const meta: Meta<typeof Input.TextInput> = {
  component: Input.TextInput,
};

export default meta;

type Story = StoryObj<typeof Input.TextInput>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <Card>
        <Card.Title>Text Input</Card.Title>
        <Card.Body>
          <Input.TextInput name="name" label="Name" error="Error message" />
        </Card.Body>
      </Card>
    </ThemeContextProvider>
  ),
};
