import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagementPage from "./pages/userManagement"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/usermanagement" element={<UserManagementPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
