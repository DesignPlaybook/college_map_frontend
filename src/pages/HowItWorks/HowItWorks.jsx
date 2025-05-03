import React from "react";
import "./HowItWorks.scss";

const steps = [
    {
        id: "rank",
        title: "Enter Your Rank",
        icon: "⭐",
        description: "Start your journey by providing your rank - the foundation for discovering your best-fit IIT and branch.",
    },
    {
        id: "priorities",
        title: "Tell Us Your Priorities",
        icon: "✔️",
        description: "Help us understand what matters the most to you - placements, research, exposure - we tailor to your goals.",
    },
    {
        id: "algorithm",
        title: "How our Algorithm works",
        icon: "⚙️",
        description: "Our smart algorithm analyzes numerous data points to bring you the most optimised and personalised choices.",
    },
    {
        id: "bestfit",
        title: "Get Your Best-Fit IIT & Branch",
        icon: "🏛️",
        description: "Receive curated options that align perfectly with your preferences, aspirations, and performance.",
    },
    {
        id: "guidance",
        title: "Expert Guidance by IITians",
        icon: "👤",
        description: "Backed by real experiences - IITians guide you at every step with clarity and confidence.",
    },
    {
        id: "finalized",
        title: "Your Perfect Choice, Finalized!",
        icon: "✅",
        description: "Walk in complete clarity, knowing your final choice is the best match for your future.",
    },
];

const HowItWorks = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id); // Correct scope for element
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - 80; // adjust offset as needed
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <div className="how-it-works">
            <h2>HOW IT WORKS</h2>
            <div className="timeline">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`timeline-step ${index % 2 === 0 ? "left" : "right"}`}
                        onClick={() => scrollToSection(step.id)} // Calls the corrected scroll function
                    >
                        <div className="content">
                            {index % 2 === 0 ? (
                                <>
                                    <div className="text">{step.title}</div>
                                    <div className="icon">{step.icon}</div>
                                </>
                            ) : (
                                <>
                                    <div className="icon">{step.icon}</div>
                                    <div className="text">{step.title}</div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="details">
                {steps.map((step) => (
                    <div key={step.id} id={step.id} className="detail-section">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
