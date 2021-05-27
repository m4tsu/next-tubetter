import { FC } from 'react';
import { Box, Img } from '@chakra-ui/react';
import { HeaderRightItem } from './HeaderRightItem';
import { Container } from '@/components/commons/Container';
import { useSelector } from '@/store/store';
import { currentUserSelector } from '@/store/session/selectors';
import { AuthUser } from '@/store/session/models';
import { HeaderDropDown } from '@/components/layouts/GlobalHeader/HeaderDropdown';
import { Link } from '@/utils/routes';

type ComponentProps = {
  user: null | AuthUser;
};

const Component: FC<ComponentProps> = ({ user }) => (
  <Box as="nav" w="100%" mb={2} bgColor="primary" color="white">
    <Container display="flex" justifyContent="space-between">
      <Link path="/">
        <Box py={4}>
          <Img src="/logo-white.png" h="25px" />
        </Box>
      </Link>

      <Box>
        <HeaderRightItem>ユーザーを探す</HeaderRightItem>
        <HeaderRightItem>動画を登録する</HeaderRightItem>
        {user ? (
          <HeaderRightItem>
            <HeaderDropDown user={user} />
          </HeaderRightItem>
        ) : (
          <Link path="/signin">
            <HeaderRightItem>ログイン</HeaderRightItem>
          </Link>
        )}
      </Box>
    </Container>
  </Box>
);

export const GlobalHeader: FC = () => {
  const user = useSelector(currentUserSelector);

  return <Component user={user} />;
};
