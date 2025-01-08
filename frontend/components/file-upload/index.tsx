"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import classNames from "classnames";
import toast from "react-hot-toast";
import Loader from "@/components/loader";

interface FileUploadProps {
    fileType: string;
    file: any;
    setFile: (file: any) => void;
    dependencyFile?: any;
    dependencyMessage?: string;
    buttonColor?: "blue" | "green" | "red" | "orange";
}

export default function FileUpload({
    fileType,
    file,
    setFile,
    dependencyFile,
    dependencyMessage,
    buttonColor = "blue"
}: FileUploadProps) {
    const [loading, setLoading] = useState(false);

    const buttonClass =
        buttonColor === "blue"
            ? "text-white bg-blue-500 border-blue-500"
            : buttonColor === "green"
            ? "text-white bg-green-500 border-green-500"
            : buttonColor === "red"
            ? "text-white bg-red-500 border-red-500"
            : "text-white bg-orange-500 border-orange-500";

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
                    className={classNames(
                        "font-medium py-2 px-4 rounded border-2",
                        loading || dependencyFile === null
                            ? "text-gray-500 bg-gray-300 border-gray-300"
                            : file === null
                            ? buttonClass
                            : "text-white text-green-600 border-transparent"
                    )}
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
