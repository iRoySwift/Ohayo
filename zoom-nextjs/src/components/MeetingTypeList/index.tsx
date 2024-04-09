"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

interface Props {}
const MeetingTypeList: React.FC<Props> = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
        | "isScheduleMeeting"
        | "isJoiningMeeting"
        | "isInstantMeeting"
        | undefined
    >();
    const createMeeting = () => {};
    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <HomeCard
                img={"/icons/add-meeting.svg"}
                title="New Meeting"
                description="Step a new recording"
                className="bg-orange-1"
                handleClick={() => setMeetingState("isInstantMeeting")}
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                className="bg-blue-1"
                handleClick={() => setMeetingState("isJoiningMeeting")}
            />
            <HomeCard
                img={"/icons/schedule.svg"}
                title="Schedule Meeting"
                description="Plan your meeting"
                className="bg-purple-1"
                handleClick={() => setMeetingState("isScheduleMeeting")}
            />
            <HomeCard
                img={"/icons/recordings.svg"}
                title="View Recordings"
                description="Meeting recordings"
                className="bg-yellow-1"
                handleClick={() => router.push("/recordings")}
            />
            <MeetingModal
                isOpen={meetingState == "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start a Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
};
export default MeetingTypeList;
