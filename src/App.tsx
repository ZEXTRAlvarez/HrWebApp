import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';

function App() {

  return (
    <Router>
    {/*<Navbar />*/}
    <Routes>        
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </Router>
  )
}

export default App
