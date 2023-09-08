import { FC } from 'react';

import { Container, ContainerProps } from './components/container';
import { Col, ColProps } from './components/col';
import { Row, RowProps } from './components/row';

export const Grid: {
  Container: FC<ContainerProps>;
  Col: FC<ColProps>;
  Row: FC<RowProps>;
} = {
  Container,
  Col,
  Row,
};
