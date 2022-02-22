import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { todoI } from "../shared/todo.modal";
import { TodoStateI, TodoStore } from "./state";

@Injectable({
    providedIn: 'root'
})
export class TodoQuery extends Query<TodoStateI> {
    
    constructor(private todoStore: TodoStore){
        super(todoStore)
    }

    getTodos(): Observable<todoI[]> {
        return this.select(state => state.todos);
    }
    getLoaded(): Observable<boolean> {
        return this.select(state => state.isLoaded)
    }
    getLoading(): Observable<boolean> {
        return this.selectLoading();
    }
}