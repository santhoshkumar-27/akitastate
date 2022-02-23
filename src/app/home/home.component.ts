import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';
import { todoI, TodoStatusE } from '../shared/todo.modal';
import { TodoServices } from '../shared/todo.service';
import { TodoStore } from '../state/state';
import { TodoQuery } from '../state/todo.query';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: Boolean = false;
  todos: todoI[] = []; 
  constructor(
    private router: Router,
    private todoQuery: TodoQuery,
    private todoStore: TodoStore,
    private todoService: TodoServices
  ) { }

  ngOnInit(): void {
    this.todoQuery.getLoading().subscribe( res => this.isLoading = res);
    this.todoQuery.getTodos().subscribe(res => this.todos = res); //this return empty array because in store the todos is empty
    this.todoQuery.getLoaded().pipe(
      take(1),
      filter(res => !res), //default will come false it return the true so switchMap will called
      switchMap( () => {
        this.todoStore.setLoading(true);
        return this.todoService.getTodo() //switchMap return the new observables this called the getTodo list services
      })
    ).subscribe({
      next: (res) => {
      this.todoStore.update( state => {
        return {
          todos: res, //this statement update the state management of todostate of todos,
          isLoaded: true
        }
      })
      this.todoStore.setLoading(false);
      }, 
    error : (err) => {
      console.log('error', err)
      this.todoStore.setLoading(false);
    }});
  }

  addTodo() {
    this.router.navigateByUrl('/add-todo')
  }

  markAsCompleted(id:number, todo: todoI){
    const payload = {
      ...todo,
      status: TodoStatusE.DONE
    }
    this.todoService.updateTodo(id, payload).subscribe({
      next: (res) => {
        this.todoStore.update( state => {
          const todos = [...state.todos]
          const index = todos.findIndex( t => t.id === id)
          todos[index] = {
            ...todos[index],
            status : TodoStatusE.DONE
          }

          return {
            ...state,
            todos
          }
        })
      }, 
      error: (err) => {
        console.log('this is error', err);
      } 
    })
  };
  deleteTodo(id: number){
    this.todoService.deleteTodo(id).subscribe({next: (res) => {
      this.todoStore.update( state => {
        return {
          ...state,
          todos: state.todos.filter( t => t.id !== id)
        }
      })
    },
    error: (err) => {
      console.log('this is error', err);
    }})
  }
}
