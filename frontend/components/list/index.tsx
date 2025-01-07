"use client";

import { useState } from "react";

interface ListProps {
    items: string[] | null;
    size: number;
}

export default function List({ items, size }: ListProps) {
    const [open, setOpen] = useState(false);
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="flex divide-x divide-zinc-200 border border-zinc-200 rounded-lg">
                {items.map((item, index) =>
                    index < size || open ? (
                        <div key={index} className="px-4 py-2 flex items-center bg-zinc-100">
                            <span className="flex-grow">{item}</span>
                        </div>
                    ) : null
                )}
                <button
                    className="px-4 py-2 flex items-center bg-zinc-100 text-blue-500"
                    onClick={() => setOpen(!open)}
                >
                    <span className="flex-grow">{open ? "Show Less" : "Show All"}</span>
                </button>
            </div>
        </div>
    );
}
