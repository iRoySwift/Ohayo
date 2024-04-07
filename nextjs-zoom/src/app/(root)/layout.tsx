import React from "react";

interface Props {
    children: React.ReactNode
}
const RootLayout: React.FC<Props> = ({children}) => {
    return <main>
        {children}
    </main>;
};
export default RootLayout;
