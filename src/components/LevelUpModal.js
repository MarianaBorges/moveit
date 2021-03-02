import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext.js';

import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){

  const {level, closeLevelUpModal} = useContext(ChallengesContext);
  return(
    <div className = {styles.overlay}>
      <div className = {styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você passou de Level</p>
        <button type='button' onClick={closeLevelUpModal}>
          <img src='icons/close.svg' alt='fechar'/>
        </button>
      </div>
    </div>
  );
}
