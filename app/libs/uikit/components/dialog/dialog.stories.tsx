import type { Meta, StoryObj } from '@storybook/react';

import { ThemeContextProvider } from '../../theme';
import { Button } from '../button';
import { Dialog } from './dialog';
import { useDialog } from './hooks';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

const View = () => {
  const dialog = useDialog({ isOpen: true });

  return (
    <ThemeContextProvider>
      <Dialog dialog={dialog} loading>
        <Dialog.Title dialog={dialog}>Cafe Badilico</Dialog.Title>
        <Dialog.Subtitle>Small Italian Cafe</Dialog.Subtitle>
        <Dialog.Body>
          Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio
          seating.
        </Dialog.Body>
        <Dialog.Actions>
          <Button>Reserve</Button>
        </Dialog.Actions>
      </Dialog>
    </ThemeContextProvider>
  );
};

export const Overview: Story = {
  render: () => <View />,
};
