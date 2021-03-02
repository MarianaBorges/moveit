import {ExperienceBar} from  '../components/ExperienceBar.js';
import {CompletedChellenges} from  '../components/CompletedChellenges.js';
import {Profile} from '../components/Profile';
import {CountDown} from '../components/CountDown.js';
import {ChallengeBox} from '../components/ChallengeBox.js';
import {CountDownProvider} from '../contexts/CountDownContext';
import {ChallengeProvider} from '../contexts/ChallengesContext';
import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';

export default function Home(props) {
  return (
    <ChallengeProvider
    level={props.level}
    currentExperience = {props.currentExperience}
    challengesCompleted={props.challengesCompleted}>

      <div className = {styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />
        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChellenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps = async (ctx)=>{

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return (
    {
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted),
      }
    }
  )
}
