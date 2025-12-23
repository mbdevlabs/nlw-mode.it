import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/global.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
