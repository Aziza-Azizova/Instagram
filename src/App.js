import React, { Suspense, lazy }  from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import * as CONSTROUTES from './constants/routes'
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';

const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Dashboard = lazy(() => import ('./pages/dashboard'));
const NotFound = lazy(() => import ('./pages/not-found'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{user}} >
      <Router>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Routes>
            <Route path={CONSTROUTES.LOGIN} element={<Login/>}/>
            <Route path={CONSTROUTES.SIGN_UP} element={<SignUp/>}/>
            <Route path={CONSTROUTES.DASHBOARD} element={<Dashboard/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
