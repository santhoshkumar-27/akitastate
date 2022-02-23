import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { todoI, TodoStatusE } from "./todo.modal";

@Injectable({
    providedIn: 'root',
})
export class TodoServices {
    private readonly baseUrl:string = environment.baseUrl;
    constructor(private http: HttpClient) {}
    addTodo(title : string, description: string) : Observable<todoI> {
       return this.http.post<todoI>(this.baseUrl,{title,description, status: TodoStatusE.OPEN})
    }
    getTodo(): Observable<todoI[]> {
        return this.http.get<todoI[]>(this.baseUrl)
    }
    deleteTodo(id : number): Observable<todoI> {
        return this.http.delete<todoI>(`${this.baseUrl}/${id}`)
    }
    updateTodo(id:number ,payload: any): Observable<todoI> {
        return this.http.put<todoI>(`${this.baseUrl}/${id}`, payload)
    }
}