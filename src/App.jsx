import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home'
import Form from './Form'
import Payment from './Payment'
function App() {

  return (
    <div className='home w-full h-full'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Form/>}/>
        <Route path='/payment' element={<Payment/>}/>
      </Routes>
    </div>
  )
}

export default App
