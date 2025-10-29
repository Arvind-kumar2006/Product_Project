import React from 'react'
import {Button , Box} from '@chakra-ui/react'
import {Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/create/:id' element={<CreatePage/>}/>
      </Routes>
    </Box>
  )
}

export default App