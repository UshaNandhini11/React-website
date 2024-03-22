import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'
function App() {

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
