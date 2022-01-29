import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { isAuth } from "./scripts/Network"
import Login from './Login/Login';
import Browse from './Browse/Browse'
import Orders from './Orders/Orders'
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {
          !isAuth() ?
            <>
              <Route path="/login" element={<Login/>}/>
              <Route path="*" element={<Navigate to="/login" />} />
            </>
            :
            <>
              <Route path="/browse" element={<Browse/>} /> 
              <Route path="/reservations" element={<Orders/>} />
              <Route path="*" element={<Navigate to="/browse" />} /> 
            </>
        }
      </Routes>
    </Router>
  );
}

export default App;
