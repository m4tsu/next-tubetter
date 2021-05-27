import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Button } from '@/components/commons/atoms/Button';
import { About } from './About';
import { RecentVideos } from './RecentVideos/RecentVideos';
import { Link } from '@/utils/routes';

export const NotLoggedIn = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
      <Box>
        <Link path="/signin">
          <Button primary>ログインはこちらから</Button>
        </Link>
        <About />
      </Box>
      <Box>
        <RecentVideos />
      </Box>
    </SimpleGrid>
  );
};
