"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tab } from "@headlessui/react";

import Loader from "@/components/loader";
import List from "@/components/list";
import Step from "@/components/step";
import { getCase, ICase } from "@/lib/api";
import { elapsedTime } from "@/lib/utils";

export default function CaseResult() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean | null>(null);
    const { case_id } = useParams();
    const [currCase, setCurrCase] = useState<ICase | null>(null);
    const [caseNotFound, setCaseNotFound] = useState<boolean | null>(null);
    useEffect(() => {
        setLoading(true);
        getCase(Array.isArray(case_id) ? case_id[0] : case_id)
            .then((fetchedCase) => {
                setCurrCase(fetchedCase);
                console.log(fetchedCase);
                setCaseNotFound(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch case");
                setCaseNotFound(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [case_id]);

    return (
        <div>
            <div className="w-full p-2">
                <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-zinc-300 rounded-xl">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? "w-full p-2 font-medium rounded-lg bg-white"
                                    : "w-full p-2 font-medium rounded-lg hover:bg-zinc-200 hover:text-blue-500"
                            }
                        >
                            Overview
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? "w-full p-2 font-medium rounded-lg bg-white"
                                    : "w-full p-2 font-medium rounded-lg hover:bg-zinc-200 hover:text-blue-500"
                            }
                        >
                            Steps
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel className="bg-white p-3 rounded-xl border border-zinc-200">
                            {loading === null || loading ? (
                                <Loader />
                            ) : caseNotFound !== null && caseNotFound ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <h2 className="text-2xl font-bold text-red-500">
                                        Case Not Found
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600">
                                        The case you are looking for does not exist or has been
                                        removed.
                                    </p>
                                    <button
                                        className="mt-4 px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300"
                                        onClick={() => router.push("/dashboard")}
                                    >
                                        Go Back to Dashboard
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-xl font-bold">
                                        {currCase?.procedure_name}
                                    </h1>

                                    <div className="mt-2">
                                        <p className="font-bold"> Status: </p>
                                        <p className="capitalize">{currCase?.status}</p>
                                    </div>
                                    <div className="mt-2 inline-block">
                                        <p className="font-bold">CPT Codes:</p>
                                        <List
                                            items={currCase?.cpt_codes ? currCase?.cpt_codes : []}
                                            size={2}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <p className="font-bold">Created:</p>
                                        <p>{elapsedTime(currCase?.created_at)}</p>
                                    </div>
                                    <div
                                        className={`mt-2 p-4 rounded-lg ${
                                            currCase?.is_met ? "bg-green-100" : "bg-red-100"
                                        }`}
                                    >
                                        <div>
                                            <p className="font-bold">Determination: </p>
                                            <p
                                                className={
                                                    currCase?.is_met
                                                        ? "capitalize text-green-500 font-bold"
                                                        : "capitalize text-red-500 font-bold"
                                                }
                                            >
                                                {currCase?.is_met ? "Met" : "Not Met"}
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="font-bold"> Summary: </p>
                                            {currCase?.status === "submitted" ? (
                                                <div>
                                                    <p>Summary is processing...</p>
                                                </div>
                                            ) : (
                                                <p>{currCase?.summary}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Tab.Panel>
                        <Tab.Panel className="bg-white p-3 rounded-xl border border-zinc-200">
                            {loading ? (
                                <Loader />
                            ) : caseNotFound !== null && caseNotFound ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <h2 className="text-2xl font-bold text-red-500">
                                        Case Not Found
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600">
                                        The case you are looking for does not exist or has been
                                        removed.
                                    </p>
                                    <button
                                        className="mt-4 px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300"
                                        onClick={() => router.push("/dashboard")}
                                    >
                                        Go Back to Dashboard
                                    </button>
                                </div>
                            ) : currCase?.status === "submitted" ||
                              currCase?.status === "processing" ? (
                                <div>Steps are being processed...</div>
                            ) : (
                                <div>
                                    {currCase?.steps.map((step, _) => (
                                        <Step key={step.key} step={step} />
                                    ))}
                                </div>
                            )}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}
