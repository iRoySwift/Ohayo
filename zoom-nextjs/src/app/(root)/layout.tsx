import StreamClientProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Zoom",
    description: "Video calling app",
    icons: {
        icon: "/icons/logo.svg",
    },
};

interface Props {
    children: React.ReactNode;
}
const RootLayout: React.FC<Props> = ({ children }) => {
    return (
        <main>
            <StreamClientProvider>{children}</StreamClientProvider>
        </main>
    );
};
export default RootLayout;
