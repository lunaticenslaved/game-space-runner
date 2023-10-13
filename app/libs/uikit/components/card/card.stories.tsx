import type { Meta, StoryObj } from '@storybook/react';

import { ThemeContextProvider } from '../../theme';
import { Button } from '../button';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <Card loading>
        <Card.Title>Cafe Badilico</Card.Title>
        <Card.Subtitle>Small Italian Cafe</Card.Subtitle>
        <Card.Body>
          Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio
          seating.
        </Card.Body>
        <Card.Actions>
          <Button>Reserve</Button>
        </Card.Actions>
      </Card>
    </ThemeContextProvider>
  ),
};
