import React from 'react'
import '../styles/Home.css';
import { useUser, UserType } from '../Hooks/UserContext';
import {USERSLINK} from '../constants'
import StatusButton from '../Componentes/StatusButton';
import RealTimeChart from '../Componentes/RealTimeChart';

const Home: React.FC<{}> = () => { 
  const { user }: { user: UserType } = useUser()

  return (
    <div className='home' data-testid='home'>
      {/* <div data-testid='USER' >USER: {user.username}</div>
      <div data-testid='PASS' >PASS: {user.password}</div>
      <div data-testid='MAIL' >MAIL: {user.mail}</div>  */}
      {/* count y details deberia ser desde una api */}
      <div className='dashBoard'>
        <StatusButton
          color="#3F72AF"
          icon="✨"
          title="Waiting authorization"
          count={0}
          details={['D: 0', 'Resync: 0', 'New: 0']}
        />
        <StatusButton
          color="green"
          icon="✅"
          title="Online"
          count={1}
          details={['Total authorized: 1']}
        />
        <StatusButton
          color="gray"
          icon="❌"
          title="Total offline"
          count={0}
          details={['PwrFail: 0', 'LoS: 0', 'N/A: 0']}
        />
        <StatusButton
          color="#CD7902"
          icon="⚠️"
          title="Low signals"
          count={0}
          details={['warning:-','critical:-']}
        />
      </div>
      <div className='chart'>
        <RealTimeChart />
      </div>



    </div>
  )
}

export default Home