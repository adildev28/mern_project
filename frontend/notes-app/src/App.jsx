import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/home/Home'
import SignUp from './pages/signUp/SignUp';
import Login from './pages/Login/Login';

function App() {
  const [count, setCount] = useState(0)
  const routes = (
    <Router>
      <Routes>
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </Router>
  );
  return (
    <div>
      {routes}
    </div>
    
  )
}

export default App
