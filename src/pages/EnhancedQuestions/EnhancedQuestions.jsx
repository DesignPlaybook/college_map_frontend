import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from '../../api';
import "./EnhancedQuestions.scss";
import * as XLSX from 'xlsx';

const EnhancedQuestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedYesAnswers, setSelectedYesAnswers] = useState([]);
    const [comparisons, setComparisons] = useState([]);
    const [institutes, setInstitutes] = useState([]); // To hold institutes data
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isDownloadReady, setIsDownloadReady] = useState(false);
    const [courseDuration, setCourseDuration] = useState(""); // '4' or '5'

    // conistency states
    const [showConsistencyPopup, setShowConsistencyPopup] = useState(false);
    const [consistencyConfirmed, setConsistencyConfirmed] = useState(false);

    // New: Store enhanced result data
    const [enhancedResultData, setEnhancedResultData] = useState(null);

    const importanceLevels = [
        { label: "Extremely more", value: 9 },
        { label: "Very strongly more", value: 7 },
        { label: "Strongly more", value: 5 },
        { label: "Moderately more", value: 3 },
        { label: "Equally", value: 1 },
        { label: "Moderately less", value: 1 / 3 },
        { label: "Strongly less", value: 1 / 5 },
        { label: "Very strongly less", value: 1 / 7 },
        { label: "Extremely less", value: 1 / 9 },
    ];

    // actual useffect
    useEffect(() => {
        let receivedPreferences = location.state?.preferences;

        if (!receivedPreferences || receivedPreferences.length === 0) {
            console.warn("No preferences received from navigation. Falling back to local storage.");
            const storedPreferences = JSON.parse(localStorage.getItem("preferences") || "{}");
            receivedPreferences = Object.keys(storedPreferences).filter(key => storedPreferences[key] === true);
        }

        if (!receivedPreferences || receivedPreferences.length === 0) {
            console.warn("No preferences found. Redirecting to results page.");
            navigate("/ResultsPage");
            return;
        }

        setSelectedYesAnswers(receivedPreferences);

        if (receivedPreferences.length > 1) {
            const generatedComparisons = [];
            for (let i = 0; i < receivedPreferences.length - 1; i++) {
                for (let j = i + 1; j < receivedPreferences.length; j++) {
                    generatedComparisons.push({
                        preference1: receivedPreferences[i],
                        preference2: receivedPreferences[j],
                        comparison: "",
                    });
                }
            }
            setComparisons(generatedComparisons);
        }

        // 🔽 New: Try getting institutes from localStorage
        const storedInstitutes = JSON.parse(localStorage.getItem("institutes"));

        if (Array.isArray(storedInstitutes) && storedInstitutes.length > 0) {
            const institutesWithSelection = storedInstitutes.map(inst => ({
                ...inst,
                selected: false
            }));
            setInstitutes(institutesWithSelection);
        } else {
            console.warn("No institutes in localStorage. Using dummy data for now.");

            // 🔽 Dummy data fallback for testing
            // const dummyInstitutes = [
            //     { ... }
            // ];
            // setInstitutes(dummyInstitutes);

            // 🔽 Uncomment this when you want to use the actual API instead
            /*
            api.get('/api/v1/institutes/check_eligibility')
                .then(response => {
                    console.log("API response:", response.data);
                    if (Array.isArray(response.data)) {
                        const institutesWithSelection = response.data.map(inst => ({
                            ...inst,
                            selected: false
                        }));
                        setInstitutes(institutesWithSelection);
                    } else {
                        console.error("Expected an array, but got:", response.data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching institutes:", error);
                });
            */
        }

    }, [location, navigate]);

    const handleComparisonChange = (index, value) => {
        const updatedComparisons = [...comparisons];
        updatedComparisons[index].comparison = value;
        setComparisons(updatedComparisons);
    };

    const handleSubmit = async () => {
        // Step 1: Basic validation (existing code)
        if (comparisons.some(comp => comp.comparison === "")) {
            alert("Please fill out all comparisons before submitting.");
            return;
        }
        if (!courseDuration) {
            alert("Please select course duration before submitting.");
            return;
        }

        console.log("Sending Data:", comparisons);

        const requestData = comparisons.map(comparison => {
            const comparisonKey = `${comparison.preference1}_${comparison.preference2}`;
            const comparisonValue = importanceLevels.find(level => level.label === comparison.comparison)?.value;

            return {
                comparisonKey,
                comparisonValue,
            };
        });

        // Safe parse from localStorage
        function safeParse(key) {
            const raw = localStorage.getItem(key);
            try {
                return JSON.parse(raw);
            } catch {
                return raw;
            }
        }

        const rank = safeParse("rank");
        const category = safeParse("category");
        const gender = safeParse("gender");

        const instituteIds = institutes
            .filter(inst => inst.selected)
            .map(inst => inst.institute_id);

        const finalData = {
            comparisons: requestData,
            rank,
            category,
            gender,
            preferred_institute_ids: instituteIds,
            course_duration: courseDuration
        };


        // Step 2: Submit the data first (without checking consistency yet)
        try {
            const firstResponse = await api.post('/api/v1/institutes/enhanced_result', finalData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            console.log("First Submission Success:", firstResponse.data);

            // 🔥 Save enhanced result data for later download
            setEnhancedResultData(firstResponse.data);

            // Step 3: After submission, call the consistency check API
            const consistencyResponse = await api.post('/api/v1/institutes/check_consistancy', { comparisons: requestData });

            const consistency = consistencyResponse?.data?.consistency_score; // Updated response key

            if (consistency != null) {
                // Step 4: Show the consistency popup (Confirm if they want to continue)
                const userConfirmed = window.confirm(`Your consistency is ${consistency}%. Do you want to continue?`);

                if (userConfirmed) {
                    // Step 5: If Yes, do NOT re-submit again, just allow download
                    setIsDownloadReady(true); // Make download button visible
                } else {
                    // Step 6: If No, close the popup and do not show download button
                    console.log("User declined to continue.");
                    setIsDownloadReady(false);
                }
            } else {
                console.error("Consistency score is missing or incorrect.");
                setIsDownloadReady(false);
            }
        } catch (error) {
            console.error("Error in submission or consistency check:", error);
            alert("Something went wrong! Please try again.");
        }
    };

    const handleDownloadPDF = async () => {
        try {
            if (enhancedResultData && Array.isArray(enhancedResultData.institutes)) {
                const worksheetData = enhancedResultData.institutes.map(inst => ({
                    Institute: inst.name,
                    Department: inst.department_name
                }));

                const worksheet = XLSX.utils.json_to_sheet(worksheetData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Institutes");

                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

                const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'enhanced_result.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                console.error("No enhanced result data available or invalid format.");
            }
        } catch (error) {
            console.error("Error downloading Excel file:", error);
            alert("Failed to download Excel. Something's fishy. 🐟");
        }
    };


    return (
        <div className="enhanced-container">
            <div className="enhanced-questions-table">
                <h1 className="title">Enhanced Comparison</h1>

                {selectedYesAnswers.length === 0 ? (
                    <p>No preferences were selected in the previous step.</p>
                ) : comparisons.length > 0 ? (
                    <table className="comparison-table">
                        <tbody>
                            {comparisons.map((comparison, index) => (
                                <tr key={index}>
                                    <td className="comparison-text">{comparison.preference1}</td>
                                    <td>
                                        <select
                                            className="comparison-dropdown"
                                            value={comparison.comparison}
                                            onChange={(e) => handleComparisonChange(index, e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            {importanceLevels.map((level, i) => (
                                                <option key={i} value={level.label}>
                                                    {level.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="comparison-text">{comparison.preference2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Not enough preferences selected to generate comparisons.</p>
                )}

                <div className="institutes-selection">
                    <h2 className="title">Select Institutes</h2>

                    <div className="dropdown-wrapper">
                        <div className="dropdown-display" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className="dropdown_text">{(() => {
                                const selected = institutes.filter(i => i.selected).map(i => i.institute_name);
                                return selected.length === 0
                                    ? "Select Institutes"
                                    : selected.slice(0, 2).join(", ") + (selected.length > 2 ? ", ..." : "");
                            })()}</div>
                            <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
                        </div>

                        {dropdownOpen && (
                            <div className="dropdown-list">
                                {institutes.map(inst => (
                                    <label key={inst.institute_id ?? `unknown-${inst.institute_name}`} className="dropdown-option">
                                        <input
                                            type="checkbox"
                                            checked={inst.selected}
                                            disabled={inst.institute_id == null}
                                            onChange={() => {
                                                setInstitutes(prev =>
                                                    prev.map(item =>
                                                        item.institute_id === inst.institute_id
                                                            ? { ...item, selected: !item.selected }
                                                            : item
                                                    )
                                                );
                                            }}
                                        />
                                        {inst.institute_name}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="duration-selection">
                    <h2 className="title">Select Course Duration</h2>
                    <select
                        className="duration-dropdown"
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(e.target.value)}
                    >
                        <option value="">Select duration</option>
                        <option value="4">4-Year Course</option>
                        <option value="5">5-Year Course</option>
                    </select>
                </div>

                {comparisons.length > 0 && (
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit for Enhanced Results
                    </button>
                )}
                {isDownloadReady && (
                    <button onClick={handleDownloadPDF}>
                        Download Result
                    </button>
                )}
            </div>
        </div>
    );
};

export default EnhancedQuestions;
