export type Task ={
    id : number;
    title : string;
    description? : string;
    completed : boolean;
    priority: "HIGH" | "MEDIUM" | "LOW";
    category: "WORK" | "STUDY" | "PERSONAL";
    dueDate : string;
    createdAt : string;
    completedAt: string | null;
    deleted : boolean;
};