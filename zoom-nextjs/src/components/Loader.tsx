import Image from "next/image";
import React from "react";

interface Props {}
const Loader: React.FC<Props> = () => {
    return (
        <div className="flex-center h-screen w-full">
            <Image
                src="/icons/loading-circle.svg"
                alt="Loading"
                width={50}
                height={50}
            />
        </div>
    );
};
export default Loader;
