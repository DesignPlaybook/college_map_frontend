import React from "react";
import "./HeroSection.scss";
import HeroImage from "../../assets/Hero.png"; // Replace with your actual image path

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-left">
                    <img src={HeroImage} alt="Confused Students" />
                </div>
                <div className="hero-right">
                    <h1>
                        Welcome To <span>CollegeMap!</span>
                    </h1>
                    <p>
                        One of the major concerns that come to mind after the completion of the JEE Main 2025 exam
                        is the JEE Main rank prediction. A good rank ensures a promising future and admission to your
                        dream college. If you are one such student who has completed
                    </p>
                    <p className="bold">No login/signup required. Try for FREE</p>
                    <button className="cta-button"><a href="/Questionaire">Try Now!</a></button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
