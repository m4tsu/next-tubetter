import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

export const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
});

export const theme = extendTheme({
  colors: {
    primary: '#00b5ad',
    secondary: '#e1f7f7',
    'bg-teal': '#f8ffff',
  },
  breakpoints,
  components: {
    Container: {},
  },
});
