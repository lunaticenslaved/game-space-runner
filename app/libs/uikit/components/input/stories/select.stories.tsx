import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../../card';

import { ThemeContextProvider } from '../../../theme';
import { Input } from '..';

const meta: Meta<typeof Input.Select> = {
  component: Input.Select,
};

export default meta;

type Story = StoryObj<typeof Input.Select>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <Card>
        <Card.Title>Select</Card.Title>
        <Card.Body>
          <Input.Select
            name="name"
            label="Name"
            error="Error message"
            items={[
              { id: '1', title: 'Option 1' },
              { id: '2', title: 'Option 2' },
              { id: '3', title: 'Option 3' },
            ]}
          />
        </Card.Body>
      </Card>
    </ThemeContextProvider>
  ),
};
