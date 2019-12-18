import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos, Todo, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

export class MyApp extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    const { todos } = this.props;
    if (!prevProps.todos.length && todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { fetchTodos } = this.props;
    this.setState({ fetching: true }, () => {
      fetchTodos();
    });
  };

  onTodoClick = (id: number): void => {
    const { deleteTodo } = this.props;
    deleteTodo(id);
  };

  renderList = (): JSX.Element[] => {
    const { todos } = this.props;
    return todos.map((todo: Todo) => (
      <div
        key={todo.id}
        role="button"
        tabIndex={todo.id}
        onClick={(): void => this.onTodoClick(todo.id)}
        onKeyDown={(): void => this.onTodoClick(todo.id)}
      >
        {todo.title}
      </div>
    ));
  }

  render(): JSX.Element {
    const { fetching } = this.state;
    return (
      <>
        <button type="button" onClick={this.onButtonClick}>FETCH</button>
        {fetching ? 'LOADING' : null}
        {this.renderList()}
      </>
    );
  }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => ({
  todos: state.todos,
});

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(MyApp);
