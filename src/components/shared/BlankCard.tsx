import { Card } from '@mui/material';
import type { ReactNode } from 'react';

interface BlankCardProps {
  children: ReactNode;
  className?: string
} 

const BlankCard = ({ children, className = '' } : BlankCardProps) => {
  return (
    <Card
      sx={{ p: 0, position: 'relative' }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
