"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "@/components/loader";

interface FileUploadProps {
    fileType: string;
    file: any;
    setFile: (file: any) => void;
    dependencyFile?: any;
    dependencyMessage?: string;
    buttonColor?: string; // New prop for button color
}

export default function FileUpload({
    fileType,
    file,
    setFile,
    dependencyFile,
    dependencyMessage,
    buttonColor = "blue" // Default color is blue
}: FileUploadProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (dependencyFile === null && dependencyMessage) {
            toast.error(dependencyMessage);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setFile({ url: `/assets/${fileType.toLowerCase()}.pdf` });
            setLoading(false);
        }, 3000);
    };

    return (
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            {loading ? (
                <Loader />
            ) : (
                <button
                    className={
                        loading || dependencyFile === null
                            ? "text-gray-500 font-medium py-2 px-4 rounded border border-2 bg-gray-300 border-gray-300"
                            : file === null
                            ? `text-white font-medium py-2 px-4 rounded border border-2 bg-${buttonColor}-500 border-${buttonColor}-500`
                            : "text-white font-medium py-2 px-4 rounded border-transparent text-green-600"
                    }
                    onClick={handleClick}
                    disabled={loading || dependencyFile === null}>
                    {file === null && <span>Simulate {fileType} Upload</span>}
                    {file !== null && (
                        <span className="text-green-600 flex flex-row gap-1 items-center">
                            <FaCheck />
                            <span>{fileType} Uploaded</span>
                        </span>
                    )}
                </button>
            )}
        </div>
    );
}
