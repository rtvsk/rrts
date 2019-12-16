import { DeleteTodoAction, FetchTodosAction } from './todos';

export enum ActionTypes {
  fetchTodos = 'fetchTodos',
  deleteTodo = 'deleteTodo'
}

export type Action = DeleteTodoAction | FetchTodosAction;
