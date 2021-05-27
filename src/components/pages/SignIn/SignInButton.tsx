import { FC, ReactElement } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { currentUserSelector } from '@/store/session/selectors';
import { useSelector } from '@/store/store';
import firebase from 'firebase/app';
import { useSetCredential } from '@/store/session/operations';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/routes';
import { auth } from '@/lib/firebase/config';

export const SignInButton: () => ReactElement = () => {
  const router = useRouter();
  const currentUser = useSelector(currentUserSelector);
  const { setCredential } = useSetCredential();
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'redirect',
    signInOptions: [
      {
        provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        customParameters: { lang: 'ja' },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setCredential(authResult as firebase.auth.UserCredential);
        console.log(redirectUrl);
        const dest = redirectUrl || Paths.top;
        router.replace(dest);

        return false;
      },
    },
  };

  if (currentUser) {
    router.push(Paths.top);
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};
