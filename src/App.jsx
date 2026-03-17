import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from './context/AuthContext'
import Login from './screens/Login'
import Home from './screens/Home'
import BusinessDetail from './screens/BusinessDetail'
import Experiences from './screens/Experiences'
import Community from './screens/Community'
import Profile from './screens/Profile'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <div className="app-container">
      <div className="grain-overlay" />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/business/:id" element={<ProtectedRoute><BusinessDetail /></ProtectedRoute>} />
          <Route path="/experiences" element={<ProtectedRoute><Experiences /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
