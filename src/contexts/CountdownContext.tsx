import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ChallengesContext } from './ChallengesContext';
import { useNotification } from './NotificationContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge, activeChallenge } = useContext(ChallengesContext);
  const { notifyTimerComplete, notifyProgress } = useNotification();

  const totalTime = 25 * 60; // 25 minutos
  const [time, setTime] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [notifiedProgress, setNotifiedProgress] = useState<Set<number>>(
    new Set(),
  );

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(totalTime);
    setHasFinished(false);
    setNotifiedProgress(new Set());
  }

  useEffect(() => {
    if (isActive && time > 0) {
      // Calcular percentual de progresso
      const progress = Math.floor(((totalTime - time) / totalTime) * 100);

      // Notificar em marcos de progresso (50%, 75%, 90%)
      if (
        (progress >= 50 && !notifiedProgress.has(50)) ||
        (progress >= 75 && !notifiedProgress.has(75)) ||
        (progress >= 90 && !notifiedProgress.has(90))
      ) {
        let milestone = 50;
        if (progress >= 90) milestone = 90;
        else if (progress >= 75) milestone = 75;

        if (!notifiedProgress.has(milestone)) {
          notifyProgress(milestone, time);
          setNotifiedProgress((prev) => new Set(prev).add(milestone));
        }
      }

      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();

      // Notificar conclusão do timer com o desafio
      if (activeChallenge) {
        notifyTimerComplete(activeChallenge);
      }
    }
  }, [isActive, time, notifiedProgress, activeChallenge]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
