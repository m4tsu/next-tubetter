import { FC } from 'react';
import { User } from '@/store/users/model';
import { Box, Img } from '@chakra-ui/react';
import { HeaderRightItem } from './HeaderRightItem';
import { Container } from '@/components/commons/Container';

type ComponentProps = {
  user: null | User;
};

const Component: FC<ComponentProps> = ({ user }) => (
  <Box as="nav" w="100%" mb={2} bgColor="primary" color="white">
    <Container display="flex" justifyContent="space-between">
      <Box py={4}>
        <Img src="/logo-white.png" h="25px" />
      </Box>

      <Box>
        <HeaderRightItem>ユーザーを探す</HeaderRightItem>
        <HeaderRightItem>動画を登録する</HeaderRightItem>
        <HeaderRightItem>
          {user ? user.displayName : 'ログイン'}
        </HeaderRightItem>
      </Box>
    </Container>
  </Box>
);

export const GlobalHeader: FC = () => {
  const user: null | User = {
    uid: 'userA',
    pthotoURL: '',
    displayName: 'userA',
  };
  return <Component user={user} />;
};
