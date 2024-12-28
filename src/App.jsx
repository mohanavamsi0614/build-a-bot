import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home'
import Form from './Form'
import Payment from './Payment'
import Admin from './Admin'
// import Prob from './ProblemStatements'
import TeamPanel from './TeamPanel'
import AllTeamsAttendance from './OA'
import Score from './Score'
import AllScore from './AllScore'
function App() {

  return (
    <div className='home w-full h-full'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Form/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/admin' element={<Admin/>}/>
        {/* <Route path='/ps' element={<Prob/>}/> */}
        <Route path='/teampanel' element={<TeamPanel/>}/>
        <Route path='/at' element={<AllTeamsAttendance/>}/>
        <Route path='/Score' element={<Score/>}/>
        <Route path='/allscore' element={<AllScore/>}/>
      </Routes>
    </div>
  )
}

export default App
