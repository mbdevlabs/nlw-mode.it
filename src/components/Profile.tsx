import { signOut } from 'next-auth/react';
import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  name: string | null;
  avatar: string | null;
  username: string | null;
}

export function Profile({ name, avatar, username }: ProfileProps) {
  const { level } = useContext(ChallengesContext);
  const { theme, toggleTheme } = useTheme();

  const displayName = name || username || 'User';
  const avatarUrl = avatar || 'https://github.com/github.png';

  async function handleSignOut() {
    await signOut({
      callbackUrl: '/login',
    });
  }

  return (
    <div className={styles.profileContainer}>
      <img src={avatarUrl} alt={displayName} />
      <div>
        <strong>{displayName}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className={styles.themeToggle}
        title={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
      >
        <img
          src={theme === 'light' ? '/icons/moon.svg' : '/icons/sun.svg'}
          alt="Toggle theme"
        />
      </button>
      <button
        type="button"
        onClick={handleSignOut}
        className={styles.signOutButton}
        title="Sair"
      >
        <img src="/icons/sign-out.svg" alt="Sair" />
      </button>
    </div>
  );
}
