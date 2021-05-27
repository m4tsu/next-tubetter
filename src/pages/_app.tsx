import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalHeader } from '@/components/layouts/GlobalHeader/GlobalHeader';
import { theme } from '@/lib/chakraUI/theme';
import { Main } from '@/components/layouts/Main/Main';
import Head from 'next/head';
import { useAuth } from '@/store/session/operations';
import { FC } from 'react';

const Initialize = () => {
  useAuth();
  return null;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Initialize />
      <ChakraProvider theme={theme}>
        <GlobalHeader />
        <Head>
          <title>Tubetter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Main>
          <Component {...pageProps} />
        </Main>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
