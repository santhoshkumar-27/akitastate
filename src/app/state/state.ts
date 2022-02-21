import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { todoI } from "../shared/todo.modal";

export interface TodaStateI {
    todos: todoI[];
    isLoaded: boolean;
}

export const initialState = () => {
    return {
        todo : [],
        isLoaded: false
    }
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name : 'todo',
})
export class TodoState extends Store<TodaStateI> {
    constructor() {
        super(initialState())
    }
}