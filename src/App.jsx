import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home'
import Form from './Form'
import Payment from './Payment'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Form/>}/>
        <Route path='/payment' element={<Payment/>}/>
      </Routes>
    </>
  )
}

export default App
