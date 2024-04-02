import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import Login from './components/Home/Login'
import About from './components/About'
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'
import SignUp from './components/Home/Signup'
import DrawerComponent from './components/Home/DrawerComponent'
function App() {

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<DrawerComponent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
