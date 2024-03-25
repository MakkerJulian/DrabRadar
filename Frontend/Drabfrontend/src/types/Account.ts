export type Account ={
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}

export type AccountCreate = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}