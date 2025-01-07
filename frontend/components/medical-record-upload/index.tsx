"use client";

import { useDashboard } from "@/context/dashboard-context";
import FileUpload from "@/components/file-upload";

export default function MedicalRecordUpload() {
    const { medicalRecord, setMedicalRecord } = useDashboard();

    return <FileUpload fileType="Medical Record" file={medicalRecord} setFile={setMedicalRecord} />;
}
