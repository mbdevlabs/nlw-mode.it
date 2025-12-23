'use client';

import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

interface ExperienceBarProps {
  onSettingsClick?: () => void;
}

export function ExperienceBar({ onSettingsClick }: ExperienceBarProps) {
  const { currentExperience, experienceToNextLevel } =
    useContext(ChallengesContext);

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 Xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} Xp</span>
      {onSettingsClick && (
        <button
          className={styles.settingsButton}
          onClick={onSettingsClick}
          title="Configurações de Notificação"
          aria-label="Abrir configurações de notificação"
        >
          <img src="/icons/settings.svg" alt="" />
        </button>
      )}
    </header>
  );
}
