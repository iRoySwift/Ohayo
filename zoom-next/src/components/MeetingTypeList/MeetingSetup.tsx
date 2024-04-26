"use client";
import {
    DeviceSettings,
    VideoPreview,
    useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Props {
    setIsSetupComplete: (value: boolean) => void;
}
const MeetingSetup: React.FC<Props> = props => {
    const { setIsSetupComplete } = props;
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(true);

    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within StreamCall component");
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggledOn, call?.microphone, call]);

    return (
        <div className="flex-center h-screen w-full flex-col gap-3 text-white">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={e => setIsMicCamToggledOn(e.target.checked)}
                    />
                    Join with mic and camara off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}>
                Join Meeting
            </Button>
        </div>
    );
};
export default MeetingSetup;
