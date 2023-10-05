import type { Meta, StoryObj } from '@storybook/react';

import { ColsSpan } from '@libs/uikit/utils';

import { Container } from '../container';
import { ThemeContextProvider } from '../../theme';

import { Grid } from './grid';

const meta: Meta<typeof Grid> = {
  component: Grid,
};

export default meta;

type Story = StoryObj<typeof Grid>;

const grids = [
  [
    [1, 2, 3],
    [1, 2],
  ],
];

export const Overview: Story = {
  render: () => (
    <ThemeContextProvider>
      {grids.map(rows => (
        <div style={{ marginBottom: '20px' }}>
          <Grid>
            {rows.map((cols, row) => (
              <Grid.Row key={row}>
                {cols.map(col => (
                  <Grid.Col key={`${row}-${col}`} cols={(24 / cols.length) as ColsSpan}>
                    <Container
                      justifyContent="center"
                      alignContent="center"
                      padding={4}
                      backgroundColor="secondary">
                      {row}-{col}
                    </Container>
                  </Grid.Col>
                ))}
              </Grid.Row>
            ))}
          </Grid>
        </div>
      ))}
    </ThemeContextProvider>
  ),
};
