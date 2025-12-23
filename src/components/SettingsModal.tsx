import { useNotification } from '../contexts/NotificationContext';
import styles from '../styles/components/SettingsModal.module.css';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    settings,
    updateSetting,
    playNotificationSound,
    showNotification,
    vibrate,
  } = useNotification();

  function handleTestSound() {
    playNotificationSound();
  }

  async function handleTestNotification() {
    await showNotification(
      'Teste de Notificação 🔔',
      'Se você está vendo isso, as notificações estão funcionando!',
    );
  }

  function handleTestVibration() {
    vibrate([200, 100, 200]);
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="settings-title">Configurações de Notificação</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        <div className={styles.settings}>
          {/* Som */}
          <section className={styles.section}>
            <h3>🔊 Som</h3>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) =>
                  updateSetting('soundEnabled', e.target.checked)
                }
              />
              <span>Habilitar som</span>
            </label>

            {settings.soundEnabled && (
              <div className={styles.soundSelector}>
                <select
                  value={settings.selectedSound}
                  onChange={(e) =>
                    updateSetting('selectedSound', e.target.value)
                  }
                  className={styles.select}
                >
                  <option value="notification">Notificação</option>
                  <option value="bell">Sino</option>
                  <option value="chime">Carrilhão</option>
                  <option value="ping">Ping</option>
                </select>
                <button
                  onClick={handleTestSound}
                  className={styles.testButton}
                  type="button"
                >
                  🔊 Testar
                </button>
              </div>
            )}
          </section>

          {/* Notificações Desktop */}
          <section className={styles.section}>
            <h3>🔔 Notificações Desktop</h3>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) =>
                  updateSetting('notificationsEnabled', e.target.checked)
                }
              />
              <span>Habilitar notificações</span>
            </label>
            <button
              onClick={handleTestNotification}
              className={styles.testButton}
              type="button"
            >
              🔔 Testar
            </button>
          </section>

          {/* Vibração */}
          <section className={styles.section}>
            <h3>📳 Vibração (Mobile)</h3>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.vibrationEnabled}
                onChange={(e) =>
                  updateSetting('vibrationEnabled', e.target.checked)
                }
              />
              <span>Habilitar vibração</span>
            </label>
            <button
              onClick={handleTestVibration}
              className={styles.testButton}
              type="button"
            >
              📳 Testar
            </button>
            <p className={styles.hint}>
              Funciona apenas em dispositivos móveis compatíveis
            </p>
          </section>

          {/* Notificações de Progresso */}
          <section className={styles.section}>
            <h3>⏱️ Notificações de Progresso</h3>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.progressNotificationsEnabled}
                onChange={(e) =>
                  updateSetting(
                    'progressNotificationsEnabled',
                    e.target.checked,
                  )
                }
              />
              <span>Notificar em 50%, 75% e 90% do timer</span>
            </label>
            <p className={styles.hint}>
              Receba notificações silenciosas durante o ciclo Pomodoro
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
