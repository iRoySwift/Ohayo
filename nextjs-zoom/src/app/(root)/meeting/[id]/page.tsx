import React from "react";

interface Props {
    params: {
        id: string;
    }
}
const Meeting: React.FC<Props> = ({params}) => {
    return <div>Meeting Room: #{ params.id }</div>;
};
export default Meeting;
