import React, { FC, useMemo } from 'react';
import { toDate } from '@/lib/dayjs/utils';
import { User } from '@/store/users/model';
import { Video } from '@/store/videos/models';
import { Link, Paths } from '@/utils/routes';
import { Box, Divider, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Button } from '../../atoms/Button';
import { FavoriteButton } from '../../atoms/FavoriteButton';
import { Panel } from '../../atoms/Panel';
import { VideoView } from '../VideoView/VideoView';
import { useSelector } from '@/store/store';
import { recentVideoSelector } from '@/store/videos/selectors';

type ComponentProps = {
  video: Video;
  currentUser: User | null;
  scroll?: boolean;
  size?: 'small';
};

type VideoCardWithUserProps = {
  videoId: string;
  scroll?: boolean;
  size?: 'small';
};

const VideoCardHeader = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  align-items: baseline;
  object {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600 !important;
  }
  time {
    flex-shrink: 0;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
`;

const Component: FC<ComponentProps> = React.memo(
  ({ video, scroll, size, currentUser }) => (
    <Link
      path={Paths.video}
      params={{ userId: video.user.uid, videoId: video.videoId }}
    >
      <Panel
        margin="0px auto 1em"
        maxWidth={size === 'small' ? '480px' : '540px'}
        pb={scroll ? undefined : '0'}
        height={scroll ? undefined : '100%'}
      >
        <Box height={scroll ? 'auto' : '100%'}>
          <Grid templateColumns="1fr 6fr">
            <GridItem>
              <object>
                <Link path={Paths.videos} params={{ userId: video.user.uid }}>
                  <Img
                    src={video.user.photoURL}
                    borderRadius="50%"
                    margin="0 auto"
                  />
                </Link>
              </object>
            </GridItem>
            <GridItem>
              <VideoCardHeader>
                <object>
                  <a href="#hoge">{video.user.displayName}</a>
                </object>

                <time>{toDate(video.createdAt.toDate())}</time>
              </VideoCardHeader>
              <VideoView videoId={video.videoId} videoType={video.type} />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Box display="flex" flex="1 1 auto">
                    {video.tags &&
                      video.tags.map((tag) => (
                        <object key={`${video.id}${tag}`}>
                          <Link
                            path={Paths.videos}
                            params={{ userId: video.user.uid }}
                            hash={tag}
                          >
                            <Button colorScheme="blue" py={1} px={3} size="xs">
                              {tag}
                            </Button>
                          </Link>
                        </object>
                      ))}
                  </Box>
                  {currentUser && <FavoriteButton currentUser={currentUser} />}
                </Box>
                {video.comment && (
                  <>
                    <Divider my={2} />
                    <Text
                      overflow="hidden"
                      textAlign="left"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {video.comment}
                    </Text>
                  </>
                )}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Panel>
    </Link>
  )
);

export const VideoCardWithUser: FC<VideoCardWithUserProps> = React.memo(
  (props) => {
    const user = null;
    const videoFactory = useSelector(recentVideoSelector);
    const video = useMemo(() => {
      return videoFactory(props.videoId);
    }, [videoFactory, props.videoId]);
    console.log('factory', video);
    return <Component currentUser={user} {...props} />;
  }
);
