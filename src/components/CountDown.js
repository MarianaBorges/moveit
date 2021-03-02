import {useState, useEffect, useContext} from 'react';
import {CountDownContext} from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';

export function CountDown(){

  const {
    time,
    hasFinished,
    isActive,
    seconds,
    minutes,
    resetCountDown,
    startCountDown,
  } = useContext(CountDownContext);

  const [minuteLeft,minuteRight] = String(minutes).padStart(2,'0').split('');
  const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');

  return (
    <div>
      <div className = {styles.countdownContainer} >

        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>

      </div>

      {hasFinished ?
        (<button
          disabled
          className={styles.countdownButton}
          >
          Ciclo Encerrado
        </button>):(
          <>
            { isActive ?
              (<button
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                type="button"
                onClick={resetCountDown}>
                    Abandonar Ciclo
              </button>)
              :
              (<button
                className={styles.countdownButton}
                type="button"
                onClick={startCountDown}>
                  Iniciar um ciclo
                </button>)
              }
          </>
        )
      }
    </div>
  );
}
