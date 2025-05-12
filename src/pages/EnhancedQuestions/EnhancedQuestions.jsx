import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useLocation, useNavigate } from "react-router-dom";
import api from '../../api';
import "./EnhancedQuestions.scss";
import * as XLSX from 'xlsx';

const EnhancedQuestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedYesAnswers, setSelectedYesAnswers] = useState([]);
    const [comparisons, setComparisons] = useState([]);
    const [institutes, setInstitutes] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false); // For institutes dropdown
    const [isDownloadReady, setIsDownloadReady] = useState(false);
    const [courseDuration, setCourseDuration] = useState([]);
    const [consistencyScore, setConsistencyScore] = useState(null);
    const [courseDropdownOpen, setCourseDropdownOpen] = useState(false); // For course duration dropdown
    const [showConsistencyPopup, setShowConsistencyPopup] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false); // Track download status
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track form submission

    // Refs for dropdowns to detect outside clicks
    const institutesDropdownRef = useRef(null);
    const courseDropdownRef = useRef(null);

    // --- START: Mobile View Detection ---
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // --- END: Mobile View Detection ---

    useEffect(() => {
        // DEBUG ONLY: Force popup open
        // setShowConsistencyPopup(true);

        // Check if the form has been submitted for the current user
        const submitted = localStorage.getItem('enhancedFormSubmitted');
        if (submitted === 'true') {
            setIsFormSubmitted(true);
        }
    }, []);

    const preferenceDisplayNames = {
        placement_score: "Placement Score",
        higher_studies_score: "Higher Studies",
        academics_experience_score: "Academic Experience",
        campus_score: "Campus Score",
        entrepreneurship_score: "Entrepreneurship Culture"
    };

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

    useEffect(() => {
        let receivedPreferences = location.state?.preferences;

        if (!receivedPreferences || receivedPreferences.length === 0) {
            console.warn("No preferences received from navigation. Falling back to local storage.");
            const storedPreferences = JSON.parse(localStorage.getItem("preferences") || "{}");
            receivedPreferences = Object.keys(storedPreferences).filter(key => storedPreferences[key] === true);
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

        const storedInstitutes = JSON.parse(localStorage.getItem("institutes"));

        if (Array.isArray(storedInstitutes) && storedInstitutes.length > 0) {
            const institutesWithSelection = storedInstitutes.map(inst => ({
                ...inst,
                selected: true // Default to selected
            }));
            setInstitutes([{ institute_name: 'Select All', institute_id: 'all' }, ...institutesWithSelection]);
        } else {
            console.warn("No institutes in localStorage.");
            // Fallback or API call as per your logic
            setInstitutes([{ institute_name: 'Select All', institute_id: 'all' }]); // Initialize with Select All
        }

        // Initialize course duration with all options selected
        setCourseDuration(['4', '5']);

    }, [location, navigate]);

    // Effect to handle clicks outside of dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (institutesDropdownRef.current && !institutesDropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target)) {
                setCourseDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Empty dependency array ensures this runs only once on mount and cleans up on unmount

    const handleComparisonChange = (index, value) => {
        const updatedComparisons = [...comparisons];
        updatedComparisons[index].comparison = value;
        setComparisons(updatedComparisons);
    };

    const handleInstituteSelect = (instituteId) => {
        setInstitutes(prevInstitutes => {
            if (instituteId === 'all') {
                const allSelected = prevInstitutes.slice(1).every(inst => inst.selected);
                return prevInstitutes.map(inst => ({ ...inst, selected: !allSelected }));
            } else {
                return prevInstitutes.map(inst =>
                    inst.institute_id === instituteId ? { ...inst, selected: !inst.selected } : inst
                );
            }
        });
    };

    const handleCourseDurationSelect = (duration) => {
        setCourseDuration(prev => {
            if (prev.includes(duration)) {
                return prev.filter(val => val !== duration);
            } else {
                return [...prev, duration];
            }
        });
    };

    const handleSubmit = async () => {
        if (comparisons.some(comp => comp.comparison === "")) {
            alert("Please fill out all comparisons before submitting.");
            return;
        }
        if (courseDuration.length === 0) {
            alert("Please select course duration before submitting.");
            return;
        }
        if (institutes.filter(inst => inst.selected && inst.institute_id !== 'all').length === 0) {
            alert("Please select at least one institute.");
            return;
        }

        const requestData = comparisons.map(comparison => {
            const comparisonKey = `<span class="math-inline">\{comparison\.preference1\}\-</span>{comparison.preference2}`;
            const comparisonValue = importanceLevels.find(level => level.label === comparison.comparison)?.value;

            return { comparisonKey, comparisonValue };
        });

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

        const instituteIds = institutes.filter(inst => inst.selected && inst.institute_id !== 'all').map(inst => inst.institute_id);

        const finalData = {
            comparisons: requestData,
            rank,
            category,
            gender,
            preferred_institute_ids: instituteIds,
            course_duration: courseDuration,
        };

        try {
            const consistencyResponse = await api.post('/api/v1/institutes/check_consistancy', { comparisons: requestData });
            const consistency = consistencyResponse?.data?.consistency_score;
            // Check if the response data exists and is a valid object
            if (consistencyResponse && consistencyResponse.data && typeof consistencyResponse.data === 'object') {
                const consistency = consistencyResponse.data.consistency_score;
                console.log(consistency);
                if (consistency != null) {
                    setConsistencyScore(consistency);
                    setShowConsistencyPopup(true);
                    setEnhancedResultData(finalData);
                } else {
                    console.error("Consistency score is missing in the JSON response.");
                    alert("Error: Consistency score is missing from the server response.");
                }
            } else {
                console.error("Invalid JSON response received:", consistencyResponse?.data);
                alert("Error: Received an invalid response from the server.");
            }

        } catch (error) {
            console.error("Error during consistency check:", error);
            if (error.response && error.response.data) {
                console.error("Response data:", error.response.data);
                // Optionally, try to parse the error response if it might contain some JSON
                if (typeof error.response.data === 'string' && error.response.headers['content-type']?.includes('application/json')) {
                    try {
                        const errorDetails = JSON.parse(error.response.data);
                        alert(`Something went wrong: ${errorDetails.message || 'Please try again.'}`);
                    } catch (parseError) {
                        alert("Something went wrong! Please try again.");
                    }
                } else {
                    alert("Something went wrong! Please try again.");
                }
            } else {
                alert("Network error occurred. Please check your connection.");
            }
        }
    };


    const handleDownloadPDF = async () => {
        try {
            if (enhancedResultData && Array.isArray(enhancedResultData.institutes)) {
                const worksheetData = enhancedResultData.institutes.map(inst => ({
                    Institute: inst.name,
                    Department: inst.department_name
                    // Add other relevant fields from enhancedResultData.institutes
                }));

                const worksheet = XLSX.utils.json_to_sheet(worksheetData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Institutes");

                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Advanced_result.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();

                setIsDownloaded(true);  // Mark as downloaded after successful download
                localStorage.setItem('enhancedFormSubmitted', 'true'); // Store submission status
            } else {
                console.error("No Advanced result data available or invalid format.");
                alert("No data to download or data is not in the expected format.");
            }
        } catch (error) {
            console.error("Error downloading Excel file:", error);
            alert("Failed to download Excel. Something's fishy. 🐟");
        }
    };

    return (
        <>
            {showConsistencyPopup && (
                <div className="confirmation-popup">
                    <div className="popup-content">
                        <h2>Consistency Check</h2>
                        <p>Your consistency score is <strong>{consistencyScore}/100</strong>.</p>
                        <p>Are you sure you want to continue? You won’t be able to modify responses later.</p>
                        <div className="popup-buttons">
                            <button className="confirm" onClick={async () => {
                                try {
                                    const resultResponse = await api.post('/api/v1/institutes/enhanced_result', enhancedResultData, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json',
                                        }
                                    });

                                    setEnhancedResultData(resultResponse.data); // Store result
                                    setIsDownloadReady(true);
                                    setIsFormSubmitted(true);
                                    setShowConsistencyPopup(false);
                                    localStorage.setItem('enhancedFormSubmitted', 'true'); // Store submission status
                                } catch (error) {
                                    console.error("Error fetching enhanced result:", error);
                                    alert("Failed to generate result. Please try again.");
                                }
                            }}>Yes, Continue</button>
                            <button className="cancel" onClick={() => {
                                setShowConsistencyPopup(false);
                                setIsDownloadReady(false);
                            }}>No, Go Back</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="enhanced-container">
                <div className="enhanced-questions-table">
                    {selectedYesAnswers.length === 0 ? (
                        <p>No preferences were selected in the previous step.</p>
                    ) : comparisons.length > 0 ? (
                        <>
                            <h1 className="title">Select what is important to you:</h1>
                            <table className="comparison-table">
                                <tbody className="compare-table-body">
                                    {comparisons.map((comparison, index) => (
                                        <tr key={index} className="table-row-compare">
                                            <td className="comparison-text">
                                                {preferenceDisplayNames[comparison.preference1] || comparison.preference1}
                                            </td>
                                            <td><div className="drop-compare">
                                                <span>are</span>
                                                <td>
                                                    <select
                                                        disabled={isFormSubmitted}
                                                        className="comparison-dropdown"
                                                        value={comparison.comparison}
                                                        onChange={(e) => handleComparisonChange(index, e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        {importanceLevels.map((level, i) => (
                                                            <option key={i} value={level.label}>
                                                                {level.label} important
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <span>than</span>
                                            </div></td>
                                            <td className="comparison-text">
                                                {preferenceDisplayNames[comparison.preference2] || comparison.preference2}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>

                    ) : (
                        <p>Not enough preferences selected to generate comparisons. But you can select your preferend institutes and course duration.</p>
                    )}

                    <div className="institutes-selection">
                        <h2 className="title">Select Institutes</h2>
                        {/* Assign ref to institutes dropdown wrapper */}
                        <div className="dropdown-wrapper" ref={institutesDropdownRef}>
                            <div className="dropdown-display" onClick={() => {
                                setDropdownOpen(prev => !prev);
                                setCourseDropdownOpen(false); // Optionally close other dropdown
                            }}>
                                <div className="dropdown_text">{(() => {
                                    const selected = institutes.filter(i => i.selected && i.institute_id !== 'all').map(i => i.institute_name);
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
                                                disabled={isFormSubmitted}
                                                type="checkbox"
                                                checked={inst.selected}
                                                disabled={inst.institute_id == null}
                                                onChange={() => handleInstituteSelect(inst.institute_id)}
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
                        {/* Assign ref to course duration dropdown wrapper */}
                        <div className="dropdown-wrapper" ref={courseDropdownRef}>
                            <div className="dropdown-display" onClick={() => {
                                setCourseDropdownOpen(prev => !prev);
                                setDropdownOpen(false); // Close the institutes dropdown
                            }}
                            >
                                <div className="dropdown_text">
                                    {courseDuration.length === 0
                                        ? "Select Course Duration"
                                        : courseDuration.map(val => `${val}-Year Course`).join(", ") // Improved display
                                    }
                                </div>
                                {/* FIX 2: Use courseDropdownOpen for the arrow state */}
                                <span className="arrow">{courseDropdownOpen ? "▲" : "▼"}</span>
                            </div>

                            {/* FIX 1: Use courseDropdownOpen to control visibility */}
                            {courseDropdownOpen && (
                                <div className="dropdown-list">
                                    {[{ label: "4-Year Course", value: "4" }, { label: "5-Year Course", value: "5" }].map((item) => (
                                        <label key={item.value} className="dropdown-option">
                                            <input
                                                disabled={isFormSubmitted}
                                                type="checkbox"
                                                checked={courseDuration.includes(item.value)}
                                                onChange={() => handleCourseDurationSelect(item.value)}
                                            />
                                            {item.label}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {!isFormSubmitted && selectedYesAnswers.length > 0 && (
                        <button className="submit-button" onClick={handleSubmit} disabled={isFormSubmitted}>
                            Submit for Advanced Results
                        </button>
                    )}

                    {isFormSubmitted && isDownloadReady && !isDownloaded && (
                        <button className="download-button" onClick={handleDownloadPDF}>
                            Download Result
                        </button>
                    )}

                    {isDownloaded && (
                        <p className="download-message">
                            The form has been submitted and the result has been downloaded. You cannot fill this form again.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default EnhancedQuestions;