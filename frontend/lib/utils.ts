export const elapsedTime = (created_at: string | undefined) => {
    if (!created_at) return "N/A";
    const ms = new Date().getTime() - new Date(created_at).getTime();
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(ms / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(ms / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};
