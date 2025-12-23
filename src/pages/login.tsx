import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import Head from 'next/head';

import { authOptions } from './api/auth/[...nextauth]';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
  async function handleSignIn() {
    await signIn('github', {
      callbackUrl: '/',
    });
  }

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>Login | Move.it</title>
      </Head>

      <div className={styles.loginContent}>
        <img src="/logo-full.svg" alt="Move.it" />

        <div className={styles.loginBox}>
          <strong>Bem-vindo</strong>
          <p>Faça login com seu Github para começar</p>

          <button
            type="button"
            onClick={handleSignIn}
            className={styles.githubButton}
          >
            <img src="/icons/github.svg" alt="Github" />
            Continuar com Github
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
