import React, { Suspense, lazy } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));

export default function App() {
  return (
    <div className="min-h-screen p-4 font-sans bg-gray-50">
      <nav className="mb-4 space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-blue-600 hover:underline">
          About
        </Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}
