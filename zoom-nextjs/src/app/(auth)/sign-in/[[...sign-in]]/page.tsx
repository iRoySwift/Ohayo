import React from "react";
import { SignIn } from "@clerk/nextjs";

interface Props {}
const SignInPage: React.FC<Props> = () => {
    return (
        <main className="flex h-screen w-full items-center justify-center">
            <SignIn />
        </main>
    );
};
export default SignInPage;
