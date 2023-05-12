import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  const user = "sad";
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {!user ? (
            <Route path="/*" element={<LoginScreen />} />
          ) : (
            <>
              <Route path="/" element={<HomeScreen />} />
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