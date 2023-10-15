import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../../card';

import { ThemeContextProvider } from '../../../theme';
import { Input } from '..';

const meta: Meta<typeof Input.TextArea> = {
  component: Input.TextArea,
};

export default meta;

type Story = StoryObj<typeof Input.TextArea>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <Card>
        <Card.Title>Text Area</Card.Title>
        <Card.Body>
          <Input.TextArea name="name" label="Name" error="Error message" rows={10} />
        </Card.Body>
      </Card>
    </ThemeContextProvider>
  ),
};
