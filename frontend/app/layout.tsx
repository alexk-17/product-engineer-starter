import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

interface IRootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en">
            <head></head>
            <body>
                <Toaster position="bottom-right" />
                {children}
                <div id="modal" />
            </body>
        </html>
    );
}
