import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ResultsPage.scss";
import VideoEmbedComponent from "../../components/VideoEmbedComponent/VideoEmbedComponent";

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [userSession, setUserSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { isLoggedIn } = useAuth();


    // actual useffect
    useEffect(() => {
        const savedSession = localStorage.getItem("userSession");
        if (savedSession) {
            setUserSession(JSON.parse(savedSession));
        }
        setLoading(true);
        if (location.state?.responseData) {
            const rawInstitutes = location.state.responseData.institutes;
            setResults(rawInstitutes);
            setLoading(false);
            return;
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/institutes/results`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data.institutes);
                setLoading(false);
            })
            .catch(() => {
                alert("Failed to load results. Please check your connection.");
                setLoading(false);
            });
    }, [location.state]);

    // dummy useffect
    // useEffect(() => {
    //     setLoading(true);

    //     // Simulate delay like real API
    //     setTimeout(() => {
    //         const dummyData = {
    //             institutes: [
    //                 {
    //                     "name": "Indian Institute of Technology Palakkad",
    //                     "department_name": "Civil Engineering (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology Kharagpur",
    //                     "department_name": "Manufacturing Science and Engineering (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology Kharagpur",
    //                     "department_name": "Metallurgical and Materials Engineering (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology Gandhinagar",
    //                     "department_name": "Mechanical Engineering (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology (ISM) Dhanbad",
    //                     "department_name": "Mathematics and Computing (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology Kharagpur",
    //                     "department_name": "Civil Engineering (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology Roorkee",
    //                     "department_name": "Electronics and Communication Engineering (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology Madras",
    //                     "department_name": "Metallurgical and Materials Engineering (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology Delhi",
    //                     "department_name": "Mathematics and Computing (4 Years, Bachelor of Technology)"
    //                 },
    //                 {
    //                     "name": "Indian Institute of Technology (BHU) Varanasi",
    //                     "department_name": "Engineering Physics (4 Years, Bachelor of Technology)"
    //                 }
    //             ]
    //         };

    //         setResults(dummyData.institutes);
    //         setLoading(false);
    //     }, 1000); // 1 second delay
    // }, []);


    // actual handleEnahcnedResult
    const handleEnhancedResults = () => {
        const savedSession = localStorage.getItem("userSession");

        if (!savedSession) {
            setShowLoginPopup(true);
            return;
        }
        if (!isLoggedIn) {
            navigate("/MobileLogin", { state: { redirectTo: "/EnhancedQuestions" } });
            return;
        }
        const session = JSON.parse(savedSession);

        // Bypass payment check for now
        /*
        if (session.isPaid) {
        const preferences = JSON.parse(localStorage.getItem("preferences")) || {};
        const selectedYesAnswers = Object.keys(preferences).filter(key => preferences[key] === true);

        console.log("Selected preferences before navigation:", selectedYesAnswers); // Debugging log

        navigate("/EnhancedQuestions", { state: { preferences: selectedYesAnswers } });
             }
         else {
            alert("Complete your payment to unlock enhanced results.");
            navigate("/payment");
            return;
        }
        */


    };


    // Dummy
    // const handleEnhancedResults = () => {
    //     const preferences = {
    //         placement_score: false,
    //         higher_studies_score: false,
    //         academics_experience_score: false,
    //         campus_score: false,
    //         entrepreneurship_score: true
    //     };

    //     const selectedYesAnswers = Object.keys(preferences).filter(key => preferences[key] === true);

    //     console.log("Bypassing auth → Going to EnhancedQuestions");

    //     navigate("/EnhancedQuestions", {
    //         state: {
    //             preferences: selectedYesAnswers,
    //             dummyData: {
    //                 rank: "4862",
    //                 category: "OPEN",
    //                 gender: "gender-Neutral",
    //                 preferences,
    //                 institutes: [
    //                     { institute_id: "123", institute_name: "IIT Bombay", branch: "CSE" },
    //                     { institute_id: "124", institute_name: "IIT Madras", branch: "ECE" }
    //                 ]
    //             }
    //         }
    //     });
    // };

    const handleLogout = () => {
        localStorage.removeItem("userSession");
        setUserSession(null);
        navigate("/MobileLogin");
    };

    if (loading) return <p>Loading results...</p>;

    return (
        <>
            {showLoginPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Please log in to access Advanced results.</p>
                        <button onClick={() => navigate("/MobileLogin", { state: { redirectTo: "/EnhancedQuestions" } })}>
                            Log In
                        </button>
                        <button className="popup-close" onClick={() => setShowLoginPopup(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="results-container">

                <div className="table-container">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    <h1>Best Institutes & Branches for You</h1>
                                </th>
                            </tr>
                            <tr>
                                <th>Institute Name</th>
                                <th>Available Branches</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((institute, index) => (
                                <tr key={index}>
                                    <td>{institute.name}</td>
                                    <td>{institute.department_name}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className="enhanced-button-cell">
                                    <button className="enhanced-results" onClick={handleEnhancedResults}>
                                        Get Advanced Results - More Personalized
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <VideoEmbedComponent /> */}
        </>
    );
};

export default ResultsPage;
