export interface todoI {
    id: number;
    title : string;
    description: string;
    status: TodoStatusE;
};

export enum TodoStatusE {
    OPEN = 'open',
    DONE= 'done'
}