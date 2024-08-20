import { Route, Routes } from 'react-router-dom';
import "./app.css";
import { AuthProvider } from './components/Auth/AuthContext';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Header } from './components/Header/Header';
import { GameRoom } from './pages/GameRoom/GameRoom';
import { Home } from "./pages/Home/Home";
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
function App() {
  return (
    <div className="h-screen flex flex-col">
      <AuthProvider>
        <Header />
        <div className='flex justify-center items-center w-full h-full'>

          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/gameroom/:roomName" element={<ProtectedRoute><GameRoom /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  )
}

export default App
