import { useEffect, useRef, useState } from 'react';

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

  const [isClosing, setIsClosing] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [testingSound, setTestingSound] = useState(false);
  const [testingNotification, setTestingNotification] = useState(false);
  const [testingVibration, setTestingVibration] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Tempo da animação
  }

  async function handleTestSound() {
    setTestingSound(true);
    playNotificationSound();
    setTimeout(() => setTestingSound(false), 1000);
  }

  async function handleTestNotification() {
    setTestingNotification(true);
    await showNotification(
      'Teste de Notificação 🔔',
      'Se você está vendo isso, as notificações estão funcionando!',
    );
    setTimeout(() => setTestingNotification(false), 1000);
  }

  function handleTestVibration() {
    setTestingVibration(true);
    vibrate([200, 100, 200]);
    setTimeout(() => setTestingVibration(false), 1000);
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  // Touch handlers para swipe to close
  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.targetTouches[0].clientY);
    setIsDragging(true);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging) return;

    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart;

    // Só permite arrastar para baixo
    if (diff > 0) {
      setDragOffset(diff);
      setTouchEnd(currentTouch);
    }
  }

  function handleTouchEnd() {
    setIsDragging(false);

    // Se arrastou mais de 150px, fecha o modal
    if (dragOffset > 150) {
      handleClose();
    }

    // Reset
    setDragOffset(0);
    setTouchStart(0);
    setTouchEnd(0);
  }

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        ref={containerRef}
        className={`${styles.container} ${isClosing ? styles.containerClosing : ''}`}
        style={{
          transform: isDragging ? `translateY(${dragOffset}px)` : undefined,
          transition: isDragging ? 'none' : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag indicator para mobile */}
        <div className={styles.dragIndicator}>
          <div className={styles.dragBar} />
        </div>

        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h2 id="settings-title">⚙️ Configurações</h2>
            <p className={styles.subtitle}>
              Personalize suas notificações e alertas
            </p>
          </div>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        <div className={styles.settings}>
          {/* Som */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>🔊</span>
              </div>
              <div>
                <h3>Som</h3>
                <p className={styles.sectionDescription}>
                  Reproduzir áudio ao completar ciclos
                </p>
              </div>
            </div>

            <label className={styles.toggleLabel}>
              <span className={styles.toggleText}>Habilitar som</span>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) =>
                  updateSetting('soundEnabled', e.target.checked)
                }
                className={styles.toggleInput}
              />
              <span className={styles.toggleSlider} />
            </label>

            {settings.soundEnabled && (
              <div className={styles.expandableContent}>
                <div className={styles.soundSelector}>
                  <label htmlFor="sound-select" className={styles.inputLabel}>
                    Escolha o som
                  </label>
                  <select
                    id="sound-select"
                    value={settings.selectedSound}
                    onChange={(e) =>
                      updateSetting('selectedSound', e.target.value)
                    }
                    className={styles.select}
                  >
                    <option value="notification">🔔 Notificação</option>
                    <option value="bell">🛎️ Sino</option>
                    <option value="chime">🎵 Carrilhão</option>
                    <option value="ping">📢 Ping</option>
                  </select>
                </div>
                <button
                  onClick={handleTestSound}
                  className={`${styles.testButton} ${testingSound ? styles.testing : ''}`}
                  type="button"
                  disabled={testingSound}
                >
                  {testingSound ? '🔊 Tocando...' : '🔊 Testar Som'}
                </button>
              </div>
            )}
          </section>

          {/* Notificações Desktop */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>🔔</span>
              </div>
              <div>
                <h3>Notificações</h3>
                <p className={styles.sectionDescription}>
                  Alertas visuais no desktop
                </p>
              </div>
            </div>

            <label className={styles.toggleLabel}>
              <span className={styles.toggleText}>Habilitar notificações</span>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) =>
                  updateSetting('notificationsEnabled', e.target.checked)
                }
                className={styles.toggleInput}
              />
              <span className={styles.toggleSlider} />
            </label>

            {settings.notificationsEnabled && (
              <div className={styles.expandableContent}>
                <button
                  onClick={handleTestNotification}
                  className={`${styles.testButton} ${testingNotification ? styles.testing : ''}`}
                  type="button"
                  disabled={testingNotification}
                >
                  {testingNotification
                    ? '✅ Notificação Enviada!'
                    : '🔔 Testar Notificação'}
                </button>
              </div>
            )}
          </section>

          {/* Vibração */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📳</span>
              </div>
              <div>
                <h3>Vibração</h3>
                <p className={styles.sectionDescription}>
                  Feedback tátil em dispositivos móveis
                </p>
              </div>
            </div>

            <label className={styles.toggleLabel}>
              <span className={styles.toggleText}>Habilitar vibração</span>
              <input
                type="checkbox"
                checked={settings.vibrationEnabled}
                onChange={(e) =>
                  updateSetting('vibrationEnabled', e.target.checked)
                }
                className={styles.toggleInput}
              />
              <span className={styles.toggleSlider} />
            </label>

            {settings.vibrationEnabled && (
              <div className={styles.expandableContent}>
                <button
                  onClick={handleTestVibration}
                  className={`${styles.testButton} ${testingVibration ? styles.testing : ''}`}
                  type="button"
                  disabled={testingVibration}
                >
                  {testingVibration ? '📳 Vibrando...' : '📳 Testar Vibração'}
                </button>
                <p className={styles.hint}>
                  ✨ Funciona apenas em dispositivos móveis compatíveis
                </p>
              </div>
            )}
          </section>

          {/* Notificações de Progresso */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>⏱️</span>
              </div>
              <div>
                <h3>Progresso</h3>
                <p className={styles.sectionDescription}>
                  Alertas durante o ciclo Pomodoro
                </p>
              </div>
            </div>

            <label className={styles.toggleLabel}>
              <span className={styles.toggleText}>
                Notificar em 50%, 75% e 90%
              </span>
              <input
                type="checkbox"
                checked={settings.progressNotificationsEnabled}
                onChange={(e) =>
                  updateSetting(
                    'progressNotificationsEnabled',
                    e.target.checked,
                  )
                }
                className={styles.toggleInput}
              />
              <span className={styles.toggleSlider} />
            </label>

            {settings.progressNotificationsEnabled && (
              <div className={styles.expandableContent}>
                <p className={styles.hint}>
                  📊 Receba notificações silenciosas durante o ciclo para
                  acompanhar seu progresso
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Footer com dica de swipe */}
        <div className={styles.footer}>
          <p className={styles.footerHint}>
            <span className={styles.desktopOnly}>
              Pressione ESC para fechar
            </span>
            <span className={styles.mobileOnly}>
              Arraste para baixo para fechar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
