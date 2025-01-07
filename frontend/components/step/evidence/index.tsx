"use client";

import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { IEvidence } from "@/lib/api";

export default function Evidence({ evidence }: { evidence: IEvidence[] }) {
    const [showEvidence, setShowEvidence] = useState(false);

    return (
        <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-2 mt-2 mb-4 bg-zinc-50">
            <div className="flex flex-row items-center gap-2">
                <FaLightbulb className="text-blue-500" />
                <div className="flex flex-col items-start">
                    <p className="text-sm font-bold">
                        This decision was made based on citations from the medical record
                    </p>
                    <button
                        className="text-sm hover:underline"
                        onClick={() => setShowEvidence(!showEvidence)}
                    >
                        {showEvidence ? "Hide Evidence" : "Show Evidence"}
                    </button>
                </div>
            </div>
            {showEvidence && (
                <div className="flex flex-col gap-2">
                    {evidence.map((evidence, index) => (
                        <div
                            key={evidence.content}
                            className={index % 2 === 0 ? "bg-zinc-100 p-2" : "bg-white p-2"}
                        >
                            <div className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-1">
                                    {evidence.page_number && (
                                        <span className="text-xs bg-zinc-200 text-zinc-800 font-medium px-4 py-1 rounded-full">
                                            Page {evidence.page_number}
                                        </span>
                                    )}
                                </div>
                                <p className="col-span-11 text-sm">{evidence.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
