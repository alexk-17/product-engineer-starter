// Wrapper file to handle API requests

const BASE_URL = "http://localhost:8000";

export interface IOption {
    key: string;
    text: string;
    selected: boolean;
}

export interface ILogic {
    text: string;
    selected: boolean;
}

export interface IEvidence {
    content: string;
    page_number: number;
    pdf_name: string;
    event_datetime: string;
}

export interface IStep {
    key: string;
    question: string;
    options: IOption[];
    reasoning: string;
    decision: string;
    next_step: string;
    is_met: boolean;
    is_final: boolean;
    evidence: IEvidence[];
    logic: ILogic[];
}

export interface ICase {
    id: string;
    created_at: string;
    status: string;
    procedure_name: string;
    cpt_codes: string[];
    summary: string;
    is_met: boolean;
    is_complete: boolean;
    steps: IStep[];
}

export const createCase = async () => {
    const response = await fetch(`${BASE_URL}/cases`, {
        method: "POST",
        body: JSON.stringify({})
    });
    return response.json();
};

export const getCase = async (case_id: string | string[]) => {
    // Doing this due to the return type of useParams() for the case_id field is a string or string[]
    if (Array.isArray(case_id)) {
        case_id = case_id[0];
    }

    const response = await fetch(`${BASE_URL}/cases/${case_id}`);

    if (response.status !== 200) {
        throw new Error("Failed to fetch case");
    }

    return response.json();
};

export const getCases = async () => {
    const response = await fetch(`${BASE_URL}/cases`);
    return response.json();
};
