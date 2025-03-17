import React, { useState, useEffect } from "react";
import "./LandingPage.scss";

const Typewriter = ({ text, delay = 50, onComplete }) => {
    const [displayText, setDisplayText] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText(text.substring(0, index + 1));
            index++;

            if (index === text.length) {
                clearInterval(interval);
                setIsCompleted(true);
                if (onComplete) setTimeout(onComplete, 500); // Small delay before triggering next
            }
        }, delay);

        return () => clearInterval(interval);
    }, [text, delay, onComplete]);

    return <span className={`text ${isCompleted ? "completed" : ""}`}>{displayText}</span>;
};

const LandingPage = () => {
    const [isFirstCompleted, setIsFirstCompleted] = useState(false);
    const [showSecondLine, setShowSecondLine] = useState(false);

    return (
        <div className="landing-container">
            {/* Header */}
            <header className="header">
                <h1 className="title">
                    {/* The first line remains static once typed */}
                    {isFirstCompleted ? (
                        "Welcome to College Map!"
                    ) : (
                        <Typewriter text="Welcome to College Map!" delay={50} onComplete={() => setIsFirstCompleted(true)} />
                    )}
                </h1>

                {/* The second line starts typing AFTER the first is done */}
                {isFirstCompleted && (
                    <p className="subtitle iitian-highlight">
                        <Typewriter text="By IITians, for IITians" delay={50} />
                    </p>
                )}
            </header>

            {/* Main Content Section */}
            <section className="main-content">
                <div className="text-box">
                    <h2>Why College Map?</h2>
                    <p>
                        Find the best branch for you with <span className="highlight">data-driven insights</span>
                        and <span className="highlight">real student reviews.</span>
                    </p>
                    <h2>How It Works</h2>
                    <p>Enter rank → Choose what matters → Find your branch</p>
                </div>

                {/* Try Now Button */}
                <button className="try-now">TRY NOW</button>
            </section>
        </div>
    );
};

export default LandingPage;
