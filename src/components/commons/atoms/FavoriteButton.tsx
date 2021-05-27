import { User } from '@/store/users/model';
import { Flex, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Link, Paths } from '@/utils/routes';

type Props = {
  currentUser: User;
};

export const FavoriteButton: FC<Props> = ({ currentUser }) => {
  return (
    <Flex alignItems="center" flexShrink={0}>
      <IconButton
        variant="goast"
        aria-label="favorite"
        icon={<StarIcon />}
      ></IconButton>
      <div>0</div>
    </Flex>
  );
};
