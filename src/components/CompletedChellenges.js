import {useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext';

import styles from '../styles/components/CompletedChellenges.module.css';

export function CompletedChellenges(){
  const {challengesCompleted} =useContext(ChallengesContext);

  return(
    <div className = {styles.completedChellengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
