import { Button } from '@chakra-ui/react';
import { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { getPath, Paths } from '@/utils/routes';

type Props = {
  uid: string;
  tag: string;
};

export const TagButton: FC<Props> = ({ uid, tag }) => {
  const router = useRouter();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(
      `${getPath({ path: Paths.videos, params: { userId: uid } })}#${tag}`
    );
  };
  return (
    <Button colorScheme="blue" py={1} px={3} size="xs" onClick={handleClick}>
      {tag}
    </Button>
  );
};
