import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Favicon */}
          <link rel="shortcut icon" href="favicon.png" type="image/png" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />

          {/* PWA Manifest */}
          <link rel="manifest" href="/manifest.json" />

          {/* Meta tags para mobile */}
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Move.it" />

          {/* Theme color */}
          <meta name="theme-color" content="#5965e0" />
          <meta
            name="msapplication-TileColor"
            content="#5965e0"
          />

          {/* Apple Touch Icons */}
          <link rel="apple-touch-icon" href="/logo-full.svg" />

          {/* Meta tags de descrição */}
          <meta
            name="description"
            content="Combine técnica Pomodoro com exercícios físicos. Mantenha o foco e cuide da sua saúde!"
          />
          <meta
            name="keywords"
            content="pomodoro, produtividade, exercícios, saúde, foco, concentração"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
