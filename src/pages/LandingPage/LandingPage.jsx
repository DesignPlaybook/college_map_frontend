import React, { useState, useEffect } from "react";
import "./LandingPage.scss";
import { FaArrowRight, FaLock } from "react-icons/fa";

const steps = [
    { text: "Insert your rank", icon: <FaArrowRight className="icon" /> },
    { text: "Choose what is important to you", icon: <FaArrowRight className="icon" /> },
    { text: "Compare importance - gives best result", icon: <FaLock className="icon lock" />, isPaid: true },
    { text: "🎯 Get list of branches", icon: <FaArrowRight className="icon" /> }
];

const Typewriter = ({ text, delay = 50, onComplete }) => {
    const [displayText, setDisplayText] = useState("");
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText(text.substring(0, index + 1));
            index++;
            if (index === text.length) {
                clearInterval(interval);
                setFinished(true);
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 500); // Small delay before next step
            }
        }, delay);

        return () => clearInterval(interval);
    }, [text, delay]);

    return <span className={`text ${finished ? "finished" : ""}`}>{displayText}</span>;
};

const LandingPage = () => {
    const [completedSteps, setCompletedSteps] = useState(0);

    return (
        <div className="landing-container">
            <h1 className="title">WELCOME TO COLLEGE MAP</h1>
            <p className="subtitle">Know which college suits you best with a few simple steps</p>

            <div className="steps">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${step.isPaid ? "muted" : ""} ${index <= completedSteps ? "visible" : "hidden"}`}
                    >
                        {step.isButton ? ( // Check if the step is a button
                            step.icon
                        ) : index < completedSteps ? (
                            <>
                                {step.icon}
                                <span>{step.text}</span>
                            </>
                        ) : index === completedSteps ? (
                            <>
                                {step.icon}
                                <Typewriter
                                    text={step.text}
                                    onComplete={() => setCompletedSteps((prev) => prev + 1)}
                                />
                            </>
                        ) : null}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default LandingPage;
