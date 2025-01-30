import './App.css';
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
const UserTable = lazy(() => import("./pages/UserTable"));
const TutorDashboard = lazy(() => import("./pages/TutorDashboard"));
const Landing = lazy(() => import("./pages/Landing"));


function App() {

  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/dashboard/user-management" element={<UserTable />}></Route>
          <Route path="/dashboard" element={<TutorDashboard />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
