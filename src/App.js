import React, { Suspense, lazy }  from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Login = lazy(() => import ('./pages/login'))

function App() {
  return (
    <Router>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
