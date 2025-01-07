"use client";

import { IOption } from "@/lib/api";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";

interface OptionProps {
    options: IOption[];
}

export default function Options({ options }: OptionProps) {
    const [showOptions, setShowOptions] = useState(false);
    const selectedOptions = options.filter((option) => option.selected);

    return (
        <>
            <button
                className="mt-2 text-sm hover:underline"
                onClick={() => setShowOptions(!showOptions)}
            >
                {showOptions ? "Hide Options" : "Show All Options"}
            </button>
            {showOptions && (
                <div className="mt-2">
                    <Listbox value={selectedOptions} multiple>
                        <Listbox.Label className="sr-only">Options</Listbox.Label>
                        <div className="space-y-1">
                            {options.map((option: IOption) => (
                                <Listbox.Option
                                    key={option.key}
                                    value={option}
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
                                                ({option.key}) {option.text}
                                            </div>
                                        </Listbox.Label>
                                    )}
                                </Listbox.Option>
                            ))}
                        </div>
                    </Listbox>
                </div>
            )}
        </>
    );
}
