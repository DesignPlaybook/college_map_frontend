import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate function
import "./MobileLogin.scss";

const MobileLogin = () => {
    const [mobile_number, setMobile] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        let countdown;
        if (otpSent && timer > 0) {
            countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(countdown);
    }, [otpSent, timer]);

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/, "");
        setMobile(value);
    };

    const handleOtpChange = (index, value) => {
        if (value.match(/\D/)) return;

        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== "" && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const sendOtp = async () => {
        if (mobile_number.length !== 10) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/sessions/send_verification_code.json`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ mobile_number }), credentials: "include"
                }
            );

            const data = await response.json();
            console.log("API Response:", data);

            if (response.ok) {
                setOtpSent(true);
                setTimer(30);
                setCanResend(false);
            } else {
                alert(data.message || "Failed to send OTP. Try again.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Network error. Please try again.");
        }
    };

    const verifyOtp = async () => {
        if (otp.some((digit) => digit === "")) {
            alert("Please enter all OTP digits.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/sessions`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobile_number, otp: otp.join("") }),
                }
            );

            const data = await response.json();
            console.log("API Response:", data);

            if (response.ok) {
                alert("OTP Verified! Proceeding to payment...");
                navigate("/enhanced-results"); // Navigate on success
            } else {
                alert(data.message || "OTP verification failed.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Network error. Please try again.");
        }
    };

    const resendOtp = async () => {
        setTimer(30);
        setCanResend(false);

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/sessions/send_verification_code`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobile_number }),
                }
            );

            const data = await response.json();
            console.log("API Response:", data);

            if (!response.ok) {
                alert(data.message || "Failed to resend OTP. Try again.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            alert("Network error. Please try again.");
        }
    };

    return (
        <div className="mobile-login-container">
            <div className="login-box">
                <h2>Login to Continue</h2>
                <p>Enter your mobile number to receive a login OTP.</p>

                {!otpSent ? (
                    <>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Enter Mobile Number"
                            value={mobile_number}
                            onChange={handleMobileChange}
                            maxLength="10"
                        />
                        <button className="button send-otp" onClick={sendOtp}>
                            Send OTP
                        </button>
                    </>
                ) : (
                    <>
                        <p>Enter the 6-digit OTP sent to {mobile_number}</p>
                        <div className="otp-container">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <button className="button send-otp" onClick={verifyOtp}>
                            Verify OTP
                        </button>
                        <p className="timer">
                            {canResend ? (
                                <button className="button resend-otp" onClick={resendOtp}>
                                    Resend OTP
                                </button>
                            ) : (
                                `Resend OTP in ${timer}s`
                            )}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileLogin;
