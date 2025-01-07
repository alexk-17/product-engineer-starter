"use client";

export default function Loader() {
    return (
        <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg">
            <span className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            <span className="text-blue-500 font-semibold">Loading...</span>
        </div>
    );
}
