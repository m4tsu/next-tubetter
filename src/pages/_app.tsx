import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalHeader } from '@/components/layouts/GlobalHeader/GlobalHeader/GlobalHeader';
import { theme } from '@/lib/chakraUI/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <GlobalHeader />
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
