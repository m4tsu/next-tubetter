import { ReactElement } from 'react';
import {
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AuthUser } from '@/store/session/models';
import { signOut } from '@/store/session/operations';

type ComponentProps = {
  user: AuthUser;
  handleClickLogout: () => void;
};

const Component: (props: ComponentProps) => ReactElement = ({
  user,
  handleClickLogout,
}) => (
  <Menu>
    <MenuButton as={Box} fontWeight="bold">
      {user.displayName}
      <ChevronDownIcon />
    </MenuButton>
    <MenuList color="black">
      <MenuItem>タイムライン</MenuItem>
      <MenuItem>動画</MenuItem>
      <MenuItem>動画を登録する</MenuItem>
      <Divider />
      <MenuItem>フォロー中</MenuItem>
      <MenuItem>フォロワー</MenuItem>
      <MenuItem>ユーザーを探す</MenuItem>
      <Divider />
      <MenuItem>FAQ</MenuItem>
      <Divider />
      <MenuItem onClick={handleClickLogout}>ログアウト</MenuItem>
    </MenuList>
  </Menu>
);

type HeaderDropDownProps = Pick<ComponentProps, 'user'>;

export const HeaderDropDown: (props: HeaderDropDownProps) => ReactElement = ({
  user,
}) => {
  const handleClickLogout = signOut;
  return <Component user={user} handleClickLogout={handleClickLogout} />;
};
