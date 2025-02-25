// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import CampaignPage from "./pages/CampaignPage";
import CampaignEditorPage from "./pages/CampaignEditorPage";
import Layout from "./components/Layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import QuestPageWrapper from "./pages/QuestPageWrapper";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Login has no layout */}
          <Route path="/" element={<LoginPage />} />

          {/* All other routes are wrapped in Layout */}
          <Route element={<Layout />}>
            <Route path="/campaigns" element={<CampaignPage />} />
            <Route path="/campaigns/:campaignId/player" element={<QuestPageWrapper />} />
            <Route path="/campaigns/:campaignId/editor" element={<CampaignEditorPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
