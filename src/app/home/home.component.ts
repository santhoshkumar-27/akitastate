import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';
import { todoI } from '../shared/todo.modal';
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
    }, 
    complete: () => {
      console.log('complete')
    }});
    // this.todoService.getTodo().subscribe({
    //   next: (res) => {
    //     this.todos = res
    //   }
    // })
  }

  addTodo() {
    this.router.navigateByUrl('/add-todo')
  }
}
