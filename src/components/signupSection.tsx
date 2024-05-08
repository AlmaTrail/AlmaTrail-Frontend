"use client"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const SignupSection = () => {
    return (
        <div>
            <Card className="bg-[#1d0828] b-0">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-white">Create an account</CardTitle>
                    <CardDescription className="text-white">
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {/* <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            Github
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div> */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-white"> Confirm Password</Label>
                        <Input id="password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-white text-purple-950 hover:bg-purple-950 hover:text-white">Create account</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignupSection