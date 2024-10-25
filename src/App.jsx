import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home'
import Form from './Form'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App
