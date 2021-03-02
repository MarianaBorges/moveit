import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){

  const {level} =useContext(ChallengesContext);

  return (
    <div className = {styles.profileContainer}>
      <img src="http://www.conciergefloripa.com.br/wp-content/uploads/2011/06/dia-lindo.jpg" alt="Dia lindo"/>
      <div>
      <strong>Mariana Mariano Borges</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}
