import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
// import OtherPage from "./pages/OtherPage";

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
          <Route path="/aditya" element={<LandingPage />} />
          {/* <Route path="/other" element={<OtherPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
