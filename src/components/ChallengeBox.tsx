import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChalllengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }
    
    function handleChalllengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChalllengeFailed}
                        >
                            Falhei
                           </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChalllengeSucceeded}
                        >
                            Complentei
                            </button>
                    </footer>
                </div>
            ) : (

                    <div className={styles.challengeBoxNotActive}>
                        <strong>Finalise um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                        Avanve de level completando desafios.
                    </p>
                    </div>
                )}
        </div>
    )
}