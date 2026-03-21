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

const SignupSection = () => {
    return (
        <div>
            <Card className="bg-white b-0">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-[#1d0828]">Create an account</CardTitle>
                    <CardDescription className="text-[#1d0828]">
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#1d0828]">
                            Email
                        </Label>
                        <Input 
                            className="custom-input text-[#1d0828] border border-gray-400 !border-black !bg-white p-2 focus:!outline-none focus:!border-black focus:!ring-1 focus:!ring-black rounded-md" 
                            id="email" 
                            type="email" 
                            placeholder="john@example.com" 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[#1d0828]">
                            Password
                        </Label>
                        <Input 
                            className="custom-input text-[#1d0828] border border-gray-400 !border-black !bg-white p-2 focus:!outline-none focus:!border-black focus:!ring-1 focus:!ring-black rounded-md" 
                            id="password" 
                            type="password" 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password" className="text-[#1d0828]">
                            Confirm Password
                        </Label>
                        <Input 
                            className="custom-input text-[#1d0828] border border-gray-400 !border-black !bg-white p-2 focus:!outline-none focus:!border-black focus:!ring-1 focus:!ring-black rounded-md" 
                            id="confirm-password" 
                            type="password" 
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-white text-purple-950 hover:bg-purple-950 hover:text-white">
                        Create account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignupSection;
