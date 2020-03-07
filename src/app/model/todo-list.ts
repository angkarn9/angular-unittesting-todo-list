export class TodoList {
}

export interface ITodoListParam {
    topic: string;
    description: string;
}

export interface ITodoListResponse {
    id: number;
    topic: string;
    description: string;
}

export interface IDeleteResponse {
    success: boolean;
}
