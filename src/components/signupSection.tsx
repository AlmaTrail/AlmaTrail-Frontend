"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DialogClose } from "./ui/dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const SignupSection = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            setEmailError(false);
        }
    };

    const handleEmailBlur = () => {
        if (!validateEmail(email)) {
            setEmailError(true);
        }
    };

    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handlePasswordBlur = () => {
        if (confirmPassword) {
            validatePasswords();
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (passwordError) {
            setPasswordError(false);
        }
    };

    const handleConfirmPasswordBlur = () => {
        validatePasswords();
    };

    const isButtonDisabled = !email || !password || !confirmPassword || password !== confirmPassword || !validateEmail(email);

    const handleSignup = async () => {
        setIsLoading(true);
        setApiError("");
        try {
            const endpoint = process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT || "http://localhost:8080/auth/signup";
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = "Signup failed";
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    errorMessage = text || errorMessage;
                }
                setApiError(errorMessage);
                return;
            }

            const data = await response.json();
            console.log("Signup successful:", data);
            
            alert("Signup successful! Please log in.");
            if (onSwitchToLogin) {
                onSwitchToLogin();
            }

        } catch (error) {
            console.error("Error during signup:", error);
            setApiError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <DialogClose asChild>
                <button className="absolute top-4 right-4">
                    <Cross2Icon />
                </button>
            </DialogClose>
            <Card className="bg-white b-0">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-[#1d0828]">Create an account</CardTitle>
                    <CardDescription className="text-[#1d0828]">
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className={emailError ? "text-red-500" : "text-[#1d0828]"}>
                            Email
                        </Label>
                        <Input 
                            className={`custom-input bg-white ${emailError ? "border-red-500 text-red-500" : "text-[#1d0828]"}`}
                            id="email" 
                            type="email" 
                            placeholder="john@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                        {emailError && <p className="text-red-500 text-xs">Please enter a valid email address.</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[#1d0828]">
                            Password
                        </Label>
                        <Input 
                            className="custom-input text-[#1d0828] bg-white" 
                            id="password" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handlePasswordBlur}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password" className={passwordError ? "text-red-500" : "text-[#1d0828]"}>
                            Confirm Password
                        </Label>
                        <Input 
                            className={`custom-input text-[#1d0828] bg-white ${passwordError ? "border-red-500" : ""}`}
                            id="confirm-password" 
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            onBlur={handleConfirmPasswordBlur}
                        />
                        {passwordError && <p className="text-red-500 text-xs">Passwords do not match.</p>}
                    </div>
                     <div className="text-sm text-gray-600 mt-2">
                        Already have an account?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-purple-950 hover:underline"
                        >
                            Log in
                        </button>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                    {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
                    <Button 
                        className="w-full bg-white text-purple-950 border border-purple-950 hover:bg-purple-950 hover:text-white"
                        disabled={isButtonDisabled || isLoading}
                        onClick={handleSignup}
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignupSection;
