import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'


function App() {
  
  return (
    <AuthProvider>
    
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute><Landing/></PublicRoute>}/>
          <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        </Routes>
     </BrowserRouter>
    </AuthProvider>
  )
}

export default App
