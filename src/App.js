import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // Hide splash after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className={`transition-opacity ${showSplash ? "opacity-0" : "opacity-100"}`}>
        <h1 className="text-center text-3xl mt-10">Main App Content</h1>
      </div>
    </>
  );
}

export default App;
