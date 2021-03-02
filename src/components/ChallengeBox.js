import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext';
import {CountDownContext} from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){

  const {activeChallenge, resetChallenge, completeChallenge} =useContext(ChallengesContext);
  const {resetCountDown} = useContext(CountDownContext);

  function handleChanllengSucceeded(){
    completeChallenge();
    resetCountDown();
  }

  function handleChanllengFailed(){
    resetChallenge();
    resetCountDown();
  }

    return(
      <div className = {styles.challengeBoxContener}>

        {activeChallenge ?
          (<div className = {styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} px</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`} />
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChanllengFailed}
                >
                  Falhei
                </button>
              <button
                type="button"
                className={styles.challengeSucceededButton}
                onClick={handleChanllengSucceeded}
                >
                  completei
                </button>
            </footer>

           </div>)
          :
          (<div className = {styles.challengeNotActive}>
            <strong>Inicie um ciclo para receber desafios a serem completados</strong>
            <p>
              <img src= "icons/level-up.svg" alt="Level Up"/>
              Avance de level completando desafios.
            </p>
          </div>)
        }

      </div>
    );
}
