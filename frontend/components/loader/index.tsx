"use client";

export default function Loader() {
    return (
        <div className="flex items-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            <span>Loading...</span>
        </div>
    );
}
