import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import '../styles/global.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
