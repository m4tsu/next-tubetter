import { auth, Credential, db, provider } from '@/lib/firebase/config';
import { useEffect, useRef } from 'react';
import { useSelector } from '@/store/store';
import { credentialSelector, sessionStateSelector } from './selectors';
import firebase from 'firebase/app';
import { AuthUser } from './models';
import { FS_KEY } from '@/lib/firebase/utils';
import { useDispatch } from 'react-redux';
import { receiveCredential, receiveUser } from './actions';

type WriteUserArgs = {
  firebaseUser: firebase.User;
  credential: Credential;
};

type Profile = {
  profile_image_url_https: string;
  name: string;
  screen_name: string;
};
const writeUser = async ({ firebaseUser, credential }: WriteUserArgs) => {
  // ツイッターアカウントでログイン時のディスプレイネームとアイコンURL
  const {
    profile_image_url_https: photoURL,
    name: displayName,
    screen_name: screenName,
  } = credential.additionalUserInfo?.profile as Profile;
  let authUser: AuthUser | null = null;
  const batch = db.batch();

  const userDoc = await db.collection(FS_KEY.USERS).doc(firebaseUser.uid).get();
  if (userDoc.exists) {
    const user = userDoc.data() as AuthUser;
    const diff: Partial<AuthUser> = {};
    if (user.displayName !== displayName) {
      diff.displayName = displayName;
    }
    if (user.photoURL !== photoURL) {
      diff.photoURL = photoURL;
    }
    if (user.screenName !== screenName) {
      diff.screenName = screenName;
    }
    if (diff.displayName || diff.photoURL || diff.screenName) {
      batch.update(userDoc.ref, {
        ...diff,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    authUser = { ...user, ...diff };
  } else {
    const user: AuthUser = {
      displayName,
      photoURL,
      screenName,
      uid: firebaseUser.uid,
    };
    batch.set(userDoc.ref, {
      ...user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    authUser = user;
  }
  await batch.commit();

  return authUser;
};

const findUser = async (uid: string) => {
  let authUser: AuthUser | null = null;
  const doc = await db.collection(FS_KEY.USERS).doc(uid).get();
  if (doc.exists) {
    const { displayName, photoURL, screenName } = doc.data() as AuthUser;
    authUser = { uid, displayName, photoURL, screenName };
  }
  return authUser;
};

export const useAuth = () => {
  console.log('useAuth');
  const { credential, currentUser } = useSelector(sessionStateSelector);
  const dispatch = useDispatch();
  const counter = useRef(0);
  useEffect(() => {
    console.log('effect!!!!!!!!!');
    if (credential) counter.current += 1;
    return auth.onAuthStateChanged(async (firebaseUser) => {
      console.log('hjpog', firebaseUser);
      if (firebaseUser) {
        console.log('foo');
        if (counter.current === 1 && credential) {
          const user = await writeUser({ firebaseUser, credential });
          console.log('poeeee');
          dispatch(receiveUser(user));
        } else if (!currentUser) {
          const user = await findUser(firebaseUser.uid);
          console.log('puiiiii');
          dispatch(receiveUser(user));
        } else {
          console.log('nnnnnnnnn!!');
          dispatch(receiveUser(null));
        }
      } else {
        dispatch(receiveUser(null));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credential, dispatch]);
};

export const signIn = () => {
  auth.signInWithRedirect(provider);
};

export const signOut = () => {
  auth.signOut();
};

export const useSetCredential = () => {
  const dispatch = useDispatch();

  const setCredential = (credential: firebase.auth.UserCredential) => {
    dispatch(receiveCredential(credential));
  };
  return { setCredential };
};
