import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { authOptions } from './api/auth/[...nextauth]';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  user: {
    name: string | null;
    image: string | null;
    login: string | null;
  };
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Mode - it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section className={styles.sectionGroup}>
            <div>
              <Profile
                name={props.user.name}
                avatar={props.user.image}
                username={props.user.login}
              />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      session,
      level: Number(level) || 1,
      currentExperience: Number(currentExperience) || 0,
      challengesCompleted: Number(challengesCompleted) || 0,
      user: {
        name: session.user.name,
        image: session.user.image,
        login: session.user.login || null,
      },
    },
  };
};
