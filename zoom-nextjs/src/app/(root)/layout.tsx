import StreamClientProvider from "@/providers/StreamClientProvider";
import React from "react";

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
