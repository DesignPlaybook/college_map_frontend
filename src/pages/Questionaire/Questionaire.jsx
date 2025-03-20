import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./Questionaire.scss";

const Questionaire = () => {
    const navigate = useNavigate(); // Initialize navigation
    const [rank, setRank] = useState("");
    const [category, setCategory] = useState("");
    const [preferences, setPreferences] = useState({
        placements: null,
        higherStudies: null,
        industryExperience: null,
        globalExposure: null,
        entrepreneurship: null,
        financialAid: null,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSelection = (key, value) => {
        setPreferences({ ...preferences, [key]: value });
    };

    const handleSubmit = async () => {
        const allAnswered = Object.values(preferences).every((val) => val !== null);
        if (!rank || !category || !allAnswered) {
            setError("Please fill all fields and answer all questions.");
            return;
        }

        const requestData = { rank, category, preferences };
        setError("");
        setLoading(true);

        try {
            // Call primary API
            const submitResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/institutes/primary_result`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!submitResponse.ok) {
                alert("Failed to submit data. Please try again.");
                return;
            }

            const submitData = await submitResponse.json();
            console.log("Primary API Response:", submitData);

            // Redirect to ResultsPage and pass data as state
            navigate("/ResultsPage", { state: { responseData: submitData } });

        } catch (error) {
            console.error("Network Error:", error);
            alert("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="find-branch-container">
            <h1 className="title">Find Your Branch</h1>
            <p className="subtitle">Enter your details and choose what matters most to you.</p>

            <div className="form-container">
                <label>JEE Advanced Rank:</label>
                <input
                    type="number"
                    min="1"
                    value={rank}
                    onChange={(e) => setRank(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="Enter your rank"
                />

                <label>Your Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="general">General</option>
                    <option value="obc">OBC</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                </select>

                <label>Which are important to you?</label>
                <div className="yes-no-group">
                    {Object.keys(preferences).map((key) => (
                        <div key={key} className="yes-no-option">
                            <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
                            <button
                                className={`yes-button ${preferences[key] === true ? "selected" : ""}`}
                                onClick={() => handleSelection(key, true)}
                            >
                                Yes
                            </button>
                            <button
                                className={`no-button ${preferences[key] === false ? "selected" : ""}`}
                                onClick={() => handleSelection(key, false)}
                            >
                                No
                            </button>
                        </div>
                    ))}
                </div>

                {error && <p className="error-message">{error}</p>}

                <button className="get-results-button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Fetching..." : "Get Results"}
                </button>
            </div>
        </div>
    );
};

export default Questionaire;
