import './App.css'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
   <div >
    <Routes>
      <Route path='' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
   </div>
  )
}

export default App
