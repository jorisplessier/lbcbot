import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { getToken, logout } from './api/leboncoin';

const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-4 font-sans bg-gray-50">
      <nav className="mb-4 space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-blue-600 hover:underline">
          About
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-blue-600 hover:underline"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}
