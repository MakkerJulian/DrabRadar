import { Contract } from "./Contract";

export type Subscription = {
    id: number;
    token: string;
    customer: number;
    contracts: Contract[];
}