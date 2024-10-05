import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/templates/layout';
import Home from './components/pages/Home';
import Alerts from './components/pages/Alerts';
import Search from './components/pages/Search';
import Login from './pages/Login';
import ProtectedRoute from './components/utilities/ProtectedRoute';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Verify session
    // const auth = localStorage.getItem('isAuthenticated');
    // setIsAuthenticated(auth === 'true');
  }, []);
  console.log({isAuthenticated});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/crops"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout>
                <Alerts />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout>
                <Search />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
