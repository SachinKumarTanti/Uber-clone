import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContext from './context/Usercontext.jsx'
import Captaincontext from './context/Captaincontext.jsx'
import SocketProvider, { SocketContext } from './context/SocketContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(

  <Captaincontext>
    <UserContext>
      <SocketProvider>
        <BrowserRouter>
             <App />
             <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
        </BrowserRouter>
      </SocketProvider >
    </UserContext>
  </Captaincontext>
  
  
)
