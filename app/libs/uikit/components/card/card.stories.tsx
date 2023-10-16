import type { Meta, StoryObj } from '@storybook/react';

import { ThemeContextProvider } from '../../theme';
import { Button } from '../button';
import { Card } from './card';
import { CardProps } from './types';

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

const CustomCard = ({
  elevation,
  loading,
  className,
}: Pick<CardProps, 'elevation' | 'loading' | 'className'>) => {
  return (
    <Card loading={loading} elevation={elevation} className={className}>
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
  );
};

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      <CustomCard loading className="mb-12" />
      <CustomCard elevation={12} />
    </ThemeContextProvider>
  ),
};
