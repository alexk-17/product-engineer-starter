"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import classNames from "classnames";
import { useDashboard } from "@/context/dashboard-context";
import Loader from "@/components/loader";

export default function GuidelinesUpload() {
    const { guidelinesFile, setGuidelinesFile, medicalRecord } = useDashboard();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (medicalRecord === null) {
            toast.error("Please upload a medical record first");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setGuidelinesFile({ url: "/assets/guidelines.pdf" });
            setLoading(false);
        }, 3000);
    };

    return (
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border border-2",
                    guidelinesFile === null
                        ? "bg-orange-500 border-orange-500"
                        : "border-transparent text-green-600"
                )}
                onClick={handleClick}
                disabled={loading}>
                {loading && <Loader />}
                {!loading && guidelinesFile === null && <span>Simulate Guidelines Upload</span>}
                {!loading && guidelinesFile !== null && (
                    <span className="text-green-600 flex flex-row gap-1 items-center">
                        <FaCheck />
                        <span>Guidelines File Uploaded</span>
                    </span>
                )}
            </button>
        </div>
    );
}
