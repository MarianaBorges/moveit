import {createContext, useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import {LevelUpModal} from '../components/LevelUpModal.js';

export const ChallengesContext = createContext({});

export function ChallengeProvider({children, ...rest}){
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience]=useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted]=useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level+1)* 4, 2);


  useEffect(()=>{
    Notification.requestPermission();
  },[]);

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level,currentExperience,challengesCompleted]);

  function closeLevelUpModal(){
    setIsLevelModalOpen(false);
  }

  function levelUp(){
    setLevel(level+1);
    setIsLevelModalOpen(true);
  }
  function completeChallenge(){

    if (!activeChallenge){
      return;
    }

    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted+1);
  }

  function startNewChallenge(){
    const randomChallengesIndex = Math.floor(Math.random()*challenges.length);
    const challenge = challenges[randomChallengesIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission ==='granted'){
      new Notification('Novo desafio',{
        body:`Valendo ${challenge.amount}xp`,
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value = {{level,
                currentExperience,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal,
                                      }}>
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
