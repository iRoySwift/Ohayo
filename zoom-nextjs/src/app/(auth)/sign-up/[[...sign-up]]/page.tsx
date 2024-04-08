import React from "react";
import { SignUp } from "@clerk/nextjs";

interface Props {}
const SignUpPage: React.FC<Props> = () => {
    return (
        <main className="flex h-screen w-full items-center justify-center">
            <SignUp />
        </main>
    );
};
export default SignUpPage;
