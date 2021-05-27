import { Button } from '@chakra-ui/react';
import { FC } from 'react';

export const HeaderRightItem: FC = ({ children }) => {
  return (
    <Button
      color="white"
      _hover={{ bg: 'teal.300' }}
      variant="unstyled"
      bgColor="inherit"
      p={4}
      px={1}
      borderRadius={0}
      height="100%"
    >
      {children}
    </Button>
  );
};
