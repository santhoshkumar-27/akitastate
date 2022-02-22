import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { todoI } from "../shared/todo.modal";

export interface TodoStateI {
    todos: todoI[];
    isLoaded: boolean;
}

export const initialState = (): TodoStateI => {
    return {
        todos : [],
        isLoaded: false
    }
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name : 'todo',
})
export class TodoStore extends Store<TodoStateI> {
    constructor() {
        super(initialState())
    }
}