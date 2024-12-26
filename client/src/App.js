import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagementPage from "./pages/userManagement"
import PromotionManagementPage from './pages/promotionManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/usermanagement" element={<UserManagementPage />} /> 
        <Route path="/promotionmanagement" element={<PromotionManagementPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
