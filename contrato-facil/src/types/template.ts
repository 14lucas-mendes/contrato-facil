import type { Contract } from "./contract";

export type ContractTemplate = {
    id: string;
    label: string;
    sections: ('service' | 'payment' | 'itemContract')[];
    generateText: (data: Contract) => string;
}   