import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Dashboard from './pages/Dashboard'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainDashboard from './pages/CaptainDashboard'
import Captainlogout from './pages/Captainlogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<UserProtectedWrapper> <Dashboard/> </UserProtectedWrapper>}/>
        <Route path='/captain-home' element={<CaptainProtectedWrapper> <CaptainDashboard/> </CaptainProtectedWrapper> }/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
       <Route path='/user-logout' element={<UserProtectedWrapper> <UserLogout/> </UserProtectedWrapper>} />
       <Route path='/captain-logout' element={<CaptainProtectedWrapper> <Captainlogout/> </CaptainProtectedWrapper>} />
       <Route path='/riding' element={<Riding/>} />
      <Route path='/captain-riding' element={<CaptainRiding/>} />
      </Routes>
    </div> 
  )
}

export default App 