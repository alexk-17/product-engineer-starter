"use client";

import { FaCheckSquare } from "react-icons/fa";
import { IStep } from "@/lib/api";
import Options from "./option";
import Evidence from "./evidence";
import Logic from "./logic";
import classNames from "classnames";

interface StepProps {
    step: IStep;
}

export default function Step({ step }: StepProps) {
    const selectedOptions = step.options.filter((option) => option.selected);

    return (
        <div className="p-4 m-2 bg-white rounded-lg border border-zinc-200">
            <p className="text-sm ">
                {step.key === "0" ? "Instructions:" : `Question ${step.key}:`}
            </p>
            <h1 className="text-lg  font-bold"> {step.question} </h1>
            <div className="p-4 border-2 border-green-500 rounded-lg mt-2 bg-white">
                <span className="text-sm font-bold text-green-500">SELECTED OPTIONS</span>
                {selectedOptions.map((option, index) => (
                    <div
                        key={option.key}
                        className={classNames(
                            "flex flex-row p-2 items-center gap-1 rounded-lg border border-zinc-200",
                            index % 2 === 0 ? "bg-zinc-100" : "bg-white"
                        )}>
                        <FaCheckSquare className="text-green-500" /> ({option.key}) {option.text}
                    </div>
                ))}
            </div>
            <Options options={step.options} />
            <div className="mt-2 mb-4">
                <p className="text-sm font-bold"> Reasoning: </p>
                <p className="text-sm whitespace-pre-line"> {step.reasoning} </p>
            </div>
            <Evidence evidence={step.evidence} />
            {step.logic && (
                <Logic decision={step.decision} next_step={step.next_step} logic={step.logic} />
            )}
        </div>
    );
}
