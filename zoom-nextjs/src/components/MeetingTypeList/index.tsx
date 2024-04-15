"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { Input } from "../ui/input";

interface Props {}
const MeetingTypeList: React.FC<Props> = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
        | "isScheduleMeeting"
        | "isJoiningMeeting"
        | "isInstantMeeting"
        | undefined
    >();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();

    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) {
                toast({ title: "Please select a date and time" });
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call("default", id);
            if (!call) throw new Error("Fail to create call");

            const startsAt =
                values.dateTime.toISOString() || new Date().toISOString();
            const description = values.description || "Instant Meeting";
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });
            setCallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast({ title: "Meeting Created" });
        } catch (error) {
            console.log(error);
            toast({ title: "Failed to create meeting" });
        }
    };
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState == "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-normal text-base leading-[22px] text-sky-2">
                            Add a description
                        </label>
                        <Textarea
                            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={e =>
                                setValues({
                                    ...values,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-normal text-base leading-[22px] text-sky-2">
                            Select data and time
                        </label>
                        <ReactDatePicker
                            className="w-full border-none bg-dark-3 p-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            selected={values.dateTime}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat={"MMMM d, yyyy h:mm aa"}
                            onChange={date =>
                                setValues({ ...values, dateTime: date! })
                            }
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState == "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    image={"/icons/checked.svg"}
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Meeting Link"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: "Link copied!" });
                    }}
                />
            )}
            <MeetingModal
                isOpen={meetingState == "isJoiningMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}>
                <Input
                    placeholder="Meeting Link "
                    className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={e =>
                        setValues({ ...values, link: e.target.value })
                    }
                />
            </MeetingModal>
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
