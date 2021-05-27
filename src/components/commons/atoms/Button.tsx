import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

type Props =
  | ({
      primary: true;
    } & Omit<ButtonProps, 'color' | 'colorCheme' | 'bgColor'>)
  | (ButtonProps & { primary?: never });

export const Button: FC<Props> = ({ primary, children, ...buttonProps }) => (
  <>
    {primary ? (
      <ChakraButton
        {...buttonProps}
        color="white"
        bgColor="primary"
        _hover={{ bgColor: 'teal.500' }}
      >
        {children}
      </ChakraButton>
    ) : (
      <ChakraButton {...buttonProps}>{children}</ChakraButton>
    )}
  </>
);
