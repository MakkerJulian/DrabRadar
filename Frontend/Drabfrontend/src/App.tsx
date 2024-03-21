import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import {Link } from '@mui/material'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {routes.map((route)=>(
          <Route key={route.name} path={route.path} element={<route.element></route.element>}></Route>
        ))}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
