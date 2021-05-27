import { MessagePanel } from '@/components/commons/atoms/MessagePanel';
import { SignInButton } from '@/components/pages/SignIn/SignInButton';
import { Box, Divider, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { NextPage } from 'next';

const SignInPage: NextPage = () => (
  <Box>
    <SignInButton />
    <MessagePanel>
      <Text as="strong">ログインすると次のことができるようになります</Text>
      <UnorderedList>
        <ListItem>
          お気に入りの動画・再生リストを登録してツイッターで共有できます
        </ListItem>
        <ListItem>
          ユーザーをフォローすると、タイムラインでそのユーザーの更新を知ることができるようになります
        </ListItem>
      </UnorderedList>
      <Divider my={2} />
      <Text as="strong">Twitterログインについて</Text>
      <UnorderedList>
        <ListItem>
          ユーザー名・アイコンを取得しユーザー情報として利用します。
        </ListItem>
        <ListItem>
          上記以外の情報の取得や、勝手にツイートなどのアクションを行うことはありません。
        </ListItem>
      </UnorderedList>
    </MessagePanel>
  </Box>
);

export default SignInPage;
