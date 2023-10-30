import { ReactNode } from 'react';

import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';

export type GameLayoutProps = {
  header: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  buttonText: ReactNode;
  onButtonClick: () => void;
};

export function GameLayout({
  header,
  description,
  content,
  buttonText,
  onButtonClick,
}: GameLayoutProps) {
  return (
    <div>
      <Card>
        <CardHeader>{header}</CardHeader>
        <CardHeader>{!!description && <p>{description}</p>}</CardHeader>
        <CardContent>{content}</CardContent>
        <CardActions>
          <Button className="w-full" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
