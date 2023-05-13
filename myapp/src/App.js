import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import React, { useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const App = () => {
  const user = null;
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((userAuth) => {
        if(userAuth){
          //loggin
          console.log(userAuth)
        } else {
          //logout
        }
    })
  },[])

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {!user ? (
            <Route path="/*" element={<LoginScreen />} />
          ) : (
            <>
              {/* <Route path="/" element={<HomeScreen />} /> */}
              {/* <Route path="/about" element={<HomeScreen />} /> */}
              {/* <Route path="/*" element={<Navigate to="/" />} /> */}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;