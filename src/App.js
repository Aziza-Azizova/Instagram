import React, { Suspense, lazy }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as CONSTROUTES from './constants/routes'
import UserContext from './context/user';
import UseAuthListener from './hooks/useAuthListener';
import ProtectedRoute from './helpers/protectedRoute';
import IsUserLoggedIn from './helpers/isUserLoggedIn';

const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Dashboard = lazy(() => import ('./pages/dashboard'));
const NotFound = lazy(() => import ('./pages/not-found'));
const UserProfile = lazy(() => import('./pages/userProfile'));

function App() {
  const { user } = UseAuthListener();

  return (
    <UserContext.Provider value={{user}} >
      <BrowserRouter>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Routes>
            <Route path={CONSTROUTES.LOGIN} element={<IsUserLoggedIn user={user} loggedInPath={CONSTROUTES.DASHBOARD}/>} >
              <Route path={CONSTROUTES.LOGIN} element={<Login/>} />
            </Route>
            <Route path={CONSTROUTES.SIGN_UP} element={<IsUserLoggedIn user={user} loggedInPath={CONSTROUTES.DASHBOARD}/>}>
              <Route path={CONSTROUTES.SIGN_UP} element={<SignUp/>} />
            </Route>
            <Route path={CONSTROUTES.DASHBOARD} element={<ProtectedRoute user={user} />}>
              <Route path={CONSTROUTES.DASHBOARD} element={<Dashboard/>} />
            </Route>
            <Route path={CONSTROUTES.PROFILE} element={<UserProfile/>} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
