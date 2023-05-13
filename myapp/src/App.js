import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
  const user = useSelector(selectUser);
  console.log(user)
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
        if(userAuth){
          //loggin
          console.log("userAuth", userAuth)
          dispatch(login({
            uid:userAuth.uid,
            email:userAuth.email
          }))
        } else {
          //logout
          dispatch(logout);
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
              <Route path="/" element={<HomeScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;