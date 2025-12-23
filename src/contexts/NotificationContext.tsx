import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface NotificationSettings {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  vibrationEnabled: boolean;
  progressNotificationsEnabled: boolean;
  selectedSound: 'notification' | 'bell' | 'chime' | 'ping';
}

interface NotificationContextData {
  settings: NotificationSettings;
  updateSetting: (
    key: keyof NotificationSettings,
    value: boolean | string,
  ) => void;
  playNotificationSound: () => void;
  showNotification: (
    title: string,
    body: string,
    options?: NotificationOptions,
  ) => Promise<void>;
  vibrate: (pattern?: number | number[]) => void;
  notifyTimerComplete: (challenge: Challenge) => void;
  notifyProgress: (percentage: number, timeRemaining: number) => void;
}

const NotificationContext = createContext({} as NotificationContextData);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [settings, setSettings] = useState<NotificationSettings>({
    soundEnabled: true,
    notificationsEnabled: true,
    vibrationEnabled: false,
    progressNotificationsEnabled: false,
    selectedSound: 'notification',
  });

  // Carregar configurações do localStorage ao montar
  useEffect(() => {
    const savedSettings = localStorage.getItem('notification-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Pedir permissão de notificações
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Salvar configurações no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('notification-settings', JSON.stringify(settings));
  }, [settings]);

  function updateSetting(
    key: keyof NotificationSettings,
    value: boolean | string,
  ) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function playNotificationSound() {
    if (!settings.soundEnabled) return;

    const audio = new Audio(`/sounds/${settings.selectedSound}.mp3`);
    audio.play().catch((err) => {
      console.error('Failed to play sound:', err);
    });
  }

  async function showNotification(
    title: string,
    body: string,
    options?: NotificationOptions,
  ) {
    if (!settings.notificationsEnabled) return;

    // Pedir permissão se ainda não foi concedida
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }

    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/logo-full.svg',
        badge: '/logo-full.svg',
        ...options,
      });
    }
  }

  function vibrate(pattern: number | number[] = 200) {
    if (!settings.vibrationEnabled) return;

    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  function notifyTimerComplete(challenge: Challenge) {
    // Tocar som
    playNotificationSound();

    // Mostrar notificação desktop
    showNotification('Novo desafio 🎯', `Valendo ${challenge.amount}xp!`, {
      requireInteraction: true,
    });

    // Vibrar (padrão: vibra-pausa-vibra)
    vibrate([200, 100, 200]);
  }

  function notifyProgress(percentage: number, timeRemaining: number) {
    if (!settings.progressNotificationsEnabled) return;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Notificação silenciosa (visual only)
    showNotification(`${percentage}% concluído!`, `Faltam ${timeStr}`, {
      silent: true,
    });

    // Vibração baseada no progresso
    if (percentage === 50) {
      vibrate([100]); // Curta
    } else if (percentage === 75) {
      vibrate([100, 50, 100]); // Média
    } else if (percentage === 90) {
      vibrate([100, 50, 100, 50, 100]); // Longa
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        settings,
        updateSetting,
        playNotificationSound,
        showNotification,
        vibrate,
        notifyTimerComplete,
        notifyProgress,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  return context;
}
