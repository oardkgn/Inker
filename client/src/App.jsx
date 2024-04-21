import { useState } from 'react'
import Navbar from './components/Navbar'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
       <Route path='/' element={<Home />}/>
       <Route path='/home' element={<Home />}/>
       <Route path='/auth' element={<Auth />}/>
       <Route path='/profile' element={<Profile />}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
  )
}

export default App
