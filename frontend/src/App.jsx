import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/style.css";
import { AppContextProvider } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LeadActivity from "./components/LeadActivity";
import ViewLeadActivity from "./components/ViewLeadActivity";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AppContextProvider>
      <div className="container p-2">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leadactivity" element={<LeadActivity />} />
          <Route path="/leadactivity/:id" element={<ViewLeadActivity />} />
        </Routes>
      </div>
    </AppContextProvider>
  );
};

export default App;
