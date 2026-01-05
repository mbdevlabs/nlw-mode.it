import { SpeedInsights } from '@vercel/speed-insights/next';
import { SessionProvider } from 'next-auth/react';

import { NotificationProvider } from '../contexts/NotificationContext';
import { ThemeProvider } from '../contexts/ThemeContext';

import type { AppProps } from 'next/app';
import '../styles/global.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <SpeedInsights />
        </SessionProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
