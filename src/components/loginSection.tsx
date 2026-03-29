"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DialogClose } from "./ui/dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const LoginSection = ({ onSwitchToSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);

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
        if (email && !validateEmail(email)) {
            setEmailError(true);
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
                    <CardTitle className="text-2xl text-[#1d0828]">Log In</CardTitle>
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
                        />
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        New to AlmaTrail?{" "}
                        <button
                            onClick={onSwitchToSignup}
                            className="text-purple-950 hover:underline"
                        >
                            Sign up
                        </button>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button 
                        className="w-full bg-white text-purple-950 border border-purple-950 hover:bg-purple-950 hover:text-white"
                        disabled={!email || !password || emailError}
                    >
                        Log In
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginSection;
