import React, { useState, useEffect } from "react";
import "./EnhancedResults.scss";

const EnhancedResults = () => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        // Dummy data for now (replace with API later)
        setBranches([
            { id: 1, name: "Computer Science - IIT Bombay", rank: 1 },
            { id: 2, name: "Electrical Engineering - IIT Delhi", rank: 2 },
            { id: 3, name: "Mechanical Engineering - IIT Kanpur", rank: 3 },
            { id: 4, name: "Aerospace Engineering - IIT Madras", rank: 4 },
            { id: 5, name: "Civil Engineering - IIT Kharagpur", rank: 5 },
            { id: 6, name: "Data Science - IIT Hyderabad", rank: 6 },
            { id: 7, name: "AI & ML - IIT Roorkee", rank: 7 },
            { id: 8, name: "Robotics - IIT Guwahati", rank: 8 },
            { id: 9, name: "Biotech - IIT BHU", rank: 9 },
            { id: 10, name: "Metallurgy - IIT Dhanbad", rank: 10 },
        ]);
    }, []);

    const downloadResults = () => {
        // Convert branches data to CSV
        const csvContent = "data:text/csv;charset=utf-8," +
            "Rank,Branch\n" +
            branches.map(b => `${b.rank},${b.name}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "IIT_Branch_Results.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="enhanced-results-container">
            <div className="results-box">
                <h2>Top IIT Branches for You</h2>

                <div className="branch-list">
                    {branches.slice(0, 10).map((branch) => (
                        <div key={branch.id} className="branch-item">
                            <span>{branch.rank}.</span>
                            <span>{branch.name}</span>
                        </div>
                    ))}
                </div>

                <button className="button talk-button">
                    Talk to IIT Students Now
                </button>

                <button className="button download-button" onClick={downloadResults}>
                    Download File
                </button>

                <button className="button feedback-button">
                    Give Feedback
                </button>
            </div>
        </div>
    );
};

export default EnhancedResults;
