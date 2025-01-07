"use client";

import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useDashboard } from "@/context/dashboard-context";
import { useRouter } from "next/navigation";
import { createCase } from "@/lib/api";

export const revalidate = 0;

export default function DashboardRoot() {
    const router = useRouter();
    const { medicalRecord, guidelinesFile } = useDashboard();

    const handleContinue = async () => {
        // Make post request to create a case
        const newCase = await createCase();
        router.push(`/dashboard/case/${newCase.id}`);
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
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}
