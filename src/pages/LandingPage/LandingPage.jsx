import React from "react";
import "./LandingPage.scss";
import { FaArrowRight, FaLock } from "react-icons/fa";

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h1 className="title">WELCOME TO COLLEGE MAP</h1>
            <p className="subtitle">Know which college suits you best with a few simple steps</p>

            <div className="steps">
                <div className="step">
                    <FaArrowRight className="icon arrow" />
                    <span>Insert your rank</span>
                    <input type="text" className="rank-input" placeholder="Enter Rank" />
                </div>

                <div className="step">
                    <FaArrowRight className="icon arrow" />
                    <span>Choose what is important to you</span>
                    <div className="options">
                        <button className="option-btn">Placements</button>
                        <button className="option-btn">Higher Studies</button>
                        <button className="option-btn">Global Exposure</button>
                    </div>
                </div>

                <div className="step">
                    <FaLock className="icon lock" />
                    <span>Compare importance - gives best result</span>
                </div>

                <div className="final-step">
                    <h2>🎯 Get list of branches</h2>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
