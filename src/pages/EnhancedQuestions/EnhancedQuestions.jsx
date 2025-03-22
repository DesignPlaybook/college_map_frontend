import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EnhancedQuestions.scss"; // Make sure this file is in the same directory

const EnhancedQuestions = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({
        placements: "",
        globalExposure: "",
        industryExperience: "",
        preferredIIT: "",
    });

    const options = [
        "Slightly more important",
        "Equally important",
        "Slightly less",
        "Strongly less",
        "Very strongly less",
        "Extremely strongly less",
    ];

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Preferences:", answers);
        const backendUrl = process.env.REACT_BACKEND_URL;

        // Use it in a fetch request
        fetch(`${backendUrl}/api/some-endpoint`)
            .then(response => response.json())
            .then(data => console.log(data));

        // Store in localStorage for now
        localStorage.setItem("enhanced_answers", JSON.stringify(answers));

        fetch(`${backendUrl}/sessions/send_verification_code
`       , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(answers),
        })
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
                navigate("/enhanced-results");
            })
            .catch(error => console.error("Error submitting data:", error));


        // Redirect to results page
        navigate("/enhanced-results");
    };

    return (
        <div className="enhanced-questions-container">
            <div className="questions-box">
                <h2>Refine Your Preferences</h2>
                <form onSubmit={handleSubmit}>
                    <div className="question">
                        <label>
                            <div className="">Placements are</div>
                            <select name="placements" value={answers.placements} onChange={handleChange} required>
                                <option value="">Select</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                            <div className="">than Higher Studies.</div>
                        </label>
                    </div>

                    <div className="question">
                        <label>Global Exposure is
                            <select name="globalExposure" value={answers.globalExposure} onChange={handleChange} required>
                                <option value="">Select</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                            than Higher Studies.
                        </label>
                    </div>

                    <div className="question">
                        <label>Industry Experience is
                            <select name="industryExperience" value={answers.industryExperience} onChange={handleChange} required>
                                <option value="">Select</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                            than Higher Studies.
                        </label>
                    </div>

                    <div className="question">
                        <label>Do you have a strong preference for any IIT?</label>
                        <input
                            type="text"
                            name="preferredIIT"
                            value={answers.preferredIIT}
                            onChange={handleChange}
                            placeholder="Enter IIT name (optional)"
                        />
                    </div>

                    <button type="submit" className="button">Get Enhanced Results</button>
                </form>
            </div>
        </div>
    );
};

export default EnhancedQuestions;
