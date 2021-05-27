import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

export const MessagePanel: FC<BoxProps> = ({ children, ...boxProps }) => (
  <Box
    bgColor="bg-teal"
    color="#276f86"
    boxShadow="inset 0 0 0 1px #a9d5de, 0 0 0 0 transparent;"
    border="1px solid rgba(34,36,38,.15)"
    borderRadius="4px"
    p="1em"
    {...boxProps}
  >
    {children}
  </Box>
);
