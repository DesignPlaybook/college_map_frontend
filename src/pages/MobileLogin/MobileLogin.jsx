import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./MobileLogin.scss";
import CollegeIllustration from "../../assets/college-illustration.svg"; // Add a relevant SVG

const MobileLogin = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const otpRefs = useRef([]);
    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        if (isLoggedIn) navigate("/EnhancedQuestions");
    }, [isLoggedIn, navigate]);

    const handleMobileChange = (e) => {
        const input = e.target.value.replace(/\D/g, "").slice(0, 10);
        setMobileNumber(input);
        if (input.length === 10) setError("");
    };

    const sendOtp = async () => {
        const validIndianMobile = /^[6-9]\d{9}$/;

        if (!validIndianMobile.test(mobileNumber)) {
            setError("Please enter a valid Indian mobile number.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions/send_verification_code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile_number: mobileNumber }),
                credentials: "include",
            });

            if (response.ok) {
                setOtpSent(true);
                setError("");
            } else {
                setError("Failed to send OTP. Please try again.");
            }

            setTimeout(() => setLoading(false), 3000);
        } catch {
            setError("Network error. Please check your connection.");
            setLoading(false);
        }
    };


    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const verifyOtp = async () => {
        const enteredOtp = otp.map((digit) => digit.trim()).join("");

        if (enteredOtp.length !== 4 || /\D/.test(enteredOtp)) {
            setError("Please enter a valid 4-digit OTP.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile_number: mobileNumber, otp: enteredOtp }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("authToken", data.token);
                login(data.token);
                navigate("/EnhancedQuestions");
            } else {
                setError("Incorrect OTP. Please try again.");
                setOtp(["", "", "", ""]);
                otpRefs.current[0]?.focus();
            }
        } catch {
            setError("Network error. Please check your connection.");
        }
        setLoading(false);
    };

    return (
        <div className="mobile-login-container fade-in">
            <div className="illustration">
                <img src={CollegeIllustration} alt="College themed login" />
            </div>
            <div className="login-box">
                <h2>Welcome to College Map</h2>
                <p className="subtext">Log in to access your enhanced college list.</p>
                {error && <p className="error-message">{error}</p>}

                {!otpSent ? (
                    <>
                        <input
                            type="tel"
                            className="input-field"
                            placeholder="Enter your 10-digit mobile number"
                            value={mobileNumber}
                            onChange={handleMobileChange}
                        />
                        <button className="button send-otp" onClick={sendOtp} disabled={loading}>
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                ) : (
                    <>
                        <p>Enter the OTP sent to {mobileNumber}</p>
                        <div className="otp-container">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { if (el) otpRefs.current[index] = el; }}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                                            otpRefs.current[index - 1]?.focus();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <button className="button send-otp" onClick={verifyOtp} disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileLogin;


// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";  // Import useAuth to access login and logout methods
// import "./MobileLogin.scss";

// const MobileLogin = () => {
//     const [mobileNumber, setMobileNumber] = useState("");
//     const [otp, setOtp] = useState(["", "", "", ""]);
//     const [otpSent, setOtpSent] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const otpRefs = useRef([]);

//     const { isLoggedIn, login } = useAuth();  // Use useAuth to check login state and trigger login

//     useEffect(() => {
//         // If already logged in, navigate directly to EnhancedQuestions
//         if (isLoggedIn) {
//             navigate("/EnhancedQuestions");
//         }
//     }, [isLoggedIn, navigate]);

//     const handleMobileChange = (e) => {
//         const input = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only numbers and limit to 10 digits
//         setMobileNumber(input);
//     };

//     const sendOtp = async () => {
//         if (mobileNumber.length !== 10) {
//             setError("Please enter a valid 10-digit mobile number.");
//             return;
//         }

//         setLoading(true);
//         try {

//             // Uncomment when using real API
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions/send_verification_code`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ mobile_number: mobileNumber }),
//                 credentials: "include",
//             });

//             if (response.ok) {
//                 setOtpSent(true);
//                 setError("");
//             } else {
//                 setError("Failed to send OTP. Please try again.");
//             }

//             // ✅ Dummy OTP logic for testing
//             // setOtpSent(true); // Simulate OTP sent
//             // setError("");

//             // ✅ Disable OTP button for 3 seconds to prevent spam clicks
//             setTimeout(() => setLoading(false), 3000);
//         } catch {
//             setError("Network error. Please check your connection.");
//             setLoading(false);
//         }
//     };

//     const handleOtpChange = (index, value) => {
//         if (!/^\d*$/.test(value)) return;

//         const updatedOtp = [...otp];
//         updatedOtp[index] = value;
//         setOtp(updatedOtp);

//         if (value && index < otpRefs.current.length - 1) {
//             otpRefs.current[index + 1]?.focus();
//         }
//     };

//     const verifyOtp = async () => {
//         const enteredOtp = otp.map((digit) => digit.trim()).join("");

//         if (enteredOtp.length !== 4 || /\D/.test(enteredOtp)) {
//             setError("Please enter a valid 4-digit OTP.");
//             return;
//         }

//         setLoading(true);
//         try {

//             // Uncomment when using real API
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ mobile_number: mobileNumber, otp: enteredOtp }),
//                 credentials: "include",
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem("authToken", data.token); // ✅ Store token
//                 login(data.token); // Use login method from context
//                 navigate("/EnhancedQuestions");
//             } else {
//                 setError("Incorrect OTP. Please try again.");
//                 setOtp(["", "", "", ""]);
//                 otpRefs.current[0]?.focus();
//             }


//             // ✅ Dummy OTP logic for testing
//             // if (enteredOtp === "1234") {
//             //     const dummyToken = "dummy_token";
//             //     localStorage.setItem("authToken", dummyToken); // ✅ Simulate login
//             //     login(dummyToken); // Use login method from context
//             //     navigate("/EnhancedQuestions");
//             // } else {
//             //     setError("Incorrect OTP. Please enter '1234' for testing.");
//             //     setOtp(["", "", "", ""]);
//             //     otpRefs.current[0]?.focus();
//             // }
//         } catch {
//             setError("Network error. Please check your connection.");
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="mobile-login-container">
//             <div className="login-box">
//                 <h2>Login to Continue</h2>
//                 {error && <p className="error-message">{error}</p>}

//                 {!otpSent ? (
//                     <>
//                         <input
//                             type="tel"
//                             className="input-field"
//                             placeholder="Enter Mobile Number"
//                             value={mobileNumber}
//                             onChange={handleMobileChange}
//                             maxLength="10"
//                         />
//                         <button className="button send-otp" onClick={sendOtp} disabled={loading}>
//                             {loading ? "Sending..." : "Send OTP"}
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         <p>Enter the OTP sent to {mobileNumber}</p>
//                         <div className="otp-container">
//                             {otp.map((digit, index) => (
//                                 <input
//                                     key={index}
//                                     ref={(el) => { if (el) otpRefs.current[index] = el; }} // Ensure ref is not null
//                                     type="text"
//                                     maxLength="1"
//                                     value={digit}
//                                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                                     onKeyDown={(e) => {
//                                         if (e.key === "Backspace" && !otp[index] && index > 0) {
//                                             otpRefs.current[index - 1]?.focus();
//                                         }
//                                     }}
//                                 />
//                             ))}
//                         </div>
//                         <button className="button send-otp" onClick={verifyOtp} disabled={loading}>
//                             {loading ? "Verifying..." : "Verify OTP"}
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MobileLogin;
