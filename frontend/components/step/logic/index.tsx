"use client";

import { ILogic } from "@/lib/api";
import { Listbox, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";

interface LogicProps {
    decision: string;
    next_step: string;
    logic: ILogic[];
}

export default function Logic({ decision, next_step, logic }: LogicProps) {
    const [showLogic, setShowLogic] = useState(false);
    const selectedLogic = logic.find((logic) => logic.selected);
    return (
        <div className="mt-2">
            <div className="text-lg font-bold">
                {next_step === "FAILURE"
                    ? "This procedure is not approved."
                    : `Option ${decision} is selected.`}{" "}
                {next_step !== "FAILURE" && <u>Therefore the next step is question {next_step}</u>}
            </div>
            <button
                className="mt-2 text-sm  hover:underline"
                onClick={() => setShowLogic(!showLogic)}
            >
                {showLogic ? "Hide why" : "Show why"}
            </button>
            {showLogic && (
                <div className="mt-2">
                    <Listbox value={selectedLogic} disabled>
                        <Listbox.Label className="sr-only">Options</Listbox.Label>
                        <div className="space-y-1">
                            {logic.map((logic) => (
                                <Listbox.Option
                                    key={logic.text}
                                    value={logic}
                                    className={({ active, selected }) =>
                                        selected
                                            ? "text-sm bg-zinc-100 border border-zinc-200 rounded-lg p-2 m-0"
                                            : "text-sm bg-white border border-zinc-200 rounded-lg p-2 m-0"
                                    }
                                >
                                    {({ active, selected }) => (
                                        <Listbox.Label>
                                            <div className="flex flex-row items-center gap-1">
                                                {selected ? (
                                                    <FaCheckSquare className="text-green-500" />
                                                ) : (
                                                    <span className="w-4 h-4 inline-block" />
                                                )}
                                                {logic.text}
                                            </div>
                                        </Listbox.Label>
                                    )}
                                </Listbox.Option>
                            ))}
                        </div>
                    </Listbox>
                </div>
            )}
        </div>
    );
}
