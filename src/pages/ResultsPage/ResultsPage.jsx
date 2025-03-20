import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultsPage.scss";

const dummyData = {
    institutes: [
        {
            id: 1,
            name: "IIT Bombay",
            branches: [{ id: 101, name: "Computer Science" }],
        },
        {
            id: 2,
            name: "IIT Delhi",
            branches: [{ id: 102, name: "Electrical Engineering" }],
        },
        {
            id: 3,
            name: "IIT Madras",
            branches: [{ id: 103, name: "Civil Engineering" }],
        },
    ],
};

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const responseData = location.state?.responseData || dummyData;
    const [userSession, setUserSession] = useState(null);

    useEffect(() => {
        // Check user session on page load
        const checkUserSession = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserSession(data);
                    handleUserRedirect(data);
                } else {
                    navigate("/MobileLogin"); // Redirect to login if not signed in
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        };

        checkUserSession();
    }, []);

    const handleUserRedirect = (session) => {
        if (session.tries < 0) {
            alert("Redirecting to payment...");
            setTimeout(() => {
                alert("Payment successful! Redirecting...");
                navigate("/EnhancedQuestions");
            }, 2000);
        } else if (session.tries > 1) {
            navigate("/EnhancedQuestions");
        }
    };

    const handleEnhancedResults = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                alert("You are not signed in. Redirecting to login...");
                navigate("/MobileLogin");
                return;
            }

            const userSession = await response.json();
            handleUserRedirect(userSession);
        } catch (error) {
            console.error("Error checking session:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
            setUserSession(null);
            navigate("/MobileLogin");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="results-container">
            <h1 className="title">Best Institutes & Branches for You</h1>

            {/* Table for displaying results */}
            <div className="table-container">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Institute Name</th>
                            <th>Available Branches</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData.institutes?.map((institute) => (
                            <tr key={institute.id}>
                                <td>{institute.name}</td>
                                <td>
                                    <ul>
                                        {institute.branches?.map((branch) => (
                                            <li key={branch.id}>{branch.name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="enhanced-results" onClick={handleEnhancedResults}>
                🔥 Get Enhanced Results - More Personalized 🔥
            </button>

            <div className="action-section">
                <button className="talk-button">Talk to IIT Students Now!</button>
                <button className="demo-button">Watch Demo Video</button>
            </div>

            {/* Logout Button */}
            {userSession && (
                <div className="profile-section">
                    <p>Welcome, {userSession.name || "User"}!</p>
                    <button className="logout-button" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;



// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./ResultsPage.scss";

// const dummyData = {
//     institutes: [
//         {
//             id: 1,
//             name: "IIT Bombay",
//             branches: [
//                 { name: "Computer Science" },
//             ],
//         },
//         {
//             id: 2,
//             name: "IIT Delhi",
//             branches: [
//                 { name: "Electrical Engineering" },
//             ],
//         },
//         {
//             id: 3,
//             name: "IIT Madras",
//             branches: [
//                 { name: "Civil Engineering" },
//             ],
//         },
//         {
//             id: 4,
//             name: "IIT Madras",
//             branches: [
//                 { name: "Civil Engineering" },
//             ],
//         },
//         {
//             id: 5,
//             name: "IIT Madras",
//             branches: [
//                 { name: "Civil Engineering" },
//             ],
//         },
//     ],
// };


// const ResultsPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const responseData = location.state?.responseData || dummyData || {}; // Default to an empty object
//     const [userSession, setUserSession] = useState(null);

//     useEffect(() => {
//         // Fetch user session status from backend
//         const checkUserSession = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
//                     method: "GET",
//                     credentials: "include",
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setUserSession(data);
//                 } else {
//                     setUserSession(null);
//                 }
//             } catch (error) {
//                 console.error("Error fetching session:", error);
//             }
//         };

//         checkUserSession();
//     }, []);

//     const handleEnhancedResults = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
//                 method: "GET",
//                 credentials: "include",
//             });

//             if (!response.ok) {
//                 alert("You are not signed in. Redirecting to login...");
//                 navigate("/MobileLogin");
//                 return;
//             }

//             const userSession = await response.json();

//             if (userSession.tries <= 0) {
//                 alert("Redirecting to payment...");
//                 setTimeout(() => {
//                     alert("Payment successful! Redirecting...");
//                     navigate("/EnhancedQuestions");
//                 }, 2000);
//             } else if (userSession.tries > 1) {
//                 navigate("/EnhancedQuestions");
//             }
//         } catch (error) {
//             console.error("Error checking session:", error);
//             alert("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div className="results-container">
//             <h1 className="title">Best Institutes & Branches for You</h1>

//             {/* Table for displaying results */}
//             <div className="table-container">
//                 <table className="results-table">
//                     <thead>
//                         <tr>
//                             <th>Institute Name</th>
//                             <th>Available Branches</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {responseData.institutes?.map((institute) => (
//                             <tr key={institute.id}>
//                                 <td>{institute.name}</td>
//                                 <td>
//                                     <ul>
//                                         {institute.branches?.map((branch) => (
//                                             <li key={branch.id}>{branch.name}</li>
//                                         ))}
//                                     </ul>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <button className="enhanced-results" onClick={handleEnhancedResults}>
//                 🔥 Get Enhanced Results - More Personalized 🔥
//             </button>

//             <div className="action-section">
//                 <button className="talk-button">Talk to IIT Students Now!</button>
//                 <button className="demo-button">Watch Demo Video</button>
//             </div>
//         </div>
//     );
// };

// export default ResultsPage;
