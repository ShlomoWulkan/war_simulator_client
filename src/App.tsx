import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import DefensePage from "./components/pages/defensePage"
import AttackPage from "./components/pages/attackPage"

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='/defense' element={<DefensePage />} />
        <Route path="/attack" element={<AttackPage />} />
        <Route path='/' element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
