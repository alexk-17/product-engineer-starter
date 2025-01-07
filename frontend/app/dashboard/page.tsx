"use client";

import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useDashboard } from "@/context/dashboard-context";
import { useRouter } from "next/navigation";

export const revalidate = 0;

export async function createCase() {
    const response = await fetch("http://localhost:8000/cases", {
        method: "POST",
        body: JSON.stringify({})
    });
    return response.json();
}

export default function DashboardRoot() {
    const router = useRouter();
    const { medicalRecord, guidelinesFile } = useDashboard();
    let CASE_ID = null;

    const handleContinue = async () => {
        // Make post request to create a case
        CASE_ID = await createCase();
        router.push(`/dashboard/case/${CASE_ID}`);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <div className="w-full flex flex-row gap-2 items-center">
                <MedicalRecordUpload />
                <GuidelinesUpload />
            </div>
            <div className="w-full py-4 flex flex-row justify-center">
                {medicalRecord && guidelinesFile && (
                    <button
                        className="bg-green-600 font-medium text-white py-2 px-4 rounded"
                        onClick={handleContinue}>
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}
