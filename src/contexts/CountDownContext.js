import {createContext, useState, useEffect, useContext} from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext';


export const CountDownContext = createContext({});

let countdownTimeout;

export function CountDownProvider({children}){

  const [time, setTime] = useState(25*60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished ] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const {startNewChallenge} = useContext(ChallengesContext);

  function startCountDown(){
    setIsActive(true);
  }

  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(25*60);
  }

  useEffect(()=>{
    if (isActive && time > 0) {
     countdownTimeout = setTimeout(()=>{
        setTime(time - 1);
      }, 1000);
    }else if (isActive && time == 0 ) {
      console.log('Terminou');
      setHasFinished(true);
      //setTime(0.1*60);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, time]);

  return (
    <CountDownContext.Provider value={{
      time,
      hasFinished,
      isActive,
      seconds,
      minutes,
      resetCountDown,
      startCountDown,
    }}>
    {children}
    </CountDownContext.Provider>
  );

}
