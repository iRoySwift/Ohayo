"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingTypeList/MeetingRoom";
import MeetingSetup from "@/components/MeetingTypeList/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

interface Props {
    params: {
        id: string;
    };
}
const Meeting: React.FC<Props> = ({ params: { id } }) => {
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id);
    if (!isLoaded || isCallLoading) return <Loader />;

    return (
        <section className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </section>
    );
};
export default Meeting;
