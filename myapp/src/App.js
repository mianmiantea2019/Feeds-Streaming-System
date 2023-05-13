import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
        if(userAuth){
          //loggin
          console.log("userAuth", userAuth)
        } else {
          //logout
        }
    })
    return unsubscribe;
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