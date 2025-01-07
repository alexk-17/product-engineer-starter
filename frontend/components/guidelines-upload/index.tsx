"use client";

import { useDashboard } from "@/context/dashboard-context";
import FileUpload from "@/components/file-upload";

export default function GuidelinesUpload() {
    const { guidelinesFile, setGuidelinesFile, medicalRecord } = useDashboard();

    return (
        <FileUpload
            fileType="Guidelines"
            file={guidelinesFile}
            setFile={setGuidelinesFile}
            dependencyFile={medicalRecord}
            dependencyMessage="Please upload a medical record first"
            buttonColor="orange"
        />
    );
}
