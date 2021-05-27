import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

export const Panel: FC<BoxProps> = ({ children, ...boxProps }) => {
  return (
    <Box
      bgColor="white"
      boxShadow="0 1px 2px 0 rgba(34,36,38,.15)"
      border="1px solid rgba(34,36,38,.15)"
      p="1em"
      _hover={{ boxShadow: 'rgb(187, 187, 187) 0px 2px 8px' }}
      transitionDuration="0.3s"
      {...boxProps}
    >
      {children}
    </Box>
  );
};
