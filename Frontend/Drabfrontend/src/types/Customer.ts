import { Subscription } from "./Subscription";

export type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    subscription: Subscription;
}

export type CustomerCreate = {
    name: string;
    email: string;
    phone: string;
}