import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ResultsPage.scss";

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
        // Load user session from local storage
        const savedSession = localStorage.getItem("userSession");
        if (savedSession) {
            setUserSession(JSON.parse(savedSession));
        }

        setLoading(true);

        // Check if results are coming from navigation state
        if (location.state?.responseData) {
            const rawInstitutes = location.state.responseData.institutes;

            // Group institutes by name
            const groupedResults = rawInstitutes.reduce((acc, curr) => {
                const existing = acc.find(item => item.name === curr.name);
                if (existing) {
                    existing.branches.push(curr.department_name);
                } else {
                    acc.push({
                        name: curr.name,
                        branches: [curr.department_name]
                    });
                }
                return acc;
            }, []);

            setResults(groupedResults);
            setLoading(false);
            return;
        }

        // Fallback: Fetch data from API if not in navigation state
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/institutes/results`)
            .then((res) => res.json())
            .then((data) => {
                // Group institutes by name
                const groupedResults = data.institutes.reduce((acc, curr) => {
                    const existing = acc.find(item => item.name === curr.name);
                    if (existing) {
                        existing.branches.push(curr.department_name);
                    } else {
                        acc.push({
                            name: curr.name,
                            branches: [curr.department_name]
                        });
                    }
                    return acc;
                }, []);
                setResults(groupedResults);
                setLoading(false);
            })
            .catch(() => {
                alert("Failed to load results. Please check your connection.");
                setLoading(false);
            });
    }, [location.state]);

    // dummy useffect
    // useEffect(() => {
    //     // Load user session from local storage
    //     const savedSession = localStorage.getItem("userSession");
    //     if (savedSession) {
    //         setUserSession(JSON.parse(savedSession));
    //     }

    //     setLoading(true);

    //     // Check if results are coming from navigation state
    //     if (location.state?.responseData) {
    //         const rawInstitutes = location.state.responseData.institutes;

    //         const groupedResults = rawInstitutes.reduce((acc, curr) => {
    //             const existing = acc.find(item => item.name === curr.name);
    //             if (existing) {
    //                 existing.branches.push(curr.department_name);
    //             } else {
    //                 acc.push({
    //                     name: curr.name,
    //                     branches: [curr.department_name]
    //                 });
    //             }
    //             return acc;
    //         }, []);
    //         setResults(groupedResults);
    //         setLoading(false);
    //         return;
    //     }

    //     // 💡 MOCK DATA HERE
    //     const dummyData = {
    //         institutes: [
    //             { name: "IIT Bombay", department_name: "Computer Science" },
    //             { name: "IIT Bombay", department_name: "Electrical" },
    //             { name: "IIT Bombay", department_name: "Mechanical" },
    //             { name: "IIT Bombay", department_name: "Civil" },
    //             { name: "IIT Bombay", department_name: "Chemical" },
    //             { name: "IIT Delhi", department_name: "Computer Science" },
    //             { name: "IIT Delhi", department_name: "Electrical" },
    //             { name: "IIT Delhi", department_name: "Mechanical" },
    //             { name: "IIT Delhi", department_name: "Civil" },
    //             { name: "IIT Delhi", department_name: "Chemical" }
    //         ]
    //     };

    //     const groupedResults = dummyData.institutes.reduce((acc, curr) => {
    //         const existing = acc.find(item => item.name === curr.name);
    //         if (existing) {
    //             existing.branches.push(curr.department_name);
    //         } else {
    //             acc.push({
    //                 name: curr.name,
    //                 branches: [curr.department_name]
    //             });
    //         }
    //         return acc;
    //     }, []);

    //     setResults(groupedResults);
    //     setLoading(false);
    // }, [location.state]);

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
                            {results.slice(0, 5).map((institute, index) => (
                                <tr key={index}>
                                    <td>{institute.name}</td>
                                    <td>
                                        <ul>
                                            {(institute.branches || []).map((branch, idx) => (
                                                <li key={idx}>{branch}</li>
                                            ))}
                                        </ul>
                                    </td>
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
        </>
    );
};

export default ResultsPage;
