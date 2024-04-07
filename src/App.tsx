import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import Login from './components/Login'
import Products from './components/Home/Products'
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'
import SignUp from './components/Signup'
import DrawerComponent from './components/Home/Drawer'
import PrivateRouter from './router/PrivateRouter'
import { ReactElement } from 'react'
import PublicRouter from './router/PublicRouter'

export interface RouterProps {
  name: string,
  path: string,
  element: React.ReactNode,
  icon?: ReactElement,
}
function App() {
  const routes: RouterProps[] = [
    {
      name: "Products",
      path: "/",
      element: <Products />
    },
    {
      name: "Contacts",
      path: "/contact",
      element: <Contact />
    },
    {
      name: "Portfolio",
      path: "/portfolio",
      element: <Portfolio />
    }
  ]

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouter />}>
            {routes.map(route => (
              <Route path={route.path}
                element={route.element} />
            ))}
          </Route>
          <Route element={<PublicRouter />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/home" element={<DrawerComponent />} />
        </Routes>
      </BrowserRouter >

    </>
  )
}

export default App
