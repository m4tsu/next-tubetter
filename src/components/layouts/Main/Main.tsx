import { Container } from '@/components/commons/Container';
import { FC } from 'react';

export const Main: FC = ({ children }) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
};
