import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
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
const HomeLayout: React.FC<Props> = ({ children }) => {
    return (
        <main className="relative flex h-screen flex-col">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <section className="flex h-[calc(100vh-100px)] min-h-screen flex-1 flex-col overflow-auto  px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">{children}</div>
                </section>
            </div>
        </main>
    );
};
export default HomeLayout;
