import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Router, Route, Redirect, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className="app">
      <BrowserRouter> 
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/about" element={<HomeScreen />} />
      </Routes> 
      </BrowserRouter> 
    </div>
  );
};


export default App;
