import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple test component to verify routing works
const TestHome = () => {
  return (
    <div style={{ padding: '20px', fontSize: '18px' }}>
      <h1>🎉 Home Page is Working!</h1>
      <p>If you can see this, routing is working correctly.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Dashboard (might show blank if Dashboard component has issues)
        </a>
      </div>
    </div>
  );
};

// Simple dashboard test
const TestDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Test</h1>
      <p>Dashboard is working</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back to Home</a>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Test routes without complex components first */}
          <Route path="/" element={<TestHome />} />
          <Route path="/test" element={<div><h1>Test Route Works!</h1></div>} />
          <Route path="/dashboard" element={<TestDashboard />} />
          
          {/* Fallback for any other routes */}
          <Route path="*" element={
            <div style={{ padding: '20px' }}>
              <h1>404 - Route not found</h1>
              <p>Current URL: {window.location.pathname}</p>
              <a href="/" style={{ color: 'blue' }}>Go Home</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;