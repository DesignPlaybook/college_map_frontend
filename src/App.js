import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import Questionaire from "./pages/Questionaire/Questionaire";
import ResultsPage from "./pages/ResultsPage/ResultsPage"
import MobileLogin from "./pages/MobileLogin/MobileLogin";
import EnhancedResults from "./pages/EnhancedResults/EnhancedResults";
import EnhancedQuestions from "./pages/EnhancedQuestions/EnhancedQuestions";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // Hide splash after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />; // Show Splash Screen first
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/main" element={<LandingPage />} />
          <Route path="/Questionaire" element={<Questionaire />} />
          <Route path="/ResultsPage" element={<ResultsPage />} />
          <Route path="/MobileLogin" element={<MobileLogin />} />
          <Route path="/EnhancedResults" element={<EnhancedResults />} />
          <Route path="/EnhancedQuestions" element={<EnhancedQuestions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
