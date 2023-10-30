import { Button } from '@mui/material';

export type ErrorLayoutProps = {
  error: string;
  title: string;
  onHomeClick: () => void;
};

export const ErrorLayout = ({ error, title, onHomeClick }: ErrorLayoutProps) => {
  return (
    <div>
      <div>
        <h1>{error}</h1>
        <h2>{title}</h2>
        <Button onClick={onHomeClick}>Назад к игре</Button>
      </div>
    </div>
  );
};
