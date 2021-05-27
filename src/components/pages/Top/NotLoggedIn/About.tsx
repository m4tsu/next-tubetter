import { Box, Heading, Text } from '@chakra-ui/react';

export const About = () => (
  <Box
    mt={4}
    color="primary"
    bgColor="secondary"
    borderRadius="5px"
    p={4}
    borderColor="primary"
    borderWidth="1px"
  >
    <Heading as="h2" color="teal.500" size="lg">
      Tubetter
    </Heading>
    はお気に入りの動画を登録してシェアするサービスです。
    <Text>
      「オススメをどんどん共有したいけどツイッターだとすぐ流れてしまう...」
    </Text>
    <Text>
      「かといってYoutubeやニコニコ動画のアカウントは晒したくない...」
    </Text>
    <Text>
      このサービスに動画を登録してツイッターのフォロワーに共有して、オススメの動画を知ってもらいましょう。
    </Text>
    <Text>
      ログインすると、フォローしたユーザーの更新をタイムラインでチェックすることもできます。
    </Text>
  </Box>
);
