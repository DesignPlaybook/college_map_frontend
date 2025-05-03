import Navbar from "../../components/Navbar/Navbar"
import HeroSection from '../../components/HeroSection/HeroSection';
import Stats from '../../components/Stats/Stats';
import Team from '../../components/Team/Team';
import IITCards from '../../components/IITCards/IITCards';
import WhySection from '../../components/WhySection/WhySection';
import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';

function App() {
    return (
        <>
            <HeroSection />
            <Stats />
            <Team />
            <IITCards />
            <WhySection />
            <Testimonials />
        </>
    );
}

export default App;





// import React, { useState, useEffect } from "react";
// import "./LandingPage.scss";
// import { useNavigate } from "react-router-dom";

// const Typewriter = ({ text, delay = 50, onComplete }) => {
//     const [displayText, setDisplayText] = useState("");
//     const [isCompleted, setIsCompleted] = useState(false);

//     useEffect(() => {
//         let index = 0;
//         const interval = setInterval(() => {
//             setDisplayText(text.substring(0, index + 1));
//             index++;

//             if (index === text.length) {
//                 clearInterval(interval);
//                 setIsCompleted(true);
//                 if (onComplete) setTimeout(onComplete, 300);
//             }
//         }, delay);

//         return () => clearInterval(interval);
//     }, [text, delay, onComplete]);

//     return <span className={`landing-text ${isCompleted ? "completed" : ""}`}>{displayText}</span>;
// };

// const LandingPage = () => {
//     const [isFirstCompleted, setIsFirstCompleted] = useState(false);
//     const navigate = useNavigate();

//     return (
//         <div className="landing-page-container">
//             {/* Header Section */}
//             <header className="landing-header">
//                 <h1 className="landing-title">
//                     {isFirstCompleted ? (
//                         "Welcome to College Map!"
//                     ) : (
//                         <Typewriter text="Welcome to College Map!" delay={50} onComplete={() => setIsFirstCompleted(true)} />
//                     )}
//                 </h1>
//                 {isFirstCompleted && (
//                     <p className="landing-subtitle landing-highlight">
//                         <Typewriter text="By IITians, for IITians" delay={50} />
//                     </p>
//                 )}
//             </header>

//             {/* Information Section */}
//             <section className="landing-main-content">
//                 <div className="landing-text-box">
//                     <h2>Why Choose College Map?</h2>
//                     <p>
//                         Find the perfect branch with <span className="landing-text-highlight">data-driven insights</span> and
//                         <span className="landing-text-highlight"> real student reviews.</span>
//                     </p>

//                     <h2>How It Works</h2>
//                     <p>Enter your rank → Select your priorities → Discover your ideal branch</p>
//                 </div>

//                 {/* Call-To-Action Button */}
//                 <button className="landing-cta-button" onClick={() => navigate("/Questionaire")}>
//                     Try Now
//                 </button>
//             </section>
//         </div>
//     );
// };

// export default LandingPage;
