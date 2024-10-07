import './App.css'
import Navbar from './Components/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Problems from './Pages/Problems.jsx';
import Prob_editor from './Pages/Prob_editor.jsx';
import CreateProb from './Pages/CreateProb.jsx';
import Contests from './Pages/Contests.jsx';
import CreateContest from './Pages/CreateContest.jsx';
import ForgotPassword from './Components/Forgotpasssword.jsx';
import Contesteditor from './Pages/Contesteditor.jsx';
import ResetPassword from './Components/ResetPassword.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import LeaderboardPage from './Components/Leaderboard.jsx';
import UpdateProb from './Pages/UpdateProb.jsx';
import { Authprovider } from './AuthContext.jsx';

function App() {
  
  return (
    <>
    <Authprovider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/logout' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/problems' element={<PrivateRoute element={Problems} />}/>
          <Route path='/editor/:id' element={<PrivateRoute element={Prob_editor} />}/>
          <Route path='/createProb' element={<PrivateRoute element={CreateProb} />}/>
          <Route path='/contest' element={<PrivateRoute element={Contests} />}/>
          <Route path='/CreateContest' element={<CreateContest/>}/>
          <Route path='/forgot-pass' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
          <Route path='/leaderboard' element={<LeaderboardPage/>}/>
          <Route path='/Contesteditor/:id' element={<Contesteditor/>}/>
          <Route path='/updateProb/:id' element={<UpdateProb/>}/>
        </Routes>
      </BrowserRouter>
      </Authprovider>
    </>
  )
}

export default App
